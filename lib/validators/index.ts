/**
 * MrClinc Validation Schemas
 * 
 * Zod schemas for API input validation
 * Terminology: NO quotes/offers/packages/deals
 */

import { z } from "zod";

// =============================================================================
// COMMON PATTERNS
// =============================================================================

/**
 * Tracking code format: TRK-XXXXX (5 alphanumeric chars)
 */
export const trackingCodeSchema = z
  .string()
  .regex(/^TRK-[A-Z0-9]{5}$/, "Invalid tracking code format");

/**
 * PD code format: PD-XXXXX (5 alphanumeric chars)
 * Now accepts any string - validation happens server-side
 * Invalid formats are silently treated as empty (goes to pool)
 */
export const pdCodeSchema = z
  .string()
  .max(20)
  .optional()
  .or(z.literal(""));

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255);

/**
 * Phone validation (flexible international format)
 */
export const phoneSchema = z
  .string()
  .min(8, "Phone number too short")
  .max(20, "Phone number too long")
  .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone format");

// =============================================================================
// REQUEST SUBMISSION
// =============================================================================

/**
 * Service category enum (frontend sends "medical", we map it)
 */
export const serviceCategorySchema = z.enum(["aesthetic", "cancer", "general"]);

/**
 * Main category from frontend form (includes "medical" which maps to cancer/general)
 */
export const mainCategorySchema = z.enum(["aesthetic", "medical"]);

/**
 * Patient request submission schema
 * Used by POST /api/requests
 */
export const createRequestSchema = z.object({
  // Service selection - frontend uses "medical" umbrella
  mainCategory: mainCategorySchema,
  medicalSubType: z.enum(["cancer", "general"]).optional(),
  
  // Aesthetic-specific
  aestheticSubCategory: z.string().max(100).optional(),
  aestheticProcedure: z.string().max(255).optional(),
  
  // Cancer-specific
  cancerSystem: z.string().max(100).optional(),
  
  // General surgery-specific
  generalCondition: z.string().max(100).optional(),
  
  // Personal info
  name: z.string().min(2, "Name is required").max(255),
  email: emailSchema,
  phone: phoneSchema,
  preferredContact: z.enum(["whatsapp", "phone", "email"]).default("whatsapp"),
  age: z.coerce.number().int().min(18, "Must be 18 or older").max(120),
  city: z.string().min(2, "City is required").max(100),
  country: z.string().max(100).default("United Kingdom"),
  description: z.string().max(2000).optional(),
  
  // PD code (optional)
  pdCode: pdCodeSchema,
  
  // Consents - all required
  consent1: z.boolean().refine((val) => val === true, { message: "You must acknowledge MrClinc's coordination role" }),
  consent2: z.boolean().refine((val) => val === true, { message: "You must acknowledge direct provider relationship" }),
  consent3: z.boolean().refine((val) => val === true, { message: "You must consent to data processing" }),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;

// =============================================================================
// REQUEST TRACKING
// =============================================================================

/**
 * Track request query schema
 * Used by GET /api/requests/[code]
 */
export const trackRequestSchema = z.object({
  code: trackingCodeSchema,
});

// =============================================================================
// PD AUTHENTICATION
// =============================================================================

/**
 * PD login schema
 * Used by POST /api/pd/auth
 */
export const pdLoginSchema = z.object({
  email: emailSchema,
  // Password field - in production, use proper hashing
  // For now, placeholder for manual onboarding flow
  accessCode: z.string().min(6, "Access code required"),
});

export type PDLoginInput = z.infer<typeof pdLoginSchema>;

/**
 * PD logout schema (just needs valid session)
 */
export const pdLogoutSchema = z.object({
  action: z.literal("logout"),
});

// =============================================================================
// PD CASE OPERATIONS
// =============================================================================

/**
 * PD case list filters
 * Used by GET /api/pd/cases
 */
export const pdCaseListSchema = z.object({
  status: z.string().optional(),
  category: serviceCategorySchema.optional(),
  search: z.string().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type PDCaseListInput = z.infer<typeof pdCaseListSchema>;

/**
 * PD case status update
 * Used by PATCH /api/pd/cases/[code]
 */
export const pdCaseUpdateSchema = z.object({
  status: z.enum([
    "under_review",
    "channel_contacted",
    "awaiting_response",
    "information_ready",
    "next_steps_shared",
    "confirmed",
    "in_coordination",
    "completed",
    "closed",
  ]).optional(),
  note: z.string().max(500).optional(),
});

export type PDCaseUpdateInput = z.infer<typeof pdCaseUpdateSchema>;

/**
 * PD claim case from pool
 * Used by POST /api/pd/cases/claim
 */
export const pdClaimCaseSchema = z.object({
  trackingCode: trackingCodeSchema,
});

export type PDClaimCaseInput = z.infer<typeof pdClaimCaseSchema>;

// =============================================================================
// ESCALATION
// =============================================================================

/**
 * Create escalation schema
 */
export const createEscalationSchema = z.object({
  trackingCode: trackingCodeSchema,
  issueType: z.enum(["no_response", "process_delay", "coordination_issue", "other"]),
  details: z.string().min(10, "Please provide more details").max(2000),
});

export type CreateEscalationInput = z.infer<typeof createEscalationSchema>;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate tracking code
 * Format: TRK-XXXXX (5 uppercase alphanumeric characters)
 */
export function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing chars: I,O,0,1
  let code = "TRK-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validate and normalize PD code
 * Returns null if empty or invalid
 */
export function normalizePDCode(code: string | undefined | null): string | null {
  if (!code || code.trim() === "") return null;
  const normalized = code.toUpperCase().trim();
  if (/^PD-[A-Z0-9]{5}$/.test(normalized)) {
    return normalized;
  }
  return null;
}

/**
 * Extract service type display string from request data
 */
export function extractServiceType(input: CreateRequestInput): string | null {
  if (input.mainCategory === "aesthetic") {
    return input.aestheticProcedure || input.aestheticSubCategory || null;
  }
  if (input.mainCategory === "medical" || input.medicalSubType) {
    if (input.medicalSubType === "cancer") {
      return input.cancerSystem || null;
    }
    if (input.medicalSubType === "general") {
      return input.generalCondition || null;
    }
  }
  return null;
}

/**
 * Determine actual category from form input
 * Frontend sends "medical" which needs to be mapped to "cancer" or "general"
 */
export function resolveCategory(input: CreateRequestInput): "aesthetic" | "cancer" | "general" {
  if (input.mainCategory === "aesthetic") return "aesthetic";
  if (input.mainCategory === "medical") {
    if (input.medicalSubType === "cancer") return "cancer";
    if (input.medicalSubType === "general") return "general";
    // Default to general if medical but no subtype specified
    return "general";
  }
  // Fallback
  return "aesthetic";
}
