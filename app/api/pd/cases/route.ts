/**
 * GET /api/pd/cases
 * 
 * List cases for authenticated PD - Prisma version
 * - Shows assigned cases
 * - Shows pool cases available for claiming (filtered by city proximity)
 * 
 * Requires PD authentication
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
  serverErrorResponse,
  PD_MESSAGES,
} from "@/lib/api/responses";
import { pdCaseListSchema } from "@/lib/validators";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get patient initials (e.g., "John Smith" -> "John S.")
 */
function getPatientInitials(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length > 1) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return fullName;
}

// =============================================================================
// ROUTE HANDLER
// =============================================================================

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const pd = await getPDSessionFromCookies();
    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.sessionExpired);
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const parseResult = pdCaseListSchema.safeParse({
      status: searchParams.get("status") || undefined,
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 20,
    });

    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const filters = parseResult.data;

    // Build where clause for assigned cases
    const assignedWhere: Record<string, unknown> = {
      assignedPdId: pd.id,
    };

    if (filters.status) {
      assignedWhere.status = filters.status;
    }

    if (filters.search) {
      assignedWhere.OR = [
        { trackingCode: { contains: filters.search, mode: "insensitive" } },
        { patientName: { contains: filters.search, mode: "insensitive" } },
        { aestheticProcedure: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    // Get assigned cases
    const [assignedCases, totalAssigned] = await Promise.all([
      prisma.case.findMany({
        where: assignedWhere,
        select: {
          trackingCode: true,
          patientName: true,
          patientCity: true,
          mainCategory: true,
          medicalSubType: true,
          aestheticProcedure: true,
          status: true,
          assignmentMode: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.case.count({ where: assignedWhere }),
    ]);

    // Format assigned cases
    const formattedAssigned = assignedCases.map((c) => ({
      trackingCode: c.trackingCode,
      patientInitials: getPatientInitials(c.patientName),
      patientCity: c.patientCity || "Unknown",
      category: c.mainCategory,
      serviceType: c.aestheticProcedure || c.medicalSubType || null,
      status: c.status,
      assignmentType: c.assignmentMode || "POOL",
      submittedAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    // Get pool cases (unassigned, same city first)
    const poolCases = await prisma.case.findMany({
      where: {
        assignedPdId: null,
        assignmentMode: "POOL",
        status: { in: ["received", "under_review"] },
      },
      select: {
        trackingCode: true,
        patientCity: true,
        poolCity: true,
        mainCategory: true,
        medicalSubType: true,
        aestheticProcedure: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50, // Get more to sort by city
    });

    // Sort pool: same city first
    const pdCityLower = pd.city.toLowerCase();
    const sortedPool = poolCases.sort((a, b) => {
      const aCity = (a.poolCity || a.patientCity || "").toLowerCase();
      const bCity = (b.poolCity || b.patientCity || "").toLowerCase();
      const aIsLocal = aCity === pdCityLower;
      const bIsLocal = bCity === pdCityLower;

      if (aIsLocal && !bIsLocal) return -1;
      if (!aIsLocal && bIsLocal) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    // Format pool cases
    const formattedPool = sortedPool.slice(0, 20).map((c) => ({
      trackingCode: c.trackingCode,
      patientCity: c.poolCity || c.patientCity || "Unknown",
      category: c.mainCategory,
      serviceType: c.aestheticProcedure || c.medicalSubType || null,
      submittedAt: c.createdAt.toISOString(),
    }));

    return successResponse({
      assigned: {
        cases: formattedAssigned,
        total: totalAssigned,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(totalAssigned / filters.limit),
      },
      pool: {
        cases: formattedPool,
        total: poolCases.length,
        note: "Cases from your city are shown first. Claim a case to assign it to yourself.",
      },
      pd: {
        code: pd.pdCode,
        city: pd.city,
      },
    });

  } catch (error) {
    console.error("Error listing PD cases:", error);
    return serverErrorResponse("Failed to retrieve cases.");
  }
}
