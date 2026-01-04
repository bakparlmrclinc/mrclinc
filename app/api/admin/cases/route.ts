/**
 * GET /api/admin/cases
 * 
 * Admin case list endpoint - returns cases with filtering support
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const pdId = searchParams.get("pdId");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }
    if (pdId) {
      where.assignedPdId = pdId;
    }

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        include: {
          assignedPd: { select: { pdCode: true, fullName: true } },
        },
        orderBy: { createdAt: "desc" },
        take: Math.min(limit, 100),
        skip: offset,
      }),
      prisma.case.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: cases,
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Admin cases API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Cases are created via public /api/requests endpoint
  // Admin should not create cases directly
  return NextResponse.json(
    { error: "Cases are created via the patient request form" },
    { status: 405 }
  );
}
