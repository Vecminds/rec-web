import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";
import { talentFormSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // ── Rate Limit ─────────────────────────────────────────────────────────
  const ip = request.headers.get("x-forwarded-for") ?? "unknown-ip";
  const allowed = rateLimit(ip, { limit: 5, windowMs: 60 * 1000 }); // 5 requests per minute
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // ── Parse multipart form data ──────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid form data." },
      { status: 400 }
    );
  }

  // ── Extract and shape fields ───────────────────────────────────────────
  const rawData = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    github_url: (formData.get("github_url") as string) || undefined,
    country: formData.get("country") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    open_to_relocation: (formData.get("open_to_relocation") as string) || undefined,
    primary_role: formData.get("primary_role") as string,
    years_experience: formData.get("years_experience") as string,
    tech_stack: formData.get("tech_stack") as string,
    employment_status: formData.get("employment_status") as string,
    expected_salary: (formData.get("expected_salary") as string) || undefined,
    work_arrangement: formData.getAll("work_arrangement") as string[],
    bio: (formData.get("bio") as string) || undefined,
  };

  // ── Validate with Zod ─────────────────────────────────────────────────
  const parsed = talentFormSchema.safeParse(rawData);
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

  // ── Init Supabase (infra: storage upload only) ───────────────────────
  let supabase;
  try {
    supabase = createServerSupabaseClient();
  } catch (err) {
    console.error("Supabase initialization error:", err);
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  // ── Handle resume upload ───────────────────────────────────────────────
  let resumeUrl: string | null = null;
  const resumeFile = formData.get("resume");

  if (resumeFile && typeof resumeFile === "object" && "arrayBuffer" in resumeFile && resumeFile.size > 0) {
    // Double-check file type and size server-side
    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Resume must be a PDF file." },
        { status: 400 }
      );
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Resume file must be under 5MB." },
        { status: 400 }
      );
    }

    const fileBuffer = await resumeFile.arrayBuffer();

    // Verify PDF magic bytes (25 50 44 46)
    const uint8Array = new Uint8Array(fileBuffer);
    if (
      uint8Array.length < 4 ||
      uint8Array[0] !== 0x25 || // %
      uint8Array[1] !== 0x50 || // P
      uint8Array[2] !== 0x44 || // D
      uint8Array[3] !== 0x46    // F
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid file format. Only true PDF files are allowed." },
        { status: 400 }
      );
    }
    const fileName = `${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const storagePath = `submissions/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, fileBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: "Failed to upload resume. Please try again." },
        { status: 500 }
      );
    }

    // Store the storage path — NOT a public URL
    resumeUrl = storagePath;
  }

  // ── Insert into Postgres (Prisma) ─────────────────────────────────────
  try {
    await prisma.talentSubmission.create({
      data: {
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      linkedin_url: parsed.data.linkedin_url,
      github_url: parsed.data.github_url ?? null,
      country: parsed.data.country,
      phone: parsed.data.phone,
      location: parsed.data.location,
      open_to_relocation: parsed.data.open_to_relocation ?? null,
      primary_role: parsed.data.primary_role,
      years_experience: parsed.data.years_experience,
      tech_stack: parsed.data.tech_stack,
      employment_status: parsed.data.employment_status,
      expected_salary: parsed.data.expected_salary ?? null,
      work_arrangement: parsed.data.work_arrangement,
      bio: parsed.data.bio ?? null,
      resume_url: resumeUrl,
      },
    });
  } catch (error) {
    console.error("Prisma insert error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save your profile. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
