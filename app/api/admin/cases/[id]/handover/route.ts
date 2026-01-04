import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditCases(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.case.update({
      where: { id },
      data: { handoverAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Handover error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
