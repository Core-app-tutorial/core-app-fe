"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationConfig } from "@/constants/types/table";

interface ModernPaginationProps {
  pagination: PaginationConfig;
  onPaginationChange: (pagination: Partial<PaginationConfig>) => void;
}

export function ModernPagination({
  pagination,
  onPaginationChange,
}: ModernPaginationProps) {
  const { page, pageSize, total } = pagination;
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  // Generate page numbers - keep it simple
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show max 5 page numbers

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-row-reverse items-center justify-between w-full px-4 py-3 bg-card rounded-2xl border border-input">
      {/* Left: Results info */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="whitespace-nowrap">
          {startItem}-{endItem} of {total}
        </span>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Show</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) =>
              onPaginationChange({ pageSize: Number(value), page: 1 })
            }
          >
            <SelectTrigger className="h-8 w-16 text-xs border-gray-300 dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Center: Page navigation */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPaginationChange({ page: page - 1 })}
          disabled={page <= 1}
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center">
          {pageNumbers.map((pageNum, index) => (
            <div key={`${pageNum}-${index}`} className="relative">
              {pageNum === "..." ? (
                <div className="flex items-center justify-center w-8 h-8">
                  <MoreHorizontal className="h-3 w-3 text-gray-400" />
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    onPaginationChange({ page: pageNum as number })
                  }
                  className={`
                    relative w-8 h-8 text-sm font-medium rounded-md transition-all duration-200
                    ${
                      pageNum === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {pageNum}
                  {pageNum === page && (
                    <motion.div
                      layoutId="activePage"
                      className="absolute inset-0 bg-blue-600 rounded-md -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              )}
            </div>
          ))}
        </div>

        {/* Next */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPaginationChange({ page: page + 1 })}
          disabled={page >= totalPages}
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: Page info */}
      <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
