-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "talent_submissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "github_url" TEXT,
    "location" TEXT NOT NULL,
    "open_to_relocation" TEXT,
    "primary_role" TEXT NOT NULL,
    "years_experience" TEXT NOT NULL,
    "tech_stack" TEXT NOT NULL,
    "employment_status" TEXT NOT NULL,
    "expected_salary" TEXT,
    "work_arrangement" TEXT[],
    "bio" TEXT,
    "resume_url" TEXT,
    "country" TEXT,
    "phone" TEXT,

    CONSTRAINT "talent_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_submissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "company_name" TEXT NOT NULL,
    "company_website" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_title" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "company_size" TEXT NOT NULL,
    "company_location" TEXT NOT NULL,
    "role_title" TEXT NOT NULL,
    "role_type" TEXT NOT NULL,
    "seniority_level" TEXT NOT NULL,
    "number_of_roles" TEXT NOT NULL,
    "employment_type" TEXT NOT NULL,
    "work_arrangement" TEXT NOT NULL,
    "tech_stack" TEXT NOT NULL,
    "salary_budget" TEXT,
    "target_start_date" DATE,
    "role_description" TEXT,
    "country" TEXT,
    "phone" TEXT,

    CONSTRAINT "company_submissions_pkey" PRIMARY KEY ("id")
);
