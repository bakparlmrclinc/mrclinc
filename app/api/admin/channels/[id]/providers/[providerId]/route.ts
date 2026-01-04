// app/api/admin/channels/[id]/providers/[providerId]/route.ts
// Provider Detail API - Get, Update

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditChannels } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string; providerId: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canEditChannels(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: channelId, providerId } = await params;
    const body = await request.json();

    const existingProvider = await prisma.provider.findFirst({
      where: { id: providerId, channelId },
    });

    if (!existingProvider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const { displayName, specialties, status, notes } = body;

    const provider = await prisma.provider.update({
      where: { id: providerId },
      data: {
        ...(displayName && { displayName }),
        ...(specialties && { specialties }),
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "PROVIDER_UPDATED",
        entityType: "Provider",
        entityId: provider.id,
        beforeJson: JSON.stringify(existingProvider),
        afterJson: JSON.stringify(provider),
      },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.error("Update provider error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
