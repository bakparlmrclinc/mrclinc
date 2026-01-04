/**
 * MrClinc Database Schema Definitions
 * 
 * CRITICAL CONSTRAINTS:
 * - NO pricing/earnings tables (kept in content layer, PD-portal only)
 * - NO medical decision fields
 * - NO clinic ranking/scoring fields
 * - NO outcome/success fields
 * - ONLY operational/coordination data
 * 
 * This file defines TypeScript types that mirror the database schema.
 * Actual database implementation is separate (Prisma/Drizzle/raw SQL).
 */

// =============================================================================
// ENUMS
// =============================================================================

/**
 * Service categories - matches project definition
 */
export type ServiceCategory = "aesthetic" | "cancer" | "general";

/**
 * Request status - operational only, no medical-evaluation language
 * UI can map these to patient-friendly labels separately
 */
export type RequestStatus =
  | "received"           // Initial state
  | "under_review"       // Being processed
  | "channel_contacted"  // Clinical channel has been notified
  | "awaiting_response"  // Waiting for provider response
  | "information_ready"  // Provider has prepared information
  | "next_steps_shared"  // Next steps communicated to patient
  | "confirmed"          // Patient confirmed (aesthetic flow)
  | "in_coordination"    // Active coordination ongoing
  | "completed"          // Successfully completed
  | "closed";            // Closed (any reason)

/**
 * PD case assignment type
 */
export type AssignmentType = "direct" | "pool_claim";

/**
 * Escalation issue types - operational only
 */
export type EscalationIssueType =
  | "no_response"
  | "process_delay"
  | "coordination_issue"
  | "other";

// =============================================================================
// TABLES
// =============================================================================

/**
 * PATIENTS table
 * Stores basic patient contact information only
 */
export interface Patient {
  id: string;                    // UUID
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  country: string;               // Default: 'United Kingdom'
  createdAt: Date;
}

/**
 * REQUESTS table
 * Core request tracking - NO medical details, NO pricing
 */
export interface Request {
  id: string;                    // UUID
  trackingCode: string;          // TRK-XXXXX format, unique
  patientId: string;             // FK to patients
  category: ServiceCategory;
  subcategory: string | null;    // e.g., "face", "breast", "gastrointestinal"
  procedure: string | null;      // e.g., "Rhinoplasty", "Hair Transplant"
  description: string | null;    // Patient's brief description
  pdCode: string | null;         // PD-XXXXX if provided at submission
  status: RequestStatus;
  isFso: boolean;                // Free Second Opinion flag
  createdAt: Date;
  updatedAt: Date;
}

/**
 * REQUEST_TIMELINE table
 * Tracks status changes - notes must be neutral, non-clinical
 */
export interface RequestTimelineEntry {
  id: string;                    // UUID
  requestId: string;             // FK to requests
  status: RequestStatus;
  note: string | null;           // Neutral operational note only
  createdAt: Date;
}

/**
 * PATHWAY_DEVELOPERS table
 * PD registry - manual onboarding only
 */
export interface PathwayDeveloper {
  id: string;                    // UUID
  code: string;                  // PD-XXXXX format, unique
  name: string;
  email: string;
  phone: string | null;
  city: string;                  // Used for pool assignment proximity
  profession: string | null;     // Healthcare background
  isActive: boolean;
  createdAt: Date;
}

/**
 * PD_SESSIONS table
 * Server-side session management for PD auth
 */
export interface PDSession {
  id: string;                    // UUID, used as session token
  pdId: string;                  // FK to pathway_developers
  expiresAt: Date;
  createdAt: Date;
}

/**
 * PD_CASE_ASSIGNMENTS table
 * Links requests to PDs
 */
export interface PDCaseAssignment {
  id: string;                    // UUID
  requestId: string;             // FK to requests
  pdId: string;                  // FK to pathway_developers
  assignmentType: AssignmentType;
  assignedAt: Date;
}

/**
 * ESCALATIONS table
 * Coordination issues tracking - no medical content
 */
export interface Escalation {
  id: string;                    // UUID
  requestId: string;             // FK to requests
  pdId: string;                  // FK to pathway_developers
  issueType: EscalationIssueType;
  details: string;
  createdAt: Date;
  resolvedAt: Date | null;
  resolution: string | null;
}

/**
 * CLINICAL_CHANNELS table
 * Reference only - NO ranking, NO scoring, NO recommendations
 * Channels are neutral routing targets only
 */
export interface ClinicalChannel {
  id: string;                    // UUID
  name: string;
  specializations: ServiceCategory[];
  city: string;
  isActive: boolean;
  createdAt: Date;
}

// =============================================================================
// PATIENT-SAFE RESPONSE TYPES
// These types define what can be returned to patients via public API
// =============================================================================

/**
 * Patient-safe request view
 * NEVER includes: PD info, channel details, internal notes, pricing
 */
export interface PatientRequestView {
  trackingCode: string;
  category: string;              // Display name, not raw enum
  serviceType: string | null;    // Procedure or subcategory display
  status: string;                // Patient-friendly status label
  statusDescription: string;     // What this status means for patient
  timeline: PatientTimelineEntry[];
  submittedAt: string;           // ISO date string
  lastUpdatedAt: string;         // ISO date string
}

export interface PatientTimelineEntry {
  status: string;                // Patient-friendly label
  date: string;                  // Formatted date
  description: string;           // Patient-safe description
}

// =============================================================================
// PD PORTAL RESPONSE TYPES
// These types define what PDs can see in their portal
// =============================================================================

/**
 * PD case view - includes assignment info but NOT earnings
 * Earnings are calculated client-side from content layer
 */
export interface PDCaseView {
  trackingCode: string;
  patientInitials: string;       // "John D." format
  patientCity: string;
  category: ServiceCategory;
  serviceType: string | null;
  status: RequestStatus;
  assignmentType: AssignmentType;
  submittedAt: string;
  updatedAt: string;
}

/**
 * Pool case - available for claiming
 */
export interface PoolCase {
  trackingCode: string;
  patientCity: string;           // For proximity display
  category: ServiceCategory;
  serviceType: string | null;
  submittedAt: string;
}

// =============================================================================
// STATUS LABEL MAPPINGS
// DB status -> Patient-friendly display
// =============================================================================

export const STATUS_LABELS: Record<RequestStatus, { label: string; description: string }> = {
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
  awaiting_response: {
    label: "Awaiting Response",
    description: "Waiting for the healthcare provider to respond.",
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
  in_coordination: {
    label: "In Coordination",
    description: "Active coordination is ongoing between you and the healthcare provider.",
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

/**
 * Category display names
 */
export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  aesthetic: "Aesthetic Surgery",
  cancer: "Cancer Surgery",
  general: "General Surgery",
};
