import { z } from "zod";

const isSafeUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

// ─── Talent Form Schema ────────────────────────────────────────────────────

export const talentFormSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be under 255 characters")
    .email("Please enter a valid email address"),

  linkedin_url: z
    .string()
    .min(1, "LinkedIn URL is required")
    .max(255, "LinkedIn URL must be under 255 characters")
    .url("Please enter a valid URL")
    .refine(isSafeUrl, "Please enter a valid HTTP or HTTPS URL")
    .refine(
      (url) => url.includes("linkedin.com"),
      "Please enter a valid LinkedIn URL"
    ),

  github_url: z
    .string()
    .max(255, "GitHub URL must be under 255 characters")
    .url("Please enter a valid URL")
    .refine(isSafeUrl, "Please enter a valid HTTP or HTTPS URL")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .length(2, "Please select your country"),

  phone: z
    .string()
    .min(5, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s\-]+$/, "Phone number may only contain digits, spaces, and dashes"),

  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location must be under 100 characters"),

  open_to_relocation: z
    .enum(["yes", "no", "already_remote"])
    .optional()
    .or(z.literal("")),

  primary_role: z
    .string()
    .min(1, "Please select your primary role")
    .refine(
      (v) =>
        [
          "Backend Engineer",
          "Frontend Engineer",
          "Fullstack Engineer",
          "AI / ML Engineer",
          "DevOps / Cloud Engineer",
          "Data Engineer",
          "Other",
        ].includes(v),
      "Please select a valid role"
    ),

  years_experience: z
    .string()
    .min(1, "Please select your years of experience")
    .refine(
      (v) => ["2–3 years", "3–5 years", "5–8 years", "8+ years"].includes(v),
      "Please select a valid experience range"
    ),

  tech_stack: z
    .string()
    .min(5, "Please describe your tech stack")
    .max(1000, "Tech stack description must be under 1000 characters"),

  employment_status: z
    .string()
    .min(1, "Please select your employment status")
    .refine(
      (v) =>
        ["Actively looking", "Open to opportunities", "Not looking right now"].includes(v),
      "Please select a valid status"
    ),

  expected_salary: z
    .string()
    .max(100, "Salary must be under 100 characters")
    .optional()
    .or(z.literal("")),

  work_arrangement: z
    .array(
      z.string().refine(
        (v) =>
          ["Fully remote", "Contract", "Full-time employment", "Freelance"].includes(v),
        "Invalid work arrangement"
      )
    )
    .min(1, "Please select at least one work arrangement")
    .max(10, "Too many work arrangements selected"),

  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type TalentFormValues = z.infer<typeof talentFormSchema>;

// ─── Company Form Schema ───────────────────────────────────────────────────

export const companyFormSchema = z.object({
  company_name: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be under 100 characters"),

  company_website: z
    .string()
    .min(1, "Company website is required")
    .max(255, "Company website must be under 255 characters")
    .url("Please enter a valid URL")
    .refine(isSafeUrl, "Please enter a valid HTTP or HTTPS URL"),

  contact_name: z
    .string()
    .min(2, "Your name is required")
    .max(100, "Name must be under 100 characters"),

  contact_title: z
    .string()
    .min(2, "Your role/title is required")
    .max(100, "Title must be under 100 characters"),

  contact_email: z
    .string()
    .min(1, "Work email is required")
    .max(255, "Work email must be under 255 characters")
    .email("Please enter a valid email address"),

  country: z
    .string()
    .length(2, "Please select your country"),

  phone: z
    .string()
    .min(5, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s\-]+$/, "Phone number may only contain digits, spaces, and dashes"),

  company_size: z
    .string()
    .min(1, "Please select your company size")
    .refine(
      (v) => ["1–10 (startup)", "11–50", "51–200", "201–500", "500+"].includes(v),
      "Please select a valid company size"
    ),

  company_location: z
    .string()
    .min(2, "Company location is required")
    .max(100, "Location must be under 100 characters"),

  role_title: z
    .string()
    .min(2, "Role title is required")
    .max(100, "Role title must be under 100 characters"),

  role_type: z
    .string()
    .min(1, "Please select a role type")
    .refine(
      (v) =>
        [
          "Backend Engineer",
          "Frontend Engineer",
          "Fullstack Engineer",
          "AI / ML Engineer",
          "DevOps / Cloud Engineer",
          "Data Engineer",
          "Other",
        ].includes(v),
      "Please select a valid role type"
    ),

  seniority_level: z
    .string()
    .min(1, "Please select a seniority level")
    .refine(
      (v) =>
        ["Mid-level (2–5 years)", "Senior (5–8 years)", "Lead / Staff (8+ years)"].includes(v),
      "Please select a valid seniority level"
    ),

  number_of_roles: z
    .string()
    .min(1, "Please select the number of roles")
    .refine(
      (v) => ["1", "2", "3", "4", "5+"].includes(v),
      "Please select a valid number"
    ),

  employment_type: z
    .string()
    .min(1, "Please select an employment type")
    .refine(
      (v) =>
        ["Full-time permanent", "Contract (fixed term)", "Contract-to-hire", "Freelance"].includes(v),
      "Please select a valid employment type"
    ),

  work_arrangement: z
    .string()
    .min(1, "Please select a work arrangement")
    .refine(
      (v) => ["Fully remote", "Remote with occasional travel"].includes(v),
      "Please select a valid work arrangement"
    ),

  tech_stack: z
    .string()
    .min(5, "Please describe the required tech stack")
    .max(2000, "Tech stack description must be under 2000 characters"),

  salary_budget: z
    .string()
    .max(100, "Salary must be under 100 characters")
    .optional()
    .or(z.literal("")),

  target_start_date: z.string().max(100, "Date must be under 100 characters").optional().or(z.literal("")),

  role_description: z
    .string()
    .max(1000, "Description must be under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
