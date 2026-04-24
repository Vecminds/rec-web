import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { companyFormSchema } from "@/lib/validations";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // ── Parse JSON body ────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // ── Validate with Zod ─────────────────────────────────────────────────
  const parsed = companyFormSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        error: `${firstError.path.join(".")}: ${firstError.message}`,
      },
      { status: 400 }
    );
  }

  // ── Init Supabase ─────────────────────────────────────────────────────
  let supabase;
  try {
    supabase = createServerSupabaseClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server configuration error.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }

  // ── Insert into Supabase ───────────────────────────────────────────────
  const data = parsed.data;

  const { error: insertError } = await supabase
    .from("company_submissions")
    .insert({
      company_name: data.company_name,
      company_website: data.company_website,
      contact_name: data.contact_name,
      contact_title: data.contact_title,
      contact_email: data.contact_email,
      country: data.country,
      phone: data.phone,
      company_size: data.company_size,
      company_location: data.company_location,
      role_title: data.role_title,
      role_type: data.role_type,
      seniority_level: data.seniority_level,
      number_of_roles: data.number_of_roles,
      employment_type: data.employment_type,
      work_arrangement: data.work_arrangement,
      tech_stack: data.tech_stack,
      salary_budget: data.salary_budget ?? null,
      target_start_date: data.target_start_date || null,
      role_description: data.role_description ?? null,
    });

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { success: false, error: "Failed to submit your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
