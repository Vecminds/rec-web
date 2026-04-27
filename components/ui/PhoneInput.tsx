"use client";

import React from "react";

interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  id: string;
  label: string;
  /** The dial code prefix (e.g. "+977") — shown as a read-only badge */
  dialCode: string;
  /** The flag emoji for the selected country */
  flag: string;
  /** The local phone number (without dial code) */
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export function PhoneInput({
  id,
  label,
  dialCode,
  flag,
  value,
  onChange,
  error,
  helpText,
  required,
  className = "",
  ...props
}: PhoneInputProps) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="flex">
        {/* Dial code badge */}
        <span
          className={`flex items-center gap-[6px] rounded-l border border-r-0 px-[12px] py-[10px] text-[13px] font-sans select-none flex-shrink-0 bg-[#eef2ff]
            ${error ? "border-red-400 text-red-500" : "border-border text-text-secondary"}`}
          aria-hidden="true"
        >
          <span className="text-base leading-none">{flag || "🌐"}</span>
          <span>{dialCode || "—"}</span>
        </span>

        {/* Number input */}
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={(e) => {
            // Allow only digits, spaces, and dashes
            const cleaned = e.target.value.replace(/[^\d\s\-]/g, "");
            onChange(cleaned);
          }}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : null, helpText ? helpId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          required={required}
          className={`w-full rounded-r border px-[14px] py-[10px] text-[14px] font-sans text-text-primary placeholder:text-text-tertiary bg-white transition-all duration-150
            focus:outline-none focus:ring-0 focus:border-blue shadow-[0_0_0_0_transparent] focus:shadow-[0_0_0_3px_rgba(41,82,204,0.08)]
            ${
              error
                ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)] focus:border-red-400"
                : "border-border hover:border-border-light"
            } ${className}`}
          {...props}
        />
      </div>
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
