// ============================================
// TRACKING CODE FORMAT
// ============================================

export const TRACKING_CODE_PREFIX = "TRK";
export const TRACKING_CODE_PATTERN = /^TRK-[A-Z0-9]{5}$/;

export const PD_CODE_PREFIX = "PD";
export const PD_CODE_PATTERN = /^PD-[A-Z0-9]{5}$/;

// ============================================
// STATUS COLORS (Tailwind classes)
// ============================================

export const STATUS_COLORS = {
  received: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  quotes_sent: "bg-purple-100 text-purple-800",
  in_progress: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
} as const;

// ============================================
// TIMING CONSTANTS
// ============================================

export const CLINIC_RESPONSE_TIME_HOURS = 72;
export const FSO_REVIEW_DAYS = 7;
export const PAYMENT_PROCESSING_DAYS = 3;

// ============================================
// VALIDATION
// ============================================

export const VALIDATION = {
  minAge: 18,
  maxAge: 100,
  phoneMinLength: 10,
  phoneMaxLength: 15,
  nameMinLength: 2,
  nameMaxLength: 100,
} as const;
