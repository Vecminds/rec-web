"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { companyFormSchema, type CompanyFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { ApiResponse } from "@/types";

const COMPANY_SIZE_OPTIONS = [
  { value: "1–10 (startup)", label: "1–10 (startup)" },
  { value: "11–50", label: "11–50" },
  { value: "51–200", label: "51–200" },
  { value: "201–500", label: "201–500" },
  { value: "500+", label: "500+" },
];

const ROLE_TYPE_OPTIONS = [
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Fullstack Engineer", label: "Fullstack Engineer" },
  { value: "AI / ML Engineer", label: "AI / ML Engineer" },
  { value: "DevOps / Cloud Engineer", label: "DevOps / Cloud Engineer" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "Other", label: "Other" },
];

const SENIORITY_OPTIONS = [
  { value: "Mid-level (2–5 years)", label: "Mid-level (2–5 years)" },
  { value: "Senior (5–8 years)", label: "Senior (5–8 years)" },
  { value: "Lead / Staff (8+ years)", label: "Lead / Staff (8+ years)" },
];

const NUMBER_OF_ROLES_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "Full-time permanent", label: "Full-time permanent" },
  { value: "Contract (fixed term)", label: "Contract (fixed term)" },
  { value: "Contract-to-hire", label: "Contract-to-hire" },
  { value: "Freelance", label: "Freelance" },
];

const WORK_ARRANGEMENT_OPTIONS = [
  { value: "Fully remote", label: "Fully remote" },
  {
    value: "Remote with occasional travel",
    label: "Remote with occasional travel",
  },
];

export function CompanyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
  });

  const roleDescValue = watch("role_description") ?? "";

  const onSubmit = async (data: CompanyFormValues) => {
    setSubmitError(null);

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json: ApiResponse = await res.json();

      if (!res.ok || !json.success) {
        setSubmitError(
          "error" in json
            ? json.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Could not submit your request. Please check your connection and try again.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-6 py-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-accent" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-text-primary mb-3">
            Request received
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-md">
            We&apos;ve received your request. We&apos;ll review it and follow up
            at your email within 1–2 business days to confirm scope and next
            steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8"
      aria-label="Company hiring request form"
    >
      {/* ── Company info ───────────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-6">
        <legend className="font-display font-semibold text-lg text-text-primary mb-2">
          Company information
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="company_name"
            label="Company name"
            type="text"
            required
            placeholder="e.g. Acme Corp"
            error={errors.company_name?.message}
            {...register("company_name")}
          />
          <Input
            id="company_website"
            label="Company website"
            type="url"
            required
            placeholder="https://yourcompany.com"
            error={errors.company_website?.message}
            {...register("company_website")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="contact_name"
            label="Your name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g. Sarah Chen"
            error={errors.contact_name?.message}
            {...register("contact_name")}
          />
          <Input
            id="contact_title"
            label="Your role / title"
            type="text"
            required
            placeholder="e.g. Head of Engineering"
            error={errors.contact_title?.message}
            {...register("contact_title")}
          />
        </div>

        <Input
          id="contact_email"
          label="Work email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@yourcompany.com"
          error={errors.contact_email?.message}
          {...register("contact_email")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            id="company_size"
            label="Company size"
            required
            options={COMPANY_SIZE_OPTIONS}
            placeholder="Select size"
            error={errors.company_size?.message}
            {...register("company_size")}
          />
          <Input
            id="company_location"
            label="Where is your company based?"
            type="text"
            required
            placeholder="e.g. San Francisco, CA, USA"
            error={errors.company_location?.message}
            {...register("company_location")}
          />
        </div>
      </fieldset>

      {/* ── Role details ───────────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-6">
        <legend className="font-display font-semibold text-lg text-text-primary mb-2">
          Role details
        </legend>

        <Input
          id="role_title"
          label="Role title"
          type="text"
          required
          placeholder="e.g. Senior Backend Engineer"
          error={errors.role_title?.message}
          {...register("role_title")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            id="role_type"
            label="Role type"
            required
            options={ROLE_TYPE_OPTIONS}
            placeholder="Select role type"
            error={errors.role_type?.message}
            {...register("role_type")}
          />
          <Select
            id="seniority_level"
            label="Seniority level"
            required
            options={SENIORITY_OPTIONS}
            placeholder="Select seniority"
            error={errors.seniority_level?.message}
            {...register("seniority_level")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Select
            id="number_of_roles"
            label="Number of roles"
            required
            options={NUMBER_OF_ROLES_OPTIONS}
            placeholder="Select"
            error={errors.number_of_roles?.message}
            {...register("number_of_roles")}
          />
          <Select
            id="employment_type"
            label="Employment type"
            required
            options={EMPLOYMENT_TYPE_OPTIONS}
            placeholder="Select type"
            error={errors.employment_type?.message}
            {...register("employment_type")}
          />
          <Select
            id="work_arrangement"
            label="Work arrangement"
            required
            options={WORK_ARRANGEMENT_OPTIONS}
            placeholder="Select arrangement"
            error={errors.work_arrangement?.message}
            {...register("work_arrangement")}
          />
        </div>

        <Textarea
          id="tech_stack"
          label="Tech stack required"
          required
          rows={3}
          placeholder="List the technologies, frameworks, and tools the candidate must know"
          error={errors.tech_stack?.message}
          {...register("tech_stack")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="salary_budget"
            label="Salary / compensation budget"
            type="text"
            placeholder="e.g. $70,000–$90,000/year USD or $4,000–$6,000/month"
            error={errors.salary_budget?.message}
            helpText="Optional"
            {...register("salary_budget")}
          />
          <Input
            id="target_start_date"
            label="Target start date"
            type="date"
            error={errors.target_start_date?.message}
            helpText="Optional"
            {...register("target_start_date")}
          />
        </div>

        <Textarea
          id="role_description"
          label="Role description / additional context"
          rows={5}
          maxLength={1000}
          showCharCount
          currentLength={roleDescValue.length}
          placeholder="Share anything that helps us understand the role, team, and what success looks like in 6 months"
          error={errors.role_description?.message}
          helpText="Optional — max 1000 characters"
          {...register("role_description")}
        />
      </fieldset>

      {/* ── Submit error ───────────────────────────────────────────────── */}
      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-500"
        >
          {submitError}
        </div>
      )}

      {/* ── Submit button ──────────────────────────────────────────────── */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full sm:w-auto"
      >
        Submit hiring request →
      </Button>
    </form>
  );
}
