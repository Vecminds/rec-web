import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      ok: true,
      service: "database",
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return NextResponse.json(
      {
        ok: false,
        service: "database",
        error: "Unable to reach database.",
        checkedAt: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
