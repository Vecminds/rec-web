import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  id: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  id,
  placeholder = "Select an option",
  options,
  className = "",
  required,
  ...props
}: SelectProps) {
  const errorId = `${id}-error`;

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
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        required={required}
        className={`w-full rounded-md border px-4 py-3 text-sm font-sans text-text-primary bg-surface transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background
          appearance-none cursor-pointer
          ${
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-border hover:border-border-light"
          }
          ${className}`}
        {...props}
      >
        <option value="" disabled className="text-text-tertiary bg-surface">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-surface text-text-primary"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
