/**
 * MrClinc API Response Helpers
 * 
 * Standardized response formats for all API routes
 * Terminology: NO quotes/offers/packages/deals
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

// =============================================================================
// RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// =============================================================================
// SUCCESS RESPONSES
// =============================================================================

/**
 * Standard success response
 */
export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

/**
 * Created response (201)
 */
export function createdResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return successResponse(data, 201);
}

/**
 * No content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

// =============================================================================
// ERROR RESPONSES
// =============================================================================

/**
 * Standard error response
 */
export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details },
    },
    { status }
  );
}

/**
 * Validation error from Zod
 */
export function validationErrorResponse(error: ZodError): NextResponse<ApiResponse> {
  const details: Record<string, string[]> = {};
  
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!details[path]) {
      details[path] = [];
    }
    details[path].push(issue.message);
  }

  return errorResponse(
    "VALIDATION_ERROR",
    "Please check your input and try again.",
    400,
    details
  );
}

/**
 * Not found error (404)
 */
export function notFoundResponse(resource = "Resource"): NextResponse<ApiResponse> {
  return errorResponse(
    "NOT_FOUND",
    `${resource} not found.`,
    404
  );
}

/**
 * Unauthorized error (401)
 */
export function unauthorizedResponse(message = "Authentication required."): NextResponse<ApiResponse> {
  return errorResponse(
    "UNAUTHORIZED",
    message,
    401
  );
}

/**
 * Forbidden error (403)
 */
export function forbiddenResponse(message = "Access denied."): NextResponse<ApiResponse> {
  return errorResponse(
    "FORBIDDEN",
    message,
    403
  );
}

/**
 * Conflict error (409)
 */
export function conflictResponse(message: string): NextResponse<ApiResponse> {
  return errorResponse(
    "CONFLICT",
    message,
    409
  );
}

/**
 * Internal server error (500)
 */
export function serverErrorResponse(message = "An unexpected error occurred."): NextResponse<ApiResponse> {
  return errorResponse(
    "SERVER_ERROR",
    message,
    500
  );
}

// =============================================================================
// REQUEST CONFIRMATION MESSAGES
// Patient-facing messages - NO quotes/offers/packages/deals
// =============================================================================

export const REQUEST_MESSAGES = {
  /**
   * Shown after successful request submission
   */
  submitted: {
    title: "Request Submitted",
    message: "Your request has been received. The healthcare provider will contact you directly to discuss next steps.",
  },

  /**
   * FSO-specific confirmation
   */
  fsoSubmitted: {
    title: "Request Submitted",
    message: "Your request for a second opinion has been received. A healthcare provider will contact you directly regarding next steps.",
  },

  /**
   * Aesthetic-specific confirmation
   */
  aestheticSubmitted: {
    title: "Request Submitted",
    message: "Your request has been received. A healthcare provider will contact you with information about your selected procedure.",
  },

  /**
   * Status tracking - information ready
   */
  informationReady: "Information is ready. Please check your email for details from the healthcare provider.",

  /**
   * Status tracking - next steps
   */
  nextStepsShared: "Next steps have been shared. Any further coordination will be between you and the healthcare provider.",

  /**
   * Invalid tracking code
   */
  invalidCode: "The tracking code you entered could not be found. Please check and try again.",

  /**
   * General coordination note
   */
  coordinationNote: "MrClinc coordinates the pathway only. All consultations, documents, and decisions are handled directly between you and the healthcare provider.",
} as const;

// =============================================================================
// PD PORTAL MESSAGES
// =============================================================================

export const PD_MESSAGES = {
  loginSuccess: "Successfully authenticated.",
  loginFailed: "Invalid credentials. Please check your email and access code.",
  sessionExpired: "Your session has expired. Please log in again.",
  caseClaimSuccess: "Case successfully assigned to you.",
  caseAlreadyClaimed: "This case has already been assigned to another Pathway Developer.",
  caseNotInPool: "This case is not available for claiming.",
  statusUpdated: "Case status updated successfully.",
  escalationCreated: "Escalation has been submitted for review.",
} as const;
