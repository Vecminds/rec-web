# Security Vulnerability Report

## 1. Dependency Vulnerabilities
**Findings:**
- **PostCSS XSS Vulnerability:** `postcss` versions `<8.5.10` contain an XSS vulnerability via unescaped `</style>` in its CSS stringify output (CVE referenced by `GHSA-qx2v-qp2m-jg93`). The project currently depends on `postcss` `^8` and resolves to vulnerable versions (`8.4.31` in `next` dependencies).
- Note: Upgrading `next` or applying package overrides might be necessary since `next` depends on an older `postcss`.

**Remediation:**
Update `postcss` to a secure version (`>=8.5.10`) by adding it to overrides in `package.json` to force sub-dependencies to use the patched version, or update `next` if a patched version is available.
```bash
# Example override in package.json
"overrides": {
  "postcss": "^8.5.10"
}
```
Run the following commands to attempt an automatic fix or manual update:
```bash
npm audit fix
# or update package.json with overrides and run:
npm install
```


## 2. HTTP Security Headers
**Findings:**
The `next.config.mjs` file does not configure essential HTTP security headers such as Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options, X-Content-Type-Options, etc.

**Remediation:**
Modify `next.config.mjs` to include strict HTTP headers for production. Example configuration:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.supabase.co" }
        ],
      },
    ];
  },
};

export default nextConfig;
```

## 3. Development Dependencies Bundled in Production
**Findings:**
In `package.json`, the `prisma` package (the Prisma CLI tool) is listed under `dependencies`. This means the CLI and its heavyweight binaries can be incorrectly bundled into the production environment or Docker image, bloating the size and potentially increasing the attack surface. Only `@prisma/client` and `@prisma/adapter-pg` should be in `dependencies`.

**Remediation:**
Move `prisma` to `devDependencies`:
```bash
npm uninstall prisma
npm install -D prisma
```

## 4. Broad IAM Permissions & Database Roles
**Findings:**
- **Storage Bucket RLS Vulnerability:** The Supabase RLS policy for the `resumes` storage bucket is overly permissive. The `Allow anon upload resumes` policy allows anonymous users to upload files without strong validation constraints within the database policy itself. This presents a DoS risk since users can fill up storage with unvalidated files by directly querying the Supabase API, bypassing the server-side validation.
- **Database Inserts:** The RLS policies on `talent_submissions` and `company_submissions` allow anonymous inserts (`to anon with check (true)`). While there's no client-side `SELECT` access, a malicious actor could write directly to these tables repeatedly (spam/DoS), given the lack of rate-limiting or application-layer constraints in the API.

**Remediation:**
- **Storage Policies:** Rely on server-side uploads or implement stricter Supabase policies using signed URLs, checking file types, and size constraints directly inside the storage policy logic, if relying on client-side uploads. Since the app currently does uploads via API, restrict the bucket so only the `service_role` (backend) can insert.
```sql
-- Restrict bucket uploads to authenticated service role or specific users
drop policy if exists "Allow anon upload resumes" on storage.objects;
-- Instead, handle uploads securely server-side and let Supabase Service Role bypass RLS
```
- **Rate Limiting:** Implement API rate limiting using tools like Upstash Redis, or basic memory caching to prevent automated spamming to `/api/talent` and `/api/company`.

## 5. Environment Configuration & Dynamic Code Execution
**Findings:**
- **Environment Configuration:** The `.env.local.example` file is correctly committed as a template, and `.env.local` is ignored in `.gitignore`. However, the app relies on `process.env.NODE_ENV` in `lib/prisma.ts` to adjust logging and configuration without an explicit fallback, meaning if `NODE_ENV` isn't strictly set to `production` in the production environment (e.g., Vercel), it could leak verbose logs (warnings/errors) which is a potential information disclosure vulnerability.
- **Dynamic Code Execution:** A grep search reveals no instances of `eval()`, `new Function()`, or other dangerous dynamic execution methods within the application code itself (excluding expected occurrences within dependency hook files like `.git/hooks`).

**Remediation:**
- **Environment Configuration:** Add a check in critical startup files or build scripts to ensure `NODE_ENV` is correctly configured before starting the application, and consider using standard environment validation (e.g., `@t3-oss/env-nextjs` or parsing via `zod` at startup) to ensure `DATABASE_URL` and keys are present and typed.
- Ensure that the deployment platform explicitly sets `NODE_ENV=production`.

## 6. OS Privilege Levels
**Findings:**
There is no `Dockerfile` or container configuration file present in the repository that explicitly specifies a non-root user (e.g., `USER nextjs`). In typical Node.js deployments (or Vercel), this is handled by the platform, but if this application is containerized manually in the future, it might run as the root user by default, violating the principle of least privilege.

**Remediation:**
If deploying via Docker, ensure that the application runs as a non-root user. Example addition to a `Dockerfile`:
```dockerfile
# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership of the build output
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

USER nextjs
```
