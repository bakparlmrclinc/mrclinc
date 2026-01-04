// app/api/admin/channels/[id]/providers/route.ts
// Providers API - List and Create

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

    const providers = await prisma.provider.findMany({
      where: { channelId: id },
      orderBy: { displayName: "asc" },
    });

    return NextResponse.json(providers);
  } catch (error) {
    console.error("Get providers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canEditChannels(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: channelId } = await params;
    const body = await request.json();
    const { displayName, specialties, status, notes } = body;

    if (!displayName) {
      return NextResponse.json(
        { error: "Display name is required" },
        { status: 400 }
      );
    }

    // Verify channel exists
    const channel = await prisma.clinicalChannel.findUnique({
      where: { id: channelId },
    });

    if (!channel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const provider = await prisma.provider.create({
      data: {
        channelId,
        displayName,
        specialties: specialties || [],
        status: status || "ACTIVE",
        notes,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "PROVIDER_CREATED",
        entityType: "Provider",
        entityId: provider.id,
        afterJson: JSON.stringify(provider),
      },
    });

    return NextResponse.json(provider, { status: 201 });
  } catch (error) {
    console.error("Create provider error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
