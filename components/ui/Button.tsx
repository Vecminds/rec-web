import React from "react";

// ─── Variant helper (for use with <Link> or <a> elements) ──────────────────

export function buttonVariants({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: "primary" | "secondary" | "gold" | "white" | "white-outline";
  size?: "sm" | "md" | "lg";
  className?: string;
} = {}): string {
  const base =
    "inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-mid",
    secondary:
      "bg-transparent border-[1.5px] border-gold text-gold hover:bg-gold/5",
    gold:
      "bg-gold text-navy hover:opacity-90",
    white:
      "bg-white text-blue hover:opacity-90",
    "white-outline":
      "bg-transparent border-[1.5px] border-white/40 text-white hover:border-white/80",
  };

  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-6 py-3 text-[14px]",
    lg: "px-9 py-4 text-[15px]",
  };

  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

// ─── Button component ───────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "white" | "white-outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
