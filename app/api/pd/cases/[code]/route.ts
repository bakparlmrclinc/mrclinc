/**
 * GET/PATCH /api/pd/cases/[code]
 * 
 * Single case operations for authenticated PD - Prisma version
 * - GET: View case details (only if assigned)
 * - PATCH: Update case status/add note (only if assigned)
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  forbiddenResponse,
  validationErrorResponse,
  serverErrorResponse,
  PD_MESSAGES,
} from "@/lib/api/responses";
import { pdCaseUpdateSchema, trackingCodeSchema } from "@/lib/validators";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import { CaseStatus } from "@prisma/client";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get patient initials
 */
function getPatientInitials(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length > 1) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return fullName;
}

// =============================================================================
// GET - Case details
// =============================================================================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    // Check authentication
    const pd = await getPDSessionFromCookies();
    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.sessionExpired);
    }

    const { code } = await params;
    const codeUpper = code.toUpperCase();

    // Validate code format
    const parseResult = trackingCodeSchema.safeParse(codeUpper);
    if (!parseResult.success) {
      return notFoundResponse("Case");
    }

    // Get case
    const caseData = await prisma.case.findUnique({
      where: { trackingCode: codeUpper },
      select: {
        id: true,
        trackingCode: true,
        assignedPdId: true,
        patientName: true,
        patientCity: true,
        patientAge: true,
        mainCategory: true,
        medicalSubType: true,
        aestheticSubCategory: true,
        aestheticProcedure: true,
        cancerSystem: true,
        generalCondition: true,
        description: true,
        status: true,
        assignmentMode: true,
        assignedAt: true,
        createdAt: true,
        updatedAt: true,
        statusHistory: {
          select: {
            status: true,
            note: true,
            changedAt: true,
            source: true,
          },
          orderBy: { changedAt: "asc" },
        },
      },
    });

    if (!caseData) {
      return notFoundResponse("Case");
    }

    // Check if PD is assigned
    if (caseData.assignedPdId !== pd.id) {
      return forbiddenResponse("You are not assigned to this case.");
    }

    // Format timeline (PD can see notes)
    const timeline = caseData.statusHistory.map((entry) => ({
      status: entry.status,
      note: entry.note,
      date: entry.changedAt.toISOString(),
      source: entry.source,
    }));

    return successResponse({
      trackingCode: caseData.trackingCode,
      patient: {
        initials: getPatientInitials(caseData.patientName),
        city: caseData.patientCity || "Unknown",
        age: caseData.patientAge || 0,
      },
      category: caseData.mainCategory,
      subcategory: caseData.medicalSubType || caseData.aestheticSubCategory,
      procedure: caseData.aestheticProcedure,
      condition: caseData.cancerSystem || caseData.generalCondition,
      description: caseData.description,
      status: caseData.status,
      isFso: caseData.mainCategory === "Medical Surgery",
      assignment: {
        type: caseData.assignmentMode || "POOL",
        assignedAt: caseData.assignedAt?.toISOString() || null,
      },
      timeline,
      createdAt: caseData.createdAt.toISOString(),
      updatedAt: caseData.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error("Error getting case:", error);
    return serverErrorResponse("Failed to retrieve case details.");
  }
}

// =============================================================================
// PATCH - Update case status
// =============================================================================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    // Check authentication
    const pd = await getPDSessionFromCookies();
    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.sessionExpired);
    }

    const { code } = await params;
    const codeUpper = code.toUpperCase();

    // Validate code format
    const codeParseResult = trackingCodeSchema.safeParse(codeUpper);
    if (!codeParseResult.success) {
      return notFoundResponse("Case");
    }

    // Get case
    const caseData = await prisma.case.findUnique({
      where: { trackingCode: codeUpper },
      select: { id: true, assignedPdId: true, status: true },
    });

    if (!caseData) {
      return notFoundResponse("Case");
    }

    // Check if PD is assigned
    if (caseData.assignedPdId !== pd.id) {
      return forbiddenResponse("You are not assigned to this case.");
    }

    // Parse update body
    const body = await req.json();
    const parseResult = pdCaseUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const update = parseResult.data;

    // Update in transaction
    const updatedCase = await prisma.$transaction(async (tx) => {
      // Update case status if provided
      const updateData: Record<string, unknown> = {
        updatedAt: new Date(),
      };

      if (update.status) {
        updateData.status = update.status as CaseStatus;
      }

      const updated = await tx.case.update({
        where: { id: caseData.id },
        data: updateData,
      });

      // Add status history entry
      await tx.caseStatusHistory.create({
        data: {
          caseId: caseData.id,
          status: (update.status as CaseStatus) || caseData.status,
          source: "PD",
          note: update.note || null,
        },
      });

      return updated;
    });

    return successResponse({
      message: PD_MESSAGES.statusUpdated,
      trackingCode: updatedCase.trackingCode,
      status: updatedCase.status,
      updatedAt: updatedCase.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error("Error updating case:", error);
    return serverErrorResponse("Failed to update case.");
  }
}
