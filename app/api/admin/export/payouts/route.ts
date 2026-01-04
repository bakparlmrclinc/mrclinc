// app/api/admin/export/payouts/route.ts
// Export Earnings/Payouts as CSV

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canViewEarnings } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canViewEarnings(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const pdId = searchParams.get("pdId");
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");

    const where: Record<string, unknown> = {};
    
    if (status) {
      where.payoutStatus = status;
    }
    if (pdId) {
      where.pdId = pdId;
    }
    if (fromDate || toDate) {
      where.earnedAt = {};
      if (fromDate) {
        (where.earnedAt as Record<string, Date>).gte = new Date(fromDate);
      }
      if (toDate) {
        (where.earnedAt as Record<string, Date>).lte = new Date(toDate);
      }
    }

    const earnings = await prisma.earningsLedger.findMany({
      where,
      include: {
        pd: {
          select: { pdCode: true, fullName: true },
        },
        case: {
          select: { trackingCode: true },
        },
      },
      orderBy: { earnedAt: "desc" },
    });

    // Build CSV
    const headers = [
      "ID",
      "PD Code",
      "PD Name",
      "Case Tracking Code",
      "Service Type",
      "Base Amount",
      "Bonus Amount",
      "Currency",
      "Earned At",
      "Payout Status",
      "Payout Batch ID",
      "Notes",
    ];

    const rows = earnings.map((e) => [
      e.id,
      e.pd.pdCode,
      e.pd.fullName,
      e.case.trackingCode,
      e.serviceType,
      e.baseAmount.toString(),
      e.bonusAmount.toString(),
      e.currency,
      e.earnedAt.toISOString(),
      e.payoutStatus,
      e.payoutBatchId || "",
      e.notes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.id,
        actorType: "ADMIN",
        action: "EXPORT_PAYOUTS",
        entityType: "EarningsLedger",
        entityId: "BULK",
        afterJson: JSON.stringify({ count: earnings.length, filters: { status, pdId, fromDate, toDate } }),
      },
    });

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="payouts-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export payouts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
