// app/api/admin/channels/route.ts
// Clinical Channels API - List and Create

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { canEditChannels } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const channels = await prisma.clinicalChannel.findMany({
      include: {
        providers: true,
        _count: { select: { cases: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(channels);
  } catch (error) {
    console.error("Get channels error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canEditChannels(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, city, serviceCoverage, status, responseSlaHours, contactMethods, notes } = body;

    if (!name || !city || !serviceCoverage?.length) {
      return NextResponse.json(
        { error: "Name, city, and service coverage are required" },
        { status: 400 }
      );
    }

    const channel = await prisma.clinicalChannel.create({
      data: {
        name,
        city,
        serviceCoverage,
        status: status || "ACTIVE",
        responseSlaHours,
        contactMethods,
        notes,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "CHANNEL_CREATED",
        entityType: "ClinicalChannel",
        entityId: channel.id,
        afterJson: JSON.stringify(channel),
      },
    });

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    console.error("Create channel error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
