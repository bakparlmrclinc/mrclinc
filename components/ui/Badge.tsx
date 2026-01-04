import { ReactNode } from "react";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error" | "accent" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({ children, variant = "primary", size = "md", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full";

  const variants: Record<BadgeVariant, string> = {
    primary: "bg-primary-100 text-primary-700",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    error: "bg-error-100 text-error-700",
    accent: "bg-accent-100 text-accent-700",
    info: "bg-blue-100 text-blue-700",
  };

  const sizes: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
