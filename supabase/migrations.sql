-- =============================================================================
-- Recruitencer — Supabase Migration
-- Run this in your Supabase SQL Editor (dashboard.supabase.com)
-- =============================================================================

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- =============================================================================
-- Table: talent_submissions
-- =============================================================================

create table if not exists talent_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  linkedin_url text not null,
  github_url text,
  country text,
  phone text,
  location text not null,
  open_to_relocation text,
  primary_role text not null,
  years_experience text not null,
  tech_stack text not null,
  employment_status text not null,
  expected_salary text,
  work_arrangement text[] not null,
  bio text,
  resume_url text  -- stores storage path e.g. submissions/1234_resume.pdf
);

-- =============================================================================
-- Table: company_submissions
-- =============================================================================

create table if not exists company_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  company_name text not null,
  company_website text not null,
  contact_name text not null,
  contact_title text not null,
  contact_email text not null,
  country text,
  phone text,
  company_size text not null,
  company_location text not null,
  role_title text not null,
  role_type text not null,
  seniority_level text not null,
  number_of_roles text not null,
  employment_type text not null,
  work_arrangement text not null,
  tech_stack text not null,
  salary_budget text,
  target_start_date date,
  role_description text
);

-- =============================================================================
-- Row Level Security
-- Allow only anonymous INSERT — no client-side SELECT
-- =============================================================================

alter table talent_submissions enable row level security;
alter table company_submissions enable row level security;

drop policy if exists "Allow anon insert talent" on talent_submissions;
create policy "Allow anon insert talent"
  on talent_submissions for insert to anon with check (true);

drop policy if exists "Allow anon insert company" on company_submissions;
create policy "Allow anon insert company"
  on company_submissions for insert to anon with check (true);

-- =============================================================================
-- Storage: resumes bucket (private)
-- PDF files only, max 5MB per file
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,            -- private bucket — no public URLs
  5242880,          -- 5MB limit
  array['application/pdf']
)
on conflict (id) do update
  set public           = excluded.public,
      file_size_limit  = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Allow anonymous users to upload to the resumes bucket
drop policy if exists "Allow anon upload resumes" on storage.objects;
create policy "Allow anon upload resumes"
  on storage.objects for insert to anon
  with check (bucket_id = 'resumes');
