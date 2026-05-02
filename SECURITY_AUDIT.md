# Security Audit Report: Business Logic and State Management

This document outlines the findings of a security audit focused on business logic vulnerabilities and state management flaws in the Recruitencer application.

## 1. Client-Side Trust (Manipulating Prices, Quantities, or IDs)

**Flaw:** Not applicable in the current implementation.

- **Analysis:** The application does not currently expose endpoints to update or delete resources where a client could manipulate an ID to affect another record. Prices and quantities are not strictly present; `expected_salary` and `salary_budget` are treated as informational text fields. Database IDs are generated server-side using PostgreSQL's `gen_random_uuid()`.
- **Secure Implementation Pattern:** The current pattern of generating IDs on the server and avoiding client-provided IDs for writes is correct and secure.

## 2. Race Conditions in Critical Operations (Duplicate Submissions)

**Flaw:** Duplicate submissions due to race conditions.

- **Attack Scenario:** A user double-clicks the "Submit" button, or an attacker uses an automated script to send the same POST request multiple times concurrently to `/api/talent` or `/api/company`.
- **Root Cause:** The API endpoints lack an idempotency mechanism, and the database schema (`prisma/schema.prisma`) does not enforce unique constraints on fields like `email` or a combination of `email` and `created_at`. This allows concurrent identical requests to create multiple duplicate records.
- **Secure Implementation Pattern:**
  1. Generate a unique idempotency key (e.g., a UUID) on the client side when the form is rendered or submitted.
  2. Include this key in the request headers (e.g., `Idempotency-Key`).
  3. On the server, check if a request with this key has already been processed within a specific timeframe (using Redis or a dedicated database table). If it has, return the cached successful response.
  4. Alternatively or additionally, enforce unique constraints in the database if the business logic dictates that a user can only submit once.

## 3. Lack of Idempotency on Write Operations

**Flaw:** Missing idempotency on form submissions.

- **Attack Scenario:** A client submits the `TalentForm` or `CompanyForm`. The server processes the request and inserts the data into the database. However, a network timeout prevents the client from receiving the success response. The client automatically retries the request, resulting in a duplicate entry being created in the database and a duplicate resume being uploaded.
- **Root Cause:** The write operations (`POST /api/talent` and `POST /api/company`) are not idempotent. Executing the same request multiple times changes the state of the server multiple times.
- **Secure Implementation Pattern:** Implement an Idempotency-Key header. The server should cache the result of the initial request associated with the key for a fixed duration (e.g., 24 hours). Subsequent requests with the same key should bypass the database insertion/file upload and return the cached result.

## 4. Skipping Workflow Steps (Bypassing Email Verification)

**Flaw:** Bypassing email verification.

- **Attack Scenario:** An attacker or bot submits a form using a fake email address or the email address of a victim (e.g., `victim@example.com`) to spam the system, impersonate someone, or trigger unsolicited follow-up emails from the agency.
- **Root Cause:** The system accepts and stores the submission as valid without verifying that the submitter actually owns the provided email address. The email validation in Zod only checks the format, not ownership.
- **Secure Implementation Pattern:**
  1. Add a `status` field to the submissions table (e.g., `PENDING`, `VERIFIED`).
  2. Upon form submission, save the record with a `PENDING` status.
  3. Generate a secure, cryptographically random, time-limited verification token.
  4. Send an email to the provided address containing a verification link with the token.
  5. Create a verification endpoint that validates the token and updates the submission status to `VERIFIED`. Only process or view verified submissions.

## 5. File Upload Validation

**Flaw:** None found.

- **Analysis:** The file upload implementation in `/api/talent/route.ts` is robust. It validates the MIME type (`resumeFile.type !== "application/pdf"`), checks the file size (`resumeFile.size > 5 * 1024 * 1024`), and crucially, verifies the content by checking the PDF magic bytes (`0x25, 0x50, 0x44, 0x46`). It also sanitizes the filename to prevent path traversal attacks.
- **Secure Implementation Pattern:** The current pattern is secure and effectively prevents MIME type spoofing and malicious file uploads.

## 6. Sensitive Logic Exposed in Client-Side JavaScript

**Flaw:** None found.

- **Analysis:** Validation logic (Zod schemas) is shared between the client and server, which is an accepted practice. Sensitive operations, such as generating database IDs, interacting with the database via Prisma, and uploading files to Supabase using server-side keys, are correctly kept on the server.

## 7. Insecure Direct Object References (IDOR)

**Flaw:** Not applicable in the current implementation.

- **Analysis:** The application currently only has `POST` endpoints (`/api/talent` and `/api/company`) for creating submissions. There are no `GET`, `PUT`, or `DELETE` endpoints that accept an ID parameter to retrieve or modify a specific submission. Therefore, IDOR vulnerabilities are not possible at this stage.

## 8. Missing Audit Logs for Sensitive Actions

**Flaw:** Missing audit logs for form submissions.

- **Attack Scenario:** A distributed spam campaign submits thousands of bogus talent profiles or company requests, exhausting database connections or storage space.
- **Root Cause:** The API endpoints do not log the IP address, User-Agent, or other identifying metadata of the submitter. While there are no explicit authentication endpoints yet, form submission is a sensitive action that requires tracking to identify and mitigate abuse.
- **Secure Implementation Pattern:**
  1. Extract the client IP address (using `request.headers.get('x-forwarded-for')`) and User-Agent in the API routes.
  2. Store this metadata either in a separate `AuditLog` table or as fields alongside the submission data.
  3. Utilize this data to implement IP-based rate limiting or to block malicious actors.
