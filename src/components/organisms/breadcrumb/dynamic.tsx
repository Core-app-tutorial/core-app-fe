"use client";

import { BreadcrumbItem } from "@/components/molecule/breadcrumb/item";
import { createBreadcrumbSegments } from "@/lib/breadcrumb";
import { usePathname } from "next/navigation";

interface DynamicBreadcrumbProps {
  className?: string;
  customLabels?: Record<string, string>;
}

export function DynamicBreadcrumb({
  className = "",
  customLabels = {},
}: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const segments = createBreadcrumbSegments(pathname);

  // Áp dụng custom labels nếu có
  const processedSegments = segments.map((segment) => ({
    ...segment,
    label: customLabels[segment.href] || segment.label,
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 ${className}`}
    >
      {processedSegments.map((segment, index) => (
        <BreadcrumbItem
          key={`${segment.href}-${index}`}
          label={segment.label}
          href={segment.isLast ? undefined : segment.href}
          isLast={segment.isLast}
        />
      ))}
    </nav>
  );
}
