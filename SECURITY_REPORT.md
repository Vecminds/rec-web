# Security Report: Business Logic & State Management Flaws

This document outlines the business logic vulnerabilities and state management flaws identified in the application, along with attack scenarios, root causes, and secure implementation patterns.

### 1. Bypassing Server Validation & Manipulating Data (Skipping Workflow)
*   **Attack Scenario:**
    1.  An attacker inspects the client-side network traffic and extracts `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    2.  Instead of submitting data through the `/api/talent` endpoint, the attacker makes a direct `POST` request to the Supabase REST API (`/rest/v1/talent_submissions`).
    3.  The attacker inserts invalid data (e.g., negative experience, malicious scripts, oversized strings) completely bypassing the strict Zod validation in the Next.js API.
*   **Root Cause:** The database migration (`supabase/migrations.sql`) implements overly permissive Row Level Security (RLS) policies: `create policy "Allow anon insert talent" on talent_submissions for insert to anon...`.
*   **Secure Implementation Pattern:** Drop the `anon` insert policies on the database tables entirely. Since the application uses Prisma server-side with a direct `DATABASE_URL` to insert records, it naturally bypasses RLS. The tables do not need to be exposed to the public internet via the Supabase REST API.

### 2. Race Conditions (Duplicate Submissions)
*   **Attack Scenario:**
    1.  A legitimate user with a slow internet connection clicks the "Submit" button multiple times.
    2.  Alternatively, an attacker sends 100 concurrent POST requests to the `/api/talent` endpoint.
    3.  The server processes all requests simultaneously, creating duplicate rows in the database and uploading duplicate files to the storage bucket.
*   **Root Cause:** There are no unique constraints in the database schema to prevent duplicate records, nor is there server-side rate limiting or request deduplication logic.
*   **Secure Implementation Pattern:** Add a `@unique` constraint to the `email` column in `prisma/schema.prisma` for both `TalentSubmission` and `CompanySubmission`. Catch the Prisma unique constraint violation error (code `P2002`) in the API routes to return a friendly "You have already submitted a request" message.

### 3. Missing Idempotency on Write Operations
*   **Attack Scenario:**
    1.  A user submits a hiring request to `/api/company`.
    2.  The server successfully inserts the record, but a network timeout prevents the success response from reaching the client.
    3.  The client application retries the request automatically, or the user refreshes and resubmits.
    4.  The server processes the request again, creating a duplicate hiring request.
*   **Root Cause:** The POST endpoints do not require, track, or validate an idempotency key to identify retried requests.
*   **Secure Implementation Pattern:** The frontend should generate a unique UUID (`X-Idempotency-Key` header) when the form mounts. The backend should check this key against a fast cache (like Redis) or an idempotency table before processing. If the key has already been processed, it should return the cached success response without writing to the database again.

### 4. Unrestricted File Storage Operations (Skipping Workflow)
*   **Attack Scenario:**
    1.  Using the exposed `NEXT_PUBLIC_SUPABASE_ANON_KEY`, an attacker directly interacts with the Supabase Storage API.
    2.  The attacker uploads hundreds of gigabytes of junk PDFs directly to the `resumes` bucket without ever filling out the talent form.
    3.  Because the bucket allows any anonymous user to insert, the storage fills up, incurring costs and potentially creating a denial of service.
*   **Root Cause:** The storage policy `Allow anon upload resumes` permits anonymous uploads independent of the actual `/api/talent` API route logic.
*   **Secure Implementation Pattern:** Remove the anonymous upload policy. Instead, use a Supabase Service Role key securely on the server-side to upload files, or have the server generate a short-lived Signed Upload URL that the client uses to upload the file directly.

### 5. Missing Audit Logs for Sensitive Actions
*   **Attack Scenario:**
    1.  A malicious actor floods the system with fraudulent company hiring requests.
    2.  The engineering team attempts to block the attacker but realizes they have no IP addresses, request timings, or user-agent data associated with the submissions to formulate firewall rules.
*   **Root Cause:** The API routes (`app/api/talent/route.ts` and `route.ts` for company) only log errors via `console.error` and do not capture or persist incoming request metadata (e.g. IP address, user-agent).
*   **Secure Implementation Pattern:** Implement a structured logging middleware using the project's centralized `lib/logger.ts`. Store the `x-forwarded-for` IP header and `user-agent` in a dedicated audit log table or monitoring system for all submissions.

---

### Notable Strengths Verified:

*   **File Upload Validation:** **Secure.** The application does NOT just rely on file extensions. `app/api/talent/route.ts` strictly verifies the file size, MIME type, and securely checks the **PDF magic bytes** (`%PDF`) server-side, preventing MIME spoofing attacks.
*   **Client-Side ID/Price Manipulation:** **Secure.** The application strictly generates UUIDs server-side via Postgres (`gen_random_uuid()`) and doesn't rely on hidden inputs or client-side pricing models.
*   **Sensitive Logic Exposure:** **Secure.** No proprietary matching algorithms or secret keys (other than the standard Supabase public anon key) are leaked in the client bundle.
*   **Insecure Direct Object References (IDOR):** **Secure.** The application currently lacks endpoints to Read, Update, or Delete user profiles, nullifying standard IDOR vectors.
