import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditPDs } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; flagId: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditPDs(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, flagId } = await params;
    const body = await request.json();
    const { resolutionNote } = body;

    if (!resolutionNote?.trim()) {
      return NextResponse.json(
        { error: "Resolution note required" },
        { status: 400 }
      );
    }

    // Verify flag exists and belongs to PD
    const flag = await prisma.complianceFlag.findFirst({
      where: { id: flagId, pdId: id },
    });

    if (!flag) {
      return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    }

    await prisma.complianceFlag.update({
      where: { id: flagId },
      data: {
        resolvedAt: new Date(),
        resolutionNote: resolutionNote.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Flag resolve error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
