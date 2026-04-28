# Security Review Report

This report summarizes the findings of a codebase review focusing on authentication, authorization, and general security vulnerabilities based on the provided checklist.

## Executive Summary

The application is currently in "Phase 1" and operates purely as a public submission platform. There are currently **no implemented user authentication or authorization flows** (planned for Phase 2).

Therefore, many of the standard checklist items are not applicable to the current codebase:
- **Broken authentication flows:** N/A (No authentication implemented)
- **Insecure JWT handling:** N/A (No JWTs are issued or consumed)
- **Privilege escalation paths:** N/A (No roles exist, no admin dashboard)
- **Hardcoded credentials:** None found (All credentials use environment variables via `.env.local` / `process.env`).
- **Password storage issues:** N/A (No users or passwords exist in the schema or code).

However, significant authorization issues exist regarding the database and storage infrastructure, which could be abused.

---

## Findings

### 1. Missing Authorization Checks on Database Inserts (Row Level Security Bypass)

**Vulnerability:** The application is designed to validate form submissions through Next.js API routes (`/api/talent`, `/api/company`) using Zod schemas before inserting them into the database using Prisma. However, the Supabase PostgreSQL Row Level Security (RLS) policies allow any anonymous client using the `NEXT_PUBLIC_SUPABASE_ANON_KEY` to directly insert into the `talent_submissions` and `company_submissions` tables, completely bypassing the Next.js API validation and Prisma layer.

**Affected Code:** `supabase/migrations.sql`

```sql
drop policy if exists "Allow anon insert talent" on talent_submissions;
create policy "Allow anon insert talent"
  on talent_submissions for insert to anon with check (true);

drop policy if exists "Allow anon insert company" on company_submissions;
create policy "Allow anon insert company"
  on company_submissions for insert to anon with check (true);
```

**Severity:** **High**
Malicious actors can inject unvalidated data, bypassing server-side security controls, potentially leading to DoS via database bloat or injecting malicious payloads if this data is displayed in the future without sanitization.

**Fixed Code Snippet:**
Since Prisma is intended to be the owner of the table CRUD and runs on the server, the tables should be protected from direct anonymous inserts. The `service_role` key (or a specific database role configured for Prisma) should be used on the backend. The `anon` insert policy should be removed.

```sql
-- Disable anon inserts, forcing all traffic through the Next.js API routes (Prisma)
drop policy if exists "Allow anon insert talent" on talent_submissions;
drop policy if exists "Allow anon insert company" on company_submissions;

-- Note: Since Prisma uses connection pooling and the postgres role (or a dedicated server role),
-- it will bypass RLS by default or should be explicitly granted permissions.
-- Anonymous users should not have ANY direct access to these tables.
```

### 2. Missing Authorization Checks on Storage Uploads (Storage Policy Bypass)

**Vulnerability:** The `/api/talent/route.ts` API implements strict validation on resume uploads, checking the MIME type, file size (5MB), and even the magic bytes to ensure the file is truly a PDF. However, the Supabase storage bucket policy allows direct anonymous inserts to the `resumes` bucket. A malicious user can bypass the API and upload any file directly to the bucket if it simply matches the `application/pdf` MIME type (which is trivially spoofed).

**Affected Code:** `supabase/migrations.sql`

```sql
-- Allow anonymous users to upload to the resumes bucket
drop policy if exists "Allow anon upload resumes" on storage.objects;
create policy "Allow anon upload resumes"
  on storage.objects for insert to anon
  with check (bucket_id = 'resumes');
```

**Severity:** **Medium**
Attackers can upload malicious files or exploit the storage by filling up the bucket with garbage data, bypassing the strict server-side magic byte and validation logic present in the Next.js API.

**Fixed Code Snippet:**
Uploads should either be restricted to authenticated users (when Auth is implemented in Phase 2) or the server route should handle the upload securely. The current architecture calls `createServerSupabaseClient` (which uses the `anon` key) inside the API route. If anonymous uploads are disabled, the API route must be switched to use the `service_role` key to perform the upload on behalf of the user after server-side validation.

First, fix the SQL policy:
```sql
-- Remove anonymous upload capability
drop policy if exists "Allow anon upload resumes" on storage.objects;

-- Only allow service_role (the backend API) to upload files
-- (This assumes the backend uses the SUPABASE_SERVICE_ROLE_KEY)
```

Then, fix the backend client in `lib/supabase-server.ts` to use the service role key instead of the anon key, as the API has already validated the request.

```typescript
// Fixed lib/supabase-server.ts
import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // USE SERVICE ROLE KEY to bypass RLS for server-validated actions
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
```