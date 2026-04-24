"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { talentFormSchema, type TalentFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { ApiResponse } from "@/types";

const PRIMARY_ROLE_OPTIONS = [
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Fullstack Engineer", label: "Fullstack Engineer" },
  { value: "AI / ML Engineer", label: "AI / ML Engineer" },
  { value: "DevOps / Cloud Engineer", label: "DevOps / Cloud Engineer" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "Other", label: "Other" },
];

const EXPERIENCE_OPTIONS = [
  { value: "2–3 years", label: "2–3 years" },
  { value: "3–5 years", label: "3–5 years" },
  { value: "5–8 years", label: "5–8 years" },
  { value: "8+ years", label: "8+ years" },
];

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "Actively looking", label: "Actively looking" },
  { value: "Open to opportunities", label: "Open to opportunities" },
  { value: "Not looking right now", label: "Not looking right now" },
];

const WORK_ARRANGEMENT_OPTIONS = [
  "Fully remote",
  "Contract",
  "Full-time employment",
  "Freelance",
] as const;

const RELOCATION_OPTIONS = [
  { value: "yes", label: "Yes, open to relocating" },
  { value: "no", label: "No" },
  { value: "already_remote", label: "I'm already working remotely" },
];

export function TalentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TalentFormValues>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: {
      work_arrangement: [],
    },
  });

  const bioValue = watch("bio") ?? "";
  const selectedArrangements = watch("work_arrangement") ?? [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeError(null);
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setResumeError("Only PDF files are accepted.");
      setResumeFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File size must be under 5MB.");
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  };

  const toggleArrangement = (option: string) => {
    if (selectedArrangements.includes(option)) {
      setValue(
        "work_arrangement",
        selectedArrangements.filter((a) => a !== option),
        { shouldValidate: true },
      );
    } else {
      setValue("work_arrangement", [...selectedArrangements, option], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: TalentFormValues) => {
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "work_arrangement" && Array.isArray(value)) {
          value.forEach((v) => formData.append("work_arrangement", v));
        } else if (value !== undefined && value !== "") {
          formData.append(key, String(value));
        }
      });

      // Append resume if present
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = await fetch("/api/talent", {
        method: "POST",
        body: formData,
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
        "Could not submit your profile. Please check your connection and try again.",
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
            Profile received
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-md">
            Thanks — we&apos;ve received your profile. If there&apos;s a match
            with a current or upcoming role, we&apos;ll reach out directly to
            your email. We review all profiles within 3 business days.
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
      aria-label="Talent registration form"
    >
      {/* ── Personal info ──────────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-6">
        <legend className="font-display font-semibold text-lg text-text-primary mb-2">
          Personal information
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="full_name"
            label="Full name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g. Aarav Sharma"
            error={errors.full_name?.message}
            {...register("full_name")}
          />
          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Input
          id="linkedin_url"
          label="LinkedIn profile URL"
          type="url"
          required
          placeholder="https://linkedin.com/in/yourprofile"
          error={errors.linkedin_url?.message}
          {...register("linkedin_url")}
        />

        <Input
          id="github_url"
          label="GitHub / Portfolio URL"
          type="url"
          placeholder="https://github.com/yourhandle"
          error={errors.github_url?.message}
          helpText="Optional"
          {...register("github_url")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="location"
            label="Location / City"
            type="text"
            required
            placeholder="Kathmandu, Nepal"
            error={errors.location?.message}
            {...register("location")}
          />
          <Select
            id="open_to_relocation"
            label="Open to relocation?"
            options={RELOCATION_OPTIONS}
            placeholder="Select an option (optional)"
            error={errors.open_to_relocation?.message}
            {...register("open_to_relocation")}
          />
        </div>
      </fieldset>

      {/* ── Professional info ──────────────────────────────────────────── */}
      <fieldset className="flex flex-col gap-6">
        <legend className="font-display font-semibold text-lg text-text-primary mb-2">
          Professional information
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            id="primary_role"
            label="Primary role"
            required
            options={PRIMARY_ROLE_OPTIONS}
            placeholder="Select your role"
            error={errors.primary_role?.message}
            {...register("primary_role")}
          />
          <Select
            id="years_experience"
            label="Years of experience"
            required
            options={EXPERIENCE_OPTIONS}
            placeholder="Select range"
            error={errors.years_experience?.message}
            {...register("years_experience")}
          />
        </div>

        <Textarea
          id="tech_stack"
          label="Primary tech stack / skills"
          required
          rows={3}
          placeholder="e.g. Python, FastAPI, PostgreSQL, AWS — list the tools you work with most"
          error={errors.tech_stack?.message}
          {...register("tech_stack")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            id="employment_status"
            label="Current employment status"
            required
            options={EMPLOYMENT_STATUS_OPTIONS}
            placeholder="Select status"
            error={errors.employment_status?.message}
            {...register("employment_status")}
          />
          <Input
            id="expected_salary"
            label="Expected salary range"
            type="text"
            placeholder="e.g. $2,000–$3,500/month USD"
            error={errors.expected_salary?.message}
            helpText="Optional"
            {...register("expected_salary")}
          />
        </div>

        {/* Work arrangement — multi-select checkboxes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-primary">
            Preferred work arrangement
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          </span>
          <div
            className="flex flex-col gap-3"
            role="group"
            aria-labelledby="work_arrangement_label"
          >
            {WORK_ARRANGEMENT_OPTIONS.map((option) => {
              const isChecked = selectedArrangements.includes(option);
              const checkboxId = `arrangement_${option.replace(/\s+/g, "_").toLowerCase()}`;
              return (
                <label
                  key={option}
                  htmlFor={checkboxId}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                      isChecked
                        ? "bg-accent border-accent"
                        : "border-border group-hover:border-border-light bg-surface"
                    }`}
                    aria-hidden="true"
                  >
                    {isChecked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M10 3L5 8.5 2 5.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    id={checkboxId}
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => toggleArrangement(option)}
                    aria-label={option}
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-150">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.work_arrangement && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.work_arrangement.message as string}
            </p>
          )}
        </div>

        <Textarea
          id="bio"
          label="Brief bio / cover note"
          rows={4}
          maxLength={500}
          showCharCount
          currentLength={bioValue.length}
          placeholder="Tell us what you've built and what kind of work excites you"
          error={errors.bio?.message}
          helpText="Optional — max 500 characters"
          {...register("bio")}
        />

        {/* Resume upload */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="resume"
            className="text-sm font-medium text-text-primary"
          >
            Resume / CV
            <span className="ml-1 text-text-tertiary text-xs">
              (optional — PDF only, max 5MB)
            </span>
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl px-6 py-8 text-center transition-colors duration-200 ${
              resumeFile
                ? "border-accent/40 bg-accent/5"
                : resumeError
                  ? "border-red-400/40 bg-red-400/5"
                  : "border-border hover:border-border-light"
            }`}
          >
            <input
              id="resume"
              type="file"
              accept="application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              aria-describedby={resumeError ? "resume-error" : undefined}
            />
            <div className="pointer-events-none">
              {resumeFile ? (
                <p className="text-sm text-accent font-medium">
                  {resumeFile.name}
                </p>
              ) : (
                <>
                  <p className="text-sm text-text-secondary">
                    Drop your PDF here or click to browse
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    PDF • max 5MB
                  </p>
                </>
              )}
            </div>
          </div>
          {resumeError && (
            <p id="resume-error" role="alert" className="text-xs text-red-400">
              {resumeError}
            </p>
          )}
        </div>
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
        Submit your profile →
      </Button>
    </form>
  );
}
