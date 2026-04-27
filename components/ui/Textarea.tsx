import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  id: string;
  showCharCount?: boolean;
  currentLength?: number;
  helpText?: string;
}

export function Textarea({
  label,
  error,
  id,
  showCharCount = false,
  currentLength = 0,
  helpText,
  className = "",
  required,
  maxLength,
  ...props
}: TextareaProps) {
  const errorId = `${id}-error`;
  const countId = `${id}-count`;
  const helpId = `${id}-help`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && (
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {showCharCount && maxLength && (
          <span
            id={countId}
            className={`text-xs ${
              currentLength > maxLength * 0.9
                ? "text-amber-500"
                : "text-text-tertiary"
            }`}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={
          [error ? errorId : null, showCharCount ? countId : null, helpText && !error ? helpId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        required={required}
        className={`w-full rounded border px-[14px] py-[10px] text-[14px] font-sans text-text-primary placeholder:text-text-tertiary bg-white transition-all duration-150 resize-y min-h-[100px]
          focus:outline-none focus:ring-0 focus:border-blue shadow-[0_0_0_0_transparent] focus:shadow-[0_0_0_3px_rgba(41,82,204,0.08)]
          ${
            error
              ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)] focus:border-red-400"
              : "border-border hover:border-border-light"
          } ${className}`}
        {...props}
      />
      {helpText && !error && (
        <p id={helpId} className="text-xs text-text-tertiary">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
