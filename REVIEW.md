# Vulnerability Review Report

## 1. Missing Authorization Checks on API Routes (Open RLS on Tables)

**Vulnerability:**
The `talent_submissions` and `company_submissions` tables have Row Level Security (RLS) policies that allow any anonymous user to insert records into the database. This means malicious actors could flood the database with spam or forged records, leading to a resource exhaustion (Denial of Service) and data integrity issues.

**Affected Code:**
`supabase/migrations.sql`
```sql
drop policy if exists "Allow anon insert talent" on talent_submissions;
create policy "Allow anon insert talent"
  on talent_submissions for insert to anon with check (true);

drop policy if exists "Allow anon insert company" on company_submissions;
create policy "Allow anon insert company"
  on company_submissions for insert to anon with check (true);
```

**Severity:** High

**Fixed Code Snippet:**
`supabase/migrations.sql`
```sql
-- Remove these policies completely.
-- Database inserts will only be performed server-side via Prisma.
-- No anonymous access
alter table talent_submissions enable row level security;
alter table company_submissions enable row level security;
```

## 2. Insecure File Upload Authorization (Open Storage Upload Policy)

**Vulnerability:**
The `resumes` storage bucket has a policy that allows anonymous users to upload files directly. A malicious actor could bypass the application's file size and type constraints by communicating directly with the Supabase Storage API, potentially filling up the storage quota and causing a Denial of Service or hosting malicious files.

**Affected Code:**
`supabase/migrations.sql`
```sql
-- Allow anonymous users to upload to the resumes bucket
drop policy if exists "Allow anon upload resumes" on storage.objects;
create policy "Allow anon upload resumes"
  on storage.objects for insert to anon
  with check (bucket_id = 'resumes');
```

**Severity:** High

**Fixed Code Snippet:**
`supabase/migrations.sql`
```sql
-- Remove the anonymous upload policy.
-- File uploads will be authenticated server-side using the Service Role Key.
```

## 3. Privilege Escalation Path (Server-Side Supabase Client Uses Anonymous Key)

**Vulnerability:**
The server-side Supabase client (`createServerSupabaseClient`) is instantiated using the `NEXT_PUBLIC_SUPABASE_ANON_KEY`. If the application needs to perform administrative actions (like uploading files when the bucket does not allow anonymous access), this key is insufficient as it is bound by RLS policies. It effectively locks the server out of performing operations it needs to do, requiring insecure open policies (like those in issues 1 and 2) to function.

**Affected Code:**
`lib/supabase-server.ts`
```typescript
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
```

**Severity:** High (Architectural flaw necessitating insecure policies)

**Fixed Code Snippet:**
`lib/supabase-server.ts`
```typescript
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
```
