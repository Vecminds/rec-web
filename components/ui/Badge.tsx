import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "role" | "stat" | "tag";
  className?: string;
}

export function Badge({
  children,
  variant = "role",
  className = "",
}: BadgeProps) {
  const variants = {
    role: "bg-surface border border-border text-text-secondary text-xs font-medium px-3 py-1.5 rounded-full",
    stat: "bg-accent/10 border border-accent/20 text-accent text-xs font-semibold px-3 py-1.5 rounded-full",
    tag: "bg-background-dark border border-border text-text-tertiary text-xs px-2.5 py-1 rounded",
  };

  return (
    <span className={`inline-flex items-center ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
