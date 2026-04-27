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
        className="text-sm font-medium text-text-primary"
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
        className={`w-full rounded border px-[14px] py-[10px] text-[14px] font-sans text-text-primary bg-white transition-all duration-150
          focus:outline-none focus:ring-0 focus:border-blue shadow-[0_0_0_0_transparent] focus:shadow-[0_0_0_3px_rgba(41,82,204,0.08)]
          appearance-none cursor-pointer
          ${
            error
              ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)] focus:border-red-400"
              : "border-border hover:border-border-light"
          } ${className}`}
        {...props}
      >
        <option value="" disabled className="text-text-tertiary bg-white">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-text-primary"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
