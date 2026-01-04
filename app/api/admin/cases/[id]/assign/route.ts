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
    const body = await request.json();
    const { pdId, reason } = body;

    if (!pdId || !reason?.trim()) {
      return NextResponse.json(
        { error: "PD ID and reason are required" },
        { status: 400 }
      );
    }

    // Verify PD exists and is active
    const pd = await prisma.pD.findUnique({
      where: { id: pdId },
      select: { id: true, status: true, pdCode: true },
    });

    if (!pd || pd.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "PD not found or inactive" },
        { status: 400 }
      );
    }

    // Get current case
    const currentCase = await prisma.case.findUnique({
      where: { id },
      select: { assignedPdId: true, poolCity: true },
    });

    if (!currentCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Update case
    await prisma.$transaction([
      prisma.case.update({
        where: { id },
        data: {
          assignedPdId: pdId,
          assignmentMode: "MANUAL_ADMIN",
          assignedAt: new Date(),
          poolCity: null,
        },
      }),
      prisma.auditLog.create({
        data: {
          actorId: user.id,
          actorType: "ADMIN",
          action: "CASE_ASSIGNED",
          entityType: "Case",
          entityId: id,
          beforeJson: JSON.stringify({
            assignedPdId: currentCase.assignedPdId,
            poolCity: currentCase.poolCity,
          }),
          afterJson: JSON.stringify({
            assignedPdId: pdId,
            pdCode: pd.pdCode,
            reason,
          }),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assignment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
