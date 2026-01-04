import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; escalationId: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditCases(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, escalationId } = await params;
    const body = await request.json();
    const { resolutionNote } = body;

    if (!resolutionNote?.trim()) {
      return NextResponse.json({ error: "Resolution note required" }, { status: 400 });
    }

    // Verify escalation exists and belongs to case
    const escalation = await prisma.escalation.findFirst({
      where: { id: escalationId, caseId: id },
    });

    if (!escalation) {
      return NextResponse.json({ error: "Escalation not found" }, { status: 404 });
    }

    // Check if there are other open escalations
    const otherOpenEscalations = await prisma.escalation.findFirst({
      where: {
        caseId: id,
        id: { not: escalationId },
        resolvedAt: null,
      },
    });

    await prisma.$transaction([
      prisma.escalation.update({
        where: { id: escalationId },
        data: {
          resolvedAt: new Date(),
          resolutionNote: resolutionNote.trim(),
          resolvedById: user.id,
        },
      }),
      // If no other open escalations, reset case escalation level
      ...(!otherOpenEscalations
        ? [
            prisma.case.update({
              where: { id },
              data: { escalationLevel: "NONE" },
            }),
          ]
        : []),
      prisma.auditLog.create({
        data: {
          actorId: user.id,
          actorType: "ADMIN",
          action: "ESCALATION_RESOLVED",
          entityType: "Escalation",
          entityId: escalationId,
          afterJson: JSON.stringify({ resolutionNote }),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Escalation resolve error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
