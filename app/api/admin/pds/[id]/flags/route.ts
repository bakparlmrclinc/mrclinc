import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditPDs } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditPDs(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { flagType, severity, reason } = body;

    if (!flagType?.trim() || !reason?.trim()) {
      return NextResponse.json(
        { error: "Flag type and reason required" },
        { status: 400 }
      );
    }

    const validSeverities = ["LOW", "MEDIUM", "HIGH"];
    if (!validSeverities.includes(severity)) {
      return NextResponse.json({ error: "Invalid severity" }, { status: 400 });
    }

    await prisma.complianceFlag.create({
      data: {
        pdId: id,
        flagType: flagType.trim(),
        severity,
        reason: reason.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Compliance flag create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
