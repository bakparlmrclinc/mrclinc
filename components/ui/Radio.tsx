import { InputHTMLAttributes, forwardRef } from "react";

// ============================================
// RADIO TYPES
// ============================================

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  orientation?: "vertical" | "horizontal";
  required?: boolean;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

// ============================================
// RADIO COMPONENT
// ============================================

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = "", id, ...props }, ref) => {
    const radioId = id || `radio-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={`relative flex items-start ${className}`}>
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className="h-4 w-4 border-gray-300 text-accent-500 focus:ring-accent-500 cursor-pointer"
            {...props}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={radioId}
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = "Radio";

// ============================================
// RADIO GROUP COMPONENT
// ============================================

function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  orientation = "vertical",
  required,
}: RadioGroupProps) {
  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
  };

  const orientationClass =
    orientation === "horizontal"
      ? "flex flex-wrap gap-6"
      : "flex flex-col space-y-3";

  return (
    <fieldset>
      {label && (
        <legend className="text-sm font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </legend>
      )}
      <div className={orientationClass}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            disabled={option.disabled}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
    </fieldset>
  );
}

export { Radio, RadioGroup, type RadioProps, type RadioGroupProps, type RadioOption };
