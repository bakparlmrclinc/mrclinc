import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";
import { CaseStatus } from "@prisma/client";

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
    const { status, note } = body;

    // Validate status
    const validStatuses: CaseStatus[] = [
      "received",
      "under_review",
      "channel_contacted",
      "information_ready",
      "next_steps_shared",
      "confirmed",
      "completed",
      "closed",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Get current case
    const currentCase = await prisma.case.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!currentCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Update case and create history entry
    await prisma.$transaction([
      prisma.case.update({
        where: { id },
        data: { status },
      }),
      prisma.caseStatusHistory.create({
        data: {
          caseId: id,
          status,
          changedById: user.id,
          note,
          source: "ADMIN",
        },
      }),
      prisma.auditLog.create({
        data: {
          actorId: user.id,
          actorType: "ADMIN",
          action: "CASE_STATUS_CHANGED",
          entityType: "Case",
          entityId: id,
          beforeJson: JSON.stringify({ status: currentCase.status }),
          afterJson: JSON.stringify({ status }),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status change error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
