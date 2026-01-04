import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { PDApplicationStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as PDApplicationStatus | null;
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { currentProfession: { contains: search, mode: "insensitive" } },
      ];
    }

    const applications = await prisma.pDApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Get counts by status
    const counts = await prisma.pDApplication.groupBy({
      by: ["status"],
      _count: true,
    });

    const statusCounts = {
      PENDING: 0,
      REVIEWED: 0,
      APPROVED: 0,
      REJECTED: 0,
    };

    counts.forEach((c) => {
      statusCounts[c.status] = c._count;
    });

    return NextResponse.json({
      applications,
      counts: statusCounts,
      total: applications.length,
    });
  } catch (error) {
    console.error("Error fetching PD applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
