// app/api/admin/earnings/[id]/status/route.ts
// Update earnings/payout status

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditEarnings } from "@/lib/auth";
import { PayoutStatus } from "@prisma/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canEditEarnings(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["UNPAID", "SCHEDULED", "PAID", "ADJUSTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const existingEntry = await prisma.earningsLedger.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Earnings entry not found" },
        { status: 404 }
      );
    }

    const entry = await prisma.earningsLedger.update({
      where: { id },
      data: {
        payoutStatus: status as PayoutStatus,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "PAYOUT_STATUS_CHANGED",
        entityType: "EarningsLedger",
        entityId: id,
        beforeJson: JSON.stringify({ payoutStatus: existingEntry.payoutStatus }),
        afterJson: JSON.stringify({ payoutStatus: status }),
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Update earnings status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
