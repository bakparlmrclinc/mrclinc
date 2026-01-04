/**
 * GET /api/requests/[code]
 * 
 * Track request status by tracking code - Prisma version
 * 
 * Patient-safe response:
 * - NEVER expose: PD code/info, internal notes, channel identifiers
 * - Returns: tracking code, category, service type, status, timeline
 * 
 * Terminology: NO quotes/offers/packages/deals
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  successResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api/responses";
import { trackingCodeSchema } from "@/lib/validators";

// =============================================================================
// STATUS LABELS - Patient-facing display
// =============================================================================

const STATUS_LABELS: Record<string, { label: string; description: string }> = {
  received: {
    label: "Received",
    description: "Your request has been received and confirmed.",
  },
  under_review: {
    label: "Under Review",
    description: "Your request is being reviewed.",
  },
  channel_contacted: {
    label: "Healthcare Provider Contacted",
    description: "A healthcare provider has been contacted regarding your request.",
  },
  information_ready: {
    label: "Information Ready",
    description: "Information is ready and has been shared via your provided contact details.",
  },
  next_steps_shared: {
    label: "Next Steps Shared",
    description: "Next steps have been shared via your provided contact details.",
  },
  confirmed: {
    label: "Confirmed",
    description: "Your request has been confirmed. Coordination is in progress.",
  },
  completed: {
    label: "Completed",
    description: "This pathway has been successfully completed.",
  },
  closed: {
    label: "Closed",
    description: "This request has been closed.",
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Format date for patient display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get patient-friendly service type display
 */
function getServiceTypeDisplay(caseData: {
  mainCategory: string;
  medicalSubType: string | null;
  aestheticProcedure: string | null;
  aestheticSubCategory: string | null;
  cancerSystem: string | null;
  generalCondition: string | null;
}): string | null {
  if (caseData.aestheticProcedure) {
    return caseData.aestheticProcedure;
  }
  if (caseData.aestheticSubCategory) {
    return caseData.aestheticSubCategory;
  }
  if (caseData.cancerSystem) {
    return caseData.cancerSystem;
  }
  if (caseData.generalCondition) {
    return caseData.generalCondition;
  }
  return null;
}

/**
 * Get category display name
 */
function getCategoryDisplay(caseData: {
  mainCategory: string;
  medicalSubType: string | null;
}): string {
  if (caseData.medicalSubType) {
    return caseData.medicalSubType;
  }
  return caseData.mainCategory;
}

// =============================================================================
// ROUTE HANDLER
// =============================================================================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const codeUpper = code.toUpperCase();

    // Validate tracking code format
    const parseResult = trackingCodeSchema.safeParse(codeUpper);
    if (!parseResult.success) {
      return notFoundResponse("Request");
    }

    // Look up case with status history
    const caseData = await prisma.case.findUnique({
      where: { trackingCode: codeUpper },
      select: {
        trackingCode: true,
        mainCategory: true,
        medicalSubType: true,
        aestheticProcedure: true,
        aestheticSubCategory: true,
        cancerSystem: true,
        generalCondition: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        // Get timeline (status history) - exclude internal notes
        statusHistory: {
          select: {
            status: true,
            changedAt: true,
            // NOTE: We do NOT select 'note' field - it's internal
          },
          orderBy: { changedAt: "asc" },
        },
      },
    });

    if (!caseData) {
      return notFoundResponse("Request");
    }

    // Build patient-safe timeline
    const timeline = caseData.statusHistory.map((entry) => {
      const statusInfo = STATUS_LABELS[entry.status] || {
        label: entry.status,
        description: "",
      };
      return {
        status: statusInfo.label,
        date: formatDate(entry.changedAt),
        description: statusInfo.description,
      };
    });

    // Get status display info
    const currentStatus = STATUS_LABELS[caseData.status] || {
      label: caseData.status,
      description: "",
    };

    // Build patient-safe response
    const response = {
      trackingCode: caseData.trackingCode,
      category: getCategoryDisplay(caseData),
      serviceType: getServiceTypeDisplay(caseData),
      status: currentStatus.label,
      statusDescription: currentStatus.description,
      timeline,
      submittedAt: caseData.createdAt.toISOString(),
      lastUpdatedAt: caseData.updatedAt.toISOString(),
    };

    // NEVER include in response:
    // - PD code/info (pdCodeProvided, assignedPdId)
    // - Internal IDs (id)
    // - Channel/provider info (channelId, providerId)
    // - Internal notes from status history

    return successResponse(response);

  } catch (error) {
    console.error("Error tracking request:", error);
    return serverErrorResponse("Failed to retrieve request status.");
  }
}
