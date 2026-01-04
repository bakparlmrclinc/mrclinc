/**
 * POST /api/requests
 * 
 * Submit a new patient request - Prisma version
 * 
 * Flow:
 * 1. Validate input
 * 2. Generate tracking code (TRK-XXXXX)
 * 3. Create Case record in DB
 * 4. Create initial status history entry
 * 5. Handle PD code assignment (direct or pool)
 * 6. Return tracking code and confirmation (patient-safe)
 * 
 * Terminology: NO quotes/offers/packages/deals
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  createRequestSchema,
  generateTrackingCode,
  normalizePDCode,
  resolveCategory,
} from "@/lib/validators";
import {
  createdResponse,
  validationErrorResponse,
  serverErrorResponse,
  REQUEST_MESSAGES,
} from "@/lib/api/responses";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generate unique tracking code - check DB for uniqueness
 */
async function generateUniqueTrackingCode(): Promise<string> {
  let code: string;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    code = generateTrackingCode();
    const existing = await prisma.case.findUnique({
      where: { trackingCode: code },
      select: { id: true },
    });
    if (!existing) break;
    attempts++;
  } while (attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    // Fallback: add timestamp
    code = `TRK-${Date.now().toString(36).toUpperCase().slice(-5)}`;
  }

  return code;
}

/**
 * Check if PD code is valid and active
 */
async function validatePDCode(pdCode: string): Promise<{ valid: boolean; pdId?: string; city?: string }> {
  const pd = await prisma.pD.findUnique({
    where: { pdCode },
    select: { id: true, status: true, city: true },
  });

  if (!pd || pd.status !== "ACTIVE") {
    return { valid: false };
  }

  return { valid: true, pdId: pd.id, city: pd.city };
}

/**
 * Determine pool city for unassigned cases
 */
function getPoolCity(patientCity: string | null): string {
  // Use patient city for pool routing
  // If no city, default to "London" (primary market)
  return patientCity || "London";
}

// =============================================================================
// ROUTE HANDLER
// =============================================================================

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const parseResult = createRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const input = parseResult.data;

    // Generate tracking code
    const trackingCode = await generateUniqueTrackingCode();

    // Resolve category
    const category = resolveCategory(input);
    const isFso = category === "cancer" || category === "general";

    // Normalize PD code
    const pdCode = normalizePDCode(input.pdCode);

    // Handle PD assignment
    let assignmentMode: "DIRECT_PD_CODE" | "POOL" | null = null;
    let assignedPdId: string | null = null;
    let assignedAt: Date | null = null;
    let poolCity: string | null = null;

    if (pdCode) {
      const pdValidation = await validatePDCode(pdCode);
      if (pdValidation.valid && pdValidation.pdId) {
        assignmentMode = "DIRECT_PD_CODE";
        assignedPdId = pdValidation.pdId;
        assignedAt = new Date();
      } else {
        // Invalid PD code - silently go to pool
        assignmentMode = "POOL";
        poolCity = getPoolCity(input.city);
      }
    } else {
      // No PD code - go to pool
      assignmentMode = "POOL";
      poolCity = getPoolCity(input.city);
    }

    // Determine mainCategory display value
    const mainCategoryDisplay = input.mainCategory === "aesthetic" 
      ? "Aesthetic Surgery" 
      : "Medical Surgery";

    // Create case in transaction
    const newCase = await prisma.$transaction(async (tx) => {
      // Create case
      const caseRecord = await tx.case.create({
        data: {
          trackingCode,
          patientName: input.name,
          patientEmail: input.email,
          patientPhone: input.phone,
          preferredContact: input.preferredContact,
          patientAge: input.age,
          patientCity: input.city,
          patientCountry: input.country,
          mainCategory: mainCategoryDisplay,
          medicalSubType: input.medicalSubType === "cancer" 
            ? "Cancer Surgery" 
            : input.medicalSubType === "general" 
              ? "General Surgery" 
              : null,
          cancerSystem: input.cancerSystem || null,
          aestheticSubCategory: input.aestheticSubCategory || null,
          aestheticProcedure: input.aestheticProcedure || null,
          generalCondition: input.generalCondition || null,
          description: input.description || null,
          pdCodeProvided: pdCode,
          consent1: input.consent1 === true,
          consent1At: input.consent1 ? new Date() : null,
          consent2: input.consent2 === true,
          consent2At: input.consent2 ? new Date() : null,
          consent3: input.consent3 === true,
          consent3At: input.consent3 ? new Date() : null,
          assignmentMode,
          assignedPdId,
          assignedAt,
          poolCity,
          status: "received",
        },
      });

      // Create initial status history
      await tx.caseStatusHistory.create({
        data: {
          caseId: caseRecord.id,
          status: "received",
          source: "SYSTEM",
          note: "Request received and confirmed.",
        },
      });

      // Update PD case count if directly assigned
      if (assignedPdId) {
        await tx.pD.update({
          where: { id: assignedPdId },
          data: {
            casesClaimedCount: { increment: 1 },
            casesActiveCount: { increment: 1 },
          },
        });
      }

      return caseRecord;
    });

    // Determine confirmation message
    let confirmationMessage: { title: string; message: string } = REQUEST_MESSAGES.submitted;
    if (isFso) {
      confirmationMessage = REQUEST_MESSAGES.fsoSubmitted;
    } else if (category === "aesthetic") {
      confirmationMessage = REQUEST_MESSAGES.aestheticSubmitted;
    }

    // Return patient-safe response
    // NEVER expose: PD info, internal IDs, assignment details
    return createdResponse({
      trackingCode: newCase.trackingCode,
      status: "received",
      message: confirmationMessage.message,
      title: confirmationMessage.title,
      note: REQUEST_MESSAGES.coordinationNote,
    });

  } catch (error) {
    console.error("Error creating request:", error);
    return serverErrorResponse("Failed to submit request. Please try again.");
  }
}
