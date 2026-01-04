// app/api/admin/channels/[id]/route.ts
// Clinical Channel Detail API - Get, Update, Delete

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditChannels } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const channel = await prisma.clinicalChannel.findUnique({
      where: { id },
      include: {
        providers: true,
        _count: { select: { cases: true } },
      },
    });

    if (!channel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    return NextResponse.json(channel);
  } catch (error) {
    console.error("Get channel error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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

    const { id } = await params;
    const body = await request.json();

    const existingChannel = await prisma.clinicalChannel.findUnique({
      where: { id },
    });

    if (!existingChannel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const { name, city, serviceCoverage, status, responseSlaHours, contactMethods, notes } = body;

    const channel = await prisma.clinicalChannel.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(city && { city }),
        ...(serviceCoverage && { serviceCoverage }),
        ...(status && { status }),
        ...(responseSlaHours !== undefined && { responseSlaHours }),
        ...(contactMethods !== undefined && { contactMethods }),
        ...(notes !== undefined && { notes }),
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "CHANNEL_UPDATED",
        entityType: "ClinicalChannel",
        entityId: channel.id,
        beforeJson: JSON.stringify(existingChannel),
        afterJson: JSON.stringify(channel),
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.error("Update channel error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
