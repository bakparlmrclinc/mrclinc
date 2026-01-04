import { TextareaHTMLAttributes, forwardRef } from "react";

// ============================================
// TEXTAREA TYPES
// ============================================

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

// ============================================
// TEXTAREA COMPONENT
// ============================================

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      showCount = false,
      maxLength,
      className = "",
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const baseTextareaStyles =
      "block rounded-lg border bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y min-h-[100px]";

    const normalStyles =
      "border-gray-300 focus:border-primary-500 focus:ring-primary-500";

    const errorStyles =
      "border-error-500 focus:border-error-500 focus:ring-error-500";

    const widthStyles = fullWidth ? "w-full" : "";

    const combinedTextareaClassName = `${baseTextareaStyles} ${error ? errorStyles : normalStyles} ${widthStyles} ${className}`.trim();

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={combinedTextareaClassName}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          {...props}
        />

        <div className="mt-1.5 flex justify-between">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-error-600">
                {error}
              </p>
            )}

            {hint && !error && (
              <p id={`${textareaId}-hint`} className="text-sm text-gray-500">
                {hint}
              </p>
            )}
          </div>

          {showCount && maxLength && (
            <p
              className={`text-sm ${currentLength >= maxLength ? "text-error-600" : "text-gray-500"}`}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
