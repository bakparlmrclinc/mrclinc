import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("relative", className)}>
        <label
          htmlFor={checkboxId}
          className="flex items-start gap-3 cursor-pointer"
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              "mt-1 h-4 w-4 rounded border-gray-300 text-primary-600",
              "focus:ring-primary-500 focus:ring-2 focus:ring-offset-0",
              error && "border-error-500"
            )}
            {...props}
          />
          <span className={cn(
            "text-sm text-gray-600 leading-relaxed",
            error && "text-error-600"
          )}>
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-error-600 ml-7">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
