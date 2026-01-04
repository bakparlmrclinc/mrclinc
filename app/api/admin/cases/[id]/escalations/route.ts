import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";
import { EscalationLevel, EscalationReason } from "@prisma/client";

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
    const { level, reason, summary } = body;

    if (!summary?.trim()) {
      return NextResponse.json({ error: "Summary required" }, { status: 400 });
    }

    const validLevels: EscalationLevel[] = ["L1", "L2", "L3"];
    const validReasons: EscalationReason[] = [
      "SLA_BREACH",
      "PATIENT_COMPLAINT",
      "PD_ISSUE",
      "CHANNEL_ISSUE",
      "PROCESS_DELAY",
      "OTHER",
    ];

    if (!validLevels.includes(level) || !validReasons.includes(reason)) {
      return NextResponse.json({ error: "Invalid level or reason" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.escalation.create({
        data: {
          caseId: id,
          level,
          reason,
          summary: summary.trim(),
          createdById: user.id,
        },
      }),
      prisma.case.update({
        where: { id },
        data: { escalationLevel: level },
      }),
      prisma.auditLog.create({
        data: {
          actorId: user.id,
          actorType: "ADMIN",
          action: "ESCALATION_CREATED",
          entityType: "Case",
          entityId: id,
          afterJson: JSON.stringify({ level, reason }),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Escalation create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
