import type {
  CompanySubmission as PrismaCompanySubmission,
  TalentSubmission as PrismaTalentSubmission,
} from "@prisma/client";

// Talent form data types
export interface TalentFormData {
  full_name: string;
  email: string;
  linkedin_url: string;
  github_url?: string;
  location: string;
  open_to_relocation?: string;
  primary_role: string;
  years_experience: string;
  tech_stack: string;
  employment_status: string;
  expected_salary?: string;
  work_arrangement: string[];
  bio?: string;
  resume?: File;
}

// Company form data types
export interface CompanyFormData {
  company_name: string;
  company_website: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  company_size: string;
  company_location: string;
  role_title: string;
  role_type: string;
  seniority_level: string;
  number_of_roles: string;
  employment_type: string;
  work_arrangement: string;
  tech_stack: string;
  salary_budget?: string;
  target_start_date?: string;
  role_description?: string;
}

// API response types
export interface ApiSuccessResponse {
  success: true;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Prisma model types
export type TalentSubmission = PrismaTalentSubmission;
export type CompanySubmission = PrismaCompanySubmission;
