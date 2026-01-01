import { HTMLAttributes, forwardRef } from "react";

// ============================================
// SPINNER TYPES
// ============================================

type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: string;
}

// ============================================
// SIZE STYLES
// ============================================

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

// ============================================
// SPINNER COMPONENT
// ============================================

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", color = "text-accent-500", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-block animate-spin ${sizeStyles[size]} ${color} ${className}`}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

// ============================================
// LOADING OVERLAY COMPONENT
// ============================================

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

function LoadingOverlay({ isLoading, message = "Loading..." }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

export { Spinner, LoadingOverlay, type SpinnerProps, type SpinnerSize };
