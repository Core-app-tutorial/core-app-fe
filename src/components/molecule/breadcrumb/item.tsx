import {
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbText,
} from "@/components/atoms/breadcrumb";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isLast?: boolean;
}

export function BreadcrumbItem({
  label,
  href,
  isLast = false,
}: BreadcrumbItemProps) {
  return (
    <div className="flex items-center gap-2">
      {href && !isLast ? (
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      ) : (
        <BreadcrumbText className={isLast ? "text-foreground font-medium" : ""}>
          {label}
        </BreadcrumbText>
      )}
      {!isLast && <BreadcrumbSeparator />}
    </div>
  );
}
