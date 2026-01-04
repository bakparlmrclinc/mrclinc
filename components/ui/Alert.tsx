import { HTMLAttributes, forwardRef, ReactNode } from "react";

// ============================================
// ALERT TYPES
// ============================================

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// ============================================
// VARIANT STYLES
// ============================================

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
  },
  success: {
    container: "bg-success-50 border-success-200 text-success-800",
    icon: "text-success-500",
  },
  warning: {
    container: "bg-warning-50 border-warning-200 text-warning-800",
    icon: "text-warning-500",
  },
  error: {
    container: "bg-error-50 border-error-200 text-error-800",
    icon: "text-error-500",
  },
};

// ============================================
// DEFAULT ICONS
// ============================================

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

// ============================================
// ALERT COMPONENT
// ============================================

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      icon,
      dismissible = false,
      onDismiss,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const displayIcon = icon ?? defaultIcons[variant];

    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${styles.container} ${className}`}
        role="alert"
        {...props}
      >
        <div className="flex">
          {displayIcon && (
            <div className={`flex-shrink-0 ${styles.icon}`}>{displayIcon}</div>
          )}
          <div className={displayIcon ? "ml-3" : ""}>
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            {children && (
              <div className={`text-sm ${title ? "mt-1" : ""}`}>{children}</div>
            )}
          </div>
          {dismissible && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.icon}`}
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, type AlertProps, type AlertVariant };
