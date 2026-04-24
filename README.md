# Recruitencer

> South Asia's tech talent. Built for the world.

Recruitencer is an AI-first specialist tech recruitment agency website connecting remote-first global companies with mid-to-senior software engineers, AI/ML practitioners, and DevOps engineers from Nepal and South Asia.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Database & Backend**: Supabase (PostgreSQL + Storage)
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

Fill in your Supabase credentials (from your Supabase project → Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> `SUPABASE_SERVICE_ROLE_KEY` is optional for Phase 1 — all writes use the anon key with RLS policies.

### 4. Run Supabase migrations

1. Open your Supabase project dashboard at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations.sql`
4. Paste and click **Run**

This creates:

- `talent_submissions` table
- `company_submissions` table
- Row Level Security policies (anon INSERT only)
- `resumes` private storage bucket (PDF only, 5MB limit)

### 5. Start the development server

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
├── supabase.ts             # Browser-side Supabase client (anon key)
├── supabase-server.ts      # Server-side client factory (route handlers)
└── validations.ts          # Zod schemas for both forms
types/index.ts              # TypeScript types
supabase/migrations.sql     # Executable SQL for tables + RLS + storage
```

---

## Security Model

- All form writes use the **anon key** — no service-role key required for Phase 1
- Security is enforced by **Row Level Security** (INSERT-only from anon)
- Resume files go to a **private storage bucket** — no public access
- The `resume_url` field stores the **storage path**, not a public URL
- Server-side reads (admin) are deferred to Phase 2

---

## Build & Deploy

```bash
npm run build   # Production build
npm run lint    # Lint check
npm start       # Start production server
```

Deploy to [Vercel](https://vercel.com) by connecting the repo. Set the three environment variables in the Vercel project settings.

---

## Phase 2 Roadmap

- Authentication / admin dashboard for viewing submissions
- Email notifications via Supabase Edge Functions
- Candidate-company matching logic
- Blog / content section
