import type React from "react";
import { cn } from "@/lib/utils";

interface NavIconProps {
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

export function NavIcon({ icon: Icon, isActive }: NavIconProps) {
  return (
    <Icon
      className={cn(
        "h-4 w-4 transition-colors",
        isActive ? "text-zinc-800 dark:text-slate-100" : "text-muted-foreground"
      )}
    />
  );
}
