// ============================================
// CLASS NAME UTILITY
// ============================================

/**
 * Merge class names (simple version without external deps)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================
// CODE GENERATORS
// ============================================

/**
 * Generate tracking code in format TRK-XXXXX
 */
export function generateTrackingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "TRK-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate PD code in format PD-XXXXX
 */
export function generatePDCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PD-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ============================================
// DATE FORMATTERS
// ============================================

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// ============================================
// CURRENCY FORMATTER
// ============================================

/**
 * Format currency
 */
export function formatCurrency(
  amount: number,
  currency: "EUR" | "GBP" = "EUR"
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// ============================================
// VALIDATORS
// ============================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UK phone number
 */
export function isValidUKPhone(phone: string): boolean {
  const ukPhoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{9})$/;
  return ukPhoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate PD code format
 */
export function isValidPDCode(code: string): boolean {
  const pdCodeRegex = /^PD-[A-Z0-9]{5}$/;
  return pdCodeRegex.test(code);
}

/**
 * Validate tracking code format
 */
export function isValidTrackingCode(code: string): boolean {
  const trackingCodeRegex = /^TRK-[A-Z0-9]{5}$/;
  return trackingCodeRegex.test(code);
}

// ============================================
// STATUS HELPERS
// ============================================

/**
 * Get status display text
 */
export function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    received: "Received",
    processing: "Processing",
    quotes_sent: "Quotes Sent",
    in_progress: "In Progress",
    completed: "Completed",
    closed: "Closed",
  };
  return statusMap[status] || status;
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    received: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    quotes_sent: "bg-purple-100 text-purple-800",
    in_progress: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };
  return colorMap[status] || "bg-gray-100 text-gray-800";
}

// ============================================
// STRING HELPERS
// ============================================

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Get initials from full name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ============================================
// ASYNC HELPERS
// ============================================

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
