"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortButtonProps {
  label: string;
  sortKey: string;
  currentSortBy: string;
  currentSortOrder: "asc" | "desc";
  onSort: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export const SortButton = ({
  label,
  sortKey,
  currentSortBy,
  currentSortOrder,
  onSort,
}: SortButtonProps) => {
  const isActive = currentSortBy === sortKey;

  const handleClick = () => {
    if (isActive) {
      const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
      onSort(sortKey, newOrder);
    } else {
      onSort(sortKey, "asc");
    }
  };

  const getIcon = () => {
    if (!isActive) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return currentSortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="h-auto p-0 font-medium"
    >
      {label}
      {getIcon()}
    </Button>
  );
};
