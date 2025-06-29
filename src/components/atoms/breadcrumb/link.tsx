import type React from "react";
import Link from "next/link";

interface BreadcrumbLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbLink({
  href,
  children,
  className = "",
}: BreadcrumbLinkProps) {
  return (
    <Link
      href={href}
      className={`text-sm text-primary hover:text-primary/80 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
