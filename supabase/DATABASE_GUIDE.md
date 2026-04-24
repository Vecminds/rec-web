# Database Migration Guide

This guide covers how to manage schema changes in Recruitencer with Prisma + Supabase Postgres.

---

## Project Structure

```
prisma/
├── schema.prisma                          # Prisma datamodel (source of truth in code)
└── migrations/
    └── 0000_baseline/migration.sql        # Baseline migration tracked by Prisma
prisma.config.ts                           # Prisma config (loads .env.local)

supabase/
├── migrations.sql                          # Master schema — full DB setup from scratch
├── migrations/                             # Incremental migration files
│   └── 20260424_add_country_phone.sql       # Optional SQL-first patches (legacy/manual path)
└── DATABASE_GUIDE.md                       # This file
```

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Prisma models for app tables (`talent_submissions`, `company_submissions`). |
| `prisma/migrations/*` | Prisma-managed migration history used by `prisma migrate`. |
| `supabase/migrations.sql` | Bootstrap SQL for fresh Supabase project setup (tables, RLS, storage). |
| `supabase/migrations/*.sql` | Optional manual SQL patches (use only when Prisma cannot express the change cleanly). |

---

## Current Baseline (Already Applied)

- Baseline migration folder: `prisma/migrations/0000_baseline`
- Migration has been marked as applied in the remote DB via `prisma migrate resolve --applied 0000_baseline`
- Use `npx prisma migrate status` to confirm the DB is in sync

For fresh local databases, run:

```bash
npm run prisma:migrate:deploy
```

For existing production/staging databases, do **not** reapply baseline manually.

---

## Recommended Workflow (Prisma-First)

Follow these steps every time you need to change table structure used by the app.

### Step 1 - Update Prisma schema

Edit `prisma/schema.prisma` and make your model changes.

### Step 2 - Create migration

```bash
npm run prisma:migrate:dev -- --name <change_name>
```

This will:
- create a new folder in `prisma/migrations/`
- apply migration to your target DB
- update Prisma client

### Step 3 - Verify and regenerate

```bash
npm run prisma:validate
npm run prisma:generate
npx prisma migrate status
```

### Step 4 - Update application layer

- Update request validation in `lib/validations.ts`
- Update route logic in `app/api/talent/route.ts` and/or `app/api/company/route.ts`
- Update form inputs if required
- Update docs (`README.md`, this guide)

---

## When to Use SQL-First (Supabase SQL Editor)

Use SQL-first changes in `supabase/migrations/*.sql` only for cases Prisma migration cannot model cleanly, such as:

- advanced RLS policy changes
- storage bucket policy updates
- Postgres extensions/triggers/functions
- one-off data backfills

If SQL-first was used for schema changes, run `npx prisma db pull` and ensure `prisma/schema.prisma` stays aligned.

---

## Checklist for Every Database Change

- [ ] **Update** `prisma/schema.prisma`
- [ ] **Create/apply** a migration via `npm run prisma:migrate:dev -- --name <change_name>`
- [ ] **Verify** with `npx prisma migrate status`
- [ ] **Regenerate** client via `npm run prisma:generate`
- [ ] **Update** `supabase/migrations.sql` if bootstrap SQL is impacted
- [ ] **Update** the Zod validation schema in `lib/validations.ts` if fields were added/changed
- [ ] **Update** the API route(s) in `app/api/` to read and insert the new fields
- [ ] **Update** the form component(s) to capture the new fields from the user

---

## Common Patterns

### Generate baseline migration for existing table state (one-time setup)

```bash
npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script --output prisma/migrations/0000_baseline/migration.sql
npx prisma migrate resolve --applied 0000_baseline
```

### Check database health route

```bash
curl http://localhost:3000/api/health/db
```

Expected success payload:

```json
{
  "ok": true,
  "service": "database",
  "checkedAt": "2026-04-24T10:15:30.000Z"
}
```

### Making a column required (NOT NULL) with a default for existing rows

```sql
-- First, backfill existing rows
UPDATE talent_submissions SET status = 'pending' WHERE status IS NULL;

-- Then add the constraint
ALTER TABLE talent_submissions
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'pending';
```

### Adding an index for performance

```sql
CREATE INDEX IF NOT EXISTS idx_talent_email
  ON talent_submissions (email);
```

### Adding RLS policy for a new table

```sql
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert"
  ON new_table FOR INSERT TO anon WITH CHECK (true);
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `PrismaClientInitializationError` about options | Ensure `lib/prisma.ts` uses `@prisma/adapter-pg` and `DATABASE_URL` is set |
| `prisma migrate status` shows drift | Verify baseline is resolved and schema matches remote DB (`npx prisma db pull`) |
| "column already exists" | Use `ADD COLUMN IF NOT EXISTS` |
| "column does not exist" | Check the table name — might be a typo |
| "permission denied" | Make sure you're running as the `postgres` role in the SQL Editor |
| Migration ran but app errors | Check `lib/validations.ts` and Prisma create payload in API route |
| Form submits but data is missing | Verify the API route includes the new field in Prisma `.create({ data })` |
