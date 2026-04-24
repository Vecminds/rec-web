import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  id: string;
}

export function Input({
  label,
  error,
  helpText,
  id,
  className = "",
  required,
  ...props
}: InputProps) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={
          [error ? errorId : null, helpText ? helpId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        required={required}
        className={`w-full rounded-md border px-4 py-3 text-sm font-sans text-text-primary placeholder:text-text-tertiary bg-surface transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background
          ${
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-border hover:border-border-light"
          }
          ${className}`}
        {...props}
      />
      {helpText && !error && (
        <p id={helpId} className="text-xs text-text-tertiary">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
