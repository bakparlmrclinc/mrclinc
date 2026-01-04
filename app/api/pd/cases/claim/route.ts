/**
 * POST /api/pd/cases/claim
 * 
 * Claim a case from the pool - Prisma version
 * 
 * ATOMIC OPERATION using transaction:
 * 1. Check case is unassigned
 * 2. Assign to PD
 * 3. Update PD counters
 * All in single transaction to prevent race conditions
 * 
 * Pool assignment rules (LOCKED):
 * - First PD to claim gets the case
 * - No city restrictions (city sorting is display-only)
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  conflictResponse,
  validationErrorResponse,
  serverErrorResponse,
  PD_MESSAGES,
} from "@/lib/api/responses";
import { pdClaimCaseSchema } from "@/lib/validators";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";

// =============================================================================
// ROUTE HANDLER
// =============================================================================

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const pd = await getPDSessionFromCookies();
    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.sessionExpired);
    }

    // Parse request body
    const body = await req.json();
    const parseResult = pdClaimCaseSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const { trackingCode } = parseResult.data;

    // ATOMIC CLAIM OPERATION
    // Uses transaction with row-level locking to prevent race conditions
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Get case with lock (SELECT ... FOR UPDATE equivalent)
        const caseData = await tx.case.findUnique({
          where: { trackingCode },
          select: {
            id: true,
            trackingCode: true,
            assignedPdId: true,
            assignmentMode: true,
            status: true,
          },
        });

        // Case not found
        if (!caseData) {
          throw new Error("NOT_FOUND");
        }

        // Already assigned
        if (caseData.assignedPdId !== null) {
          throw new Error("ALREADY_CLAIMED");
        }

        // Not in pool
        if (caseData.assignmentMode !== "POOL") {
          throw new Error("NOT_IN_POOL");
        }

        // Not claimable status
        if (!["received", "under_review"].includes(caseData.status)) {
          throw new Error("NOT_CLAIMABLE");
        }

        const now = new Date();

        // Claim the case - ATOMIC UPDATE
        const updatedCase = await tx.case.update({
          where: { 
            id: caseData.id,
            // Double-check still unassigned (optimistic locking)
            assignedPdId: null,
          },
          data: {
            assignedPdId: pd.id,
            assignedAt: now,
            claimedAt: now,
            status: caseData.status === "received" ? "under_review" : caseData.status,
            updatedAt: now,
          },
        });

        // Add status history if status changed
        if (caseData.status === "received") {
          await tx.caseStatusHistory.create({
            data: {
              caseId: caseData.id,
              status: "under_review",
              source: "PD",
              note: "Case claimed and under review.",
            },
          });
        }

        // Update PD counters
        await tx.pD.update({
          where: { id: pd.id },
          data: {
            casesClaimedCount: { increment: 1 },
            casesActiveCount: { increment: 1 },
          },
        });

        return updatedCase;
      }, {
        // Serializable isolation for true atomicity
        isolationLevel: "Serializable",
      });

      return successResponse({
        message: PD_MESSAGES.caseClaimSuccess,
        trackingCode: result.trackingCode,
        status: result.status,
        assignedAt: result.assignedAt?.toISOString(),
      });

    } catch (txError) {
      const errorMessage = txError instanceof Error ? txError.message : "UNKNOWN";

      if (errorMessage === "NOT_FOUND") {
        return notFoundResponse("Case");
      }
      if (errorMessage === "ALREADY_CLAIMED") {
        return conflictResponse(PD_MESSAGES.caseAlreadyClaimed);
      }
      if (errorMessage === "NOT_IN_POOL") {
        return conflictResponse(PD_MESSAGES.caseNotInPool);
      }
      if (errorMessage === "NOT_CLAIMABLE") {
        return conflictResponse("This case is no longer available for claiming.");
      }

      // Re-throw for outer catch
      throw txError;
    }

  } catch (error) {
    console.error("Error claiming case:", error);
    return serverErrorResponse("Failed to claim case. Please try again.");
  }
}
