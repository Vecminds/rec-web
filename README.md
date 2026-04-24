# Recruitencer

> South Asia's tech talent. Built for the world.

Recruitencer is an AI-first specialist tech recruitment agency website connecting remote-first global companies with mid-to-senior software engineers, AI/ML practitioners, and DevOps engineers from Nepal and South Asia.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7 (`@prisma/client` + `@prisma/adapter-pg`)
- **Storage**: Supabase Storage (resume uploads)
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: DM Sans + Syne (via `next/font/google`)

## Prerequisites

- Node.js 18+
- npm 9+
- A [Supabase](https://supabase.com) account and project

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/recruitencer.git
cd recruitencer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials (from your Supabase project -> Settings -> API):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:5432/postgres
```

> `DATABASE_URL` is used by Prisma at runtime. `DIRECT_URL` is used for migrate/introspect commands.
> `SUPABASE_SERVICE_ROLE_KEY` remains optional in the current implementation.

### 4. Bootstrap database objects (fresh project only)

1. Open your Supabase project dashboard at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations.sql`
4. Paste and click **Run**

This creates:

- `talent_submissions` table
- `company_submissions` table
- Row Level Security policies (anon INSERT only)
- `resumes` private storage bucket (PDF only, 5MB limit)

### 5. Validate Prisma setup

```bash
npm run prisma:validate
npm run prisma:generate
npx prisma migrate status
```

This project already includes a baseline migration at `prisma/migrations/0000_baseline`.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, how it works, roles, why SA, CTAs |
| `/talent` | Engineer registration form |
| `/company` | Company hiring request form |

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/talent` | POST | Save talent submission (multipart, optional PDF upload) |
| `/api/company` | POST | Save company hiring request (JSON) |
| `/api/health/db` | GET | Prisma database connectivity health check |

---

## Project Structure

```
app/
├── layout.tsx              # Root layout: fonts, metadata, Navbar, Footer
├── page.tsx                # Landing page (/)
├── globals.css             # Global styles, dot-grid pattern
├── talent/page.tsx         # Talent registration (/talent)
├── company/page.tsx      # Company hiring request (/company)
└── api/
    ├── health/db/route.ts  # GET — database connectivity check
    ├── talent/route.ts     # POST — save talent profile
    └── company/route.ts  # POST — save hiring request
components/
├── Navbar.tsx              # Fixed navbar with scroll-state + mobile menu
├── Footer.tsx              # 3-column footer
├── TalentForm.tsx          # Full talent registration form
├── CompanyForm.tsx         # Company hiring request form
└── ui/
    ├── Button.tsx          # Primary/secondary/ghost button + buttonVariants
    ├── Input.tsx           # Accessible labeled input
    ├── Select.tsx          # Accessible labeled select
    ├── Textarea.tsx        # Accessible textarea with char count
    └── Badge.tsx           # Role/stat badge
lib/
├── prisma.ts               # Prisma client singleton + Postgres adapter
├── supabase.ts             # Browser-side Supabase client (anon key)
├── supabase-server.ts      # Server-side client factory (route handlers)
└── validations.ts          # Zod schemas for both forms
types/index.ts              # TypeScript types
prisma/
├── schema.prisma           # Prisma models mapped to existing Supabase tables
└── migrations/
    └── 0000_baseline/      # Baseline migration snapshot
prisma.config.ts            # Prisma config (loads .env.local)
supabase/migrations.sql     # Executable SQL for tables + RLS + storage
```

---

## Security Model

- Form writes to `talent_submissions` and `company_submissions` are server-side via **Prisma**
- Supabase client (anon key) is still used for resume upload to the `resumes` bucket
- Existing RLS policies remain in Supabase for direct client-side inserts (if ever enabled)
- Resume files go to a **private storage bucket** — no public access
- The `resume_url` field stores the **storage path**, not a public URL
- `GET /api/health/db` provides a lightweight DB health probe

---

## Build & Deploy

```bash
npm run build   # Production build
npm run lint    # Lint check
npm start       # Start production server
```

Deploy to [Vercel](https://vercel.com) by connecting the repo. Set environment variables in the Vercel project settings (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`, `DIRECT_URL`).

---

## Prisma Workflow

```bash
npm run prisma:validate      # Validate Prisma schema
npm run prisma:generate      # Regenerate Prisma client
npm run prisma:migrate:dev   # Create/apply a new migration in development
npm run prisma:migrate:deploy # Apply committed migrations in CI/production
```

This project includes a committed baseline migration at `prisma/migrations/0000_baseline` for the existing Supabase schema.

For Prisma + Supabase migration strategy details, see `supabase/DATABASE_GUIDE.md`.

---

## Phase 2 Roadmap

- Authentication / admin dashboard for viewing submissions
- Email notifications via Supabase Edge Functions
- Candidate-company matching logic
- Blog / content section
