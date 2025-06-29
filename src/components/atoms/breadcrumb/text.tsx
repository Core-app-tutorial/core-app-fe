import type React from "react";
interface BreadcrumbTextProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbText({
  children,
  className = "",
}: BreadcrumbTextProps) {
  return (
    <span className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}
