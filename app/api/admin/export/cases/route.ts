// app/api/admin/export/cases/route.ts
// Export Cases as CSV

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, shouldMaskPII, maskEmail, maskPhone } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");

    const where: Record<string, unknown> = {};
    
    if (status) {
      where.status = status;
    }
    if (fromDate || toDate) {
      where.createdAt = {};
      if (fromDate) {
        (where.createdAt as Record<string, Date>).gte = new Date(fromDate);
      }
      if (toDate) {
        (where.createdAt as Record<string, Date>).lte = new Date(toDate);
      }
    }

    const cases = await prisma.case.findMany({
      where,
      include: {
        assignedPd: {
          select: { pdCode: true, fullName: true },
        },
        channel: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const maskPII = shouldMaskPII(session.role);

    // Build CSV
    const headers = [
      "Tracking Code",
      "Status",
      "Created At",
      "Patient Name",
      "Patient Email",
      "Patient Phone",
      "Patient Country",
      "Patient City",
      "Main Category",
      "Sub Type",
      "Assignment Mode",
      "Assigned PD Code",
      "Assigned PD Name",
      "Channel",
      "Closed Reason",
      "Closed At",
    ];

    const rows = cases.map((c) => [
      c.trackingCode,
      c.status,
      c.createdAt.toISOString(),
      maskPII ? "***" : c.patientName,
      maskPII ? maskEmail(c.patientEmail) : c.patientEmail,
      maskPII ? maskPhone(c.patientPhone) : (c.patientPhone || ""),
      c.patientCountry,
      c.patientCity || "",
      c.mainCategory,
      c.medicalSubType || c.aestheticSubCategory || "",
      c.assignmentMode || "",
      c.assignedPd?.pdCode || "",
      c.assignedPd?.fullName || "",
      c.channel?.name || "",
      c.closedReason || "",
      c.closedAt?.toISOString() || "",
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
        action: "EXPORT_CASES",
        entityType: "Case",
        entityId: "BULK",
        afterJson: JSON.stringify({ count: cases.length, filters: { status, fromDate, toDate } }),
      },
    });

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="cases-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export cases error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
