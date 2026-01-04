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
    const { channelId, providerId } = body;

    const currentCase = await prisma.case.findUnique({
      where: { id },
      select: { channelId: true, providerId: true },
    });

    if (!currentCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.case.update({
        where: { id },
        data: { channelId, providerId },
      }),
      prisma.auditLog.create({
        data: {
          actorId: user.id,
          actorType: "ADMIN",
          action: "CASE_CHANNEL_UPDATED",
          entityType: "Case",
          entityId: id,
          beforeJson: JSON.stringify({
            channelId: currentCase.channelId,
            providerId: currentCase.providerId,
          }),
          afterJson: JSON.stringify({ channelId, providerId }),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Channel/provider update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
