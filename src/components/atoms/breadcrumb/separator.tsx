import { ChevronRight } from "lucide-react";

interface BreadcrumbSeparatorProps {
  className?: string;
}

export function BreadcrumbSeparator({
  className = "",
}: BreadcrumbSeparatorProps) {
  return (
    <ChevronRight className={`h-4 w-4 text-muted-foreground ${className}`} />
  );
}
