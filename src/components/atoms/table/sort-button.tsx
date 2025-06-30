"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortConfig } from "@/constants/types/table";

interface SortButtonProps {
  column: string;
  label: string;
  currentSort: SortConfig | null;
  onSort: (sort: SortConfig | null) => void;
}

export function SortButton({
  column,
  label,
  currentSort,
  onSort,
}: SortButtonProps) {
  const isActive = currentSort?.key === column;
  const direction = isActive ? currentSort.direction : null;

  const handleClick = () => {
    if (!isActive) {
      onSort({ key: column, direction: "asc" });
    } else if (direction === "asc") {
      onSort({ key: column, direction: "desc" });
    } else {
      onSort(null);
    }
  };

  const Icon = !isActive
    ? ArrowUpDown
    : direction === "asc"
    ? ArrowUp
    : ArrowDown;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 px-2 ${isActive ? "bg-accent" : ""}`}
      onClick={handleClick}
    >
      {label}
      <Icon className="ml-2 h-3 w-3" />
    </Button>
  );
}
