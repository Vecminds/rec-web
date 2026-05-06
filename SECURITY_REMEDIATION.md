# Security Remediation Plan

This document outlines a prioritized list of security weaknesses discovered in the `recruitencer` project, along with actionable remediation steps and upgrade commands.

## 1. High Priority: Overly Broad Database Roles & RLS (Principle of Least Privilege)

**Issue:** The Supabase Row Level Security (RLS) policies defined in `supabase/migrations.sql` currently allow any anonymous user with the public anon key to insert records into `talent_submissions` and `company_submissions` and upload files to the `resumes` storage bucket.
- `create policy "Allow anon insert talent" on talent_submissions for insert to anon with check (true);`
- `create policy "Allow anon upload resumes" on storage.objects for insert to anon with check (bucket_id = 'resumes');`
Because the application routes (`app/api/talent/route.ts` and `app/api/company/route.ts`) already perform form validation server-side using Prisma for database writes, these open policies expose the infrastructure directly to unauthenticated attacks or spoofed requests bypassing validation.

**Remediation:**
1. Update Supabase backend policies to disable `anon` inserts.
2. In `app/api/talent/route.ts` and `app/api/company/route.ts`, when interacting with Supabase Storage (or if interacting directly with the DB), switch from the `anon` client to a privileged Service Role client (`SUPABASE_SERVICE_ROLE_KEY`) that bypasses RLS securely on the server-side.

*Action:* Modify `supabase/migrations.sql` to drop the anon policies, and ensure server-side API routes use `createAdminSupabaseClient()` from `lib/supabase-server.ts` (which uses the Service Role Key).

## 2. High Priority: Development Dependencies Bundled into Production

**Issue:** The `prisma` CLI package is listed under `dependencies` instead of `devDependencies` in `package.json`. This causes the large Prisma CLI binaries to be downloaded and bundled in the production build environment, increasing the attack surface and bundle size unnecessarily. Only `@prisma/client` and `@prisma/adapter-pg` should be in `dependencies`.

**Remediation Command:**
```bash
npm uninstall prisma
npm install -D prisma@^7.8.0
```

## 3. Moderate Priority: Outdated Packages with Known CVEs

**Issue:** `npm audit` reveals a moderate severity Cross-Site Scripting (XSS) vulnerability in `postcss < 8.5.10` (GHSA-qx2v-qp2m-jg93). The vulnerability arises via unescaped `</style>` in CSS stringify output. Since `postcss` is a dev dependency used during the build phase via Next.js and Tailwind, the risk to end-users is lower, but it should still be patched to maintain a clean security baseline.

**Remediation Command:**
```bash
# Add an override in package.json if Next.js locks an older version, or run:
npm install -D postcss@^8.5.10
# Or auto-fix:
npm audit fix
```

## 4. Low Priority: Unused Dependencies

**Issue:** The `@hono/node-server` package is listed in `dependencies` but a recursive search of the codebase shows no usage of `hono`. Unused dependencies unnecessarily increase the attack surface and maintenance burden.

**Remediation Command:**
```bash
npm uninstall @hono/node-server
```

## 5. Information Disclosure & Environment Configuration Review

- **.env Files:** Safe. `.env.local.example` is committed, which is best practice. Actual `.env` files are correctly excluded via `.gitignore`.
- **NODE_ENV:** Safe. `lib/prisma.ts` correctly handles `process.env.NODE_ENV`, defaulting to strict/production logging and behavior if not explicitly set to `"development"`.
- **Dynamic Code Execution:** Safe. No instances of `eval()`, `new Function()`, or React's `dangerouslySetInnerHTML` were found in the application code.
- **Elevated Privileges:** The application runs standard Node.js processes. Assuming the Vercel/production deployment uses unprivileged containers, this is secure. However, ensure the deployment platform does not run the Next.js server as the `root` user.

## Summary of Executable Remediation Commands

```bash
# Fix dependency bundling issue
npm uninstall prisma
npm install -D prisma@^7.8.0

# Remove unused dependency
npm uninstall @hono/node-server

# Fix CVEs
npm install -D postcss@^8.5.10
```
