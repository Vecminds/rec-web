import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

  // ── Insert into Postgres (Prisma) ─────────────────────────────────────
  const data = parsed.data;
  const targetStartDate = data.target_start_date ? new Date(data.target_start_date) : null;

  if (targetStartDate && Number.isNaN(targetStartDate.getTime())) {
    return NextResponse.json(
      { success: false, error: "target_start_date: Please provide a valid date." },
      { status: 400 }
    );
  }

  try {
    await prisma.companySubmission.create({
      data: {
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
      target_start_date: targetStartDate,
      role_description: data.role_description ?? null,
      },
    });
  } catch (error) {
    console.error("Prisma insert error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
