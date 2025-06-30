"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Columns, Eye, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TableColumn } from "@/constants/types/table";

interface ColumnVisibilityProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void;
  onResetVisibility: (columns: string[]) => void;
}

const popoverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const badgeVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export function ColumnVisibility<T extends Record<string, unknown>>({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  onResetVisibility,
}: ColumnVisibilityProps<T>) {
  // Initialize column visibility if not set
  useEffect(() => {
    const hasUnsetColumns = columns.some(
      (col) => !(String(col.key) in columnVisibility)
    );
    if (hasUnsetColumns) {
      onResetVisibility(columns.map((col) => String(col.key)));
    }
  }, [columns, columnVisibility, onResetVisibility]);

  const visibleCount = columns.filter(
    (col) => columnVisibility[String(col.key)] !== false
  ).length;
  const hiddenCount = columns.length - visibleCount;

  const handleToggleAll = (visible: boolean) => {
    columns.forEach((col) => {
      onColumnVisibilityChange(String(col.key), visible);
    });
  };

  const handleReset = () => {
    onResetVisibility(columns.map((col) => String(col.key)));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent h-10"
          >
            <motion.div
              animate={{ rotate: hiddenCount > 0 ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Columns className="h-4 w-4" />
            </motion.div>
            <span className="text-sm">Column</span>
            <AnimatePresence>
              {hiddenCount > 0 && (
                <motion.span
                  className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {hiddenCount} Hide
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </PopoverTrigger>

      <PopoverContent className="w-64 border-border bg-popover p-0" align="end">
        <motion.div
          variants={popoverVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <motion.h4
              className="font-medium text-sm text-popover-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Show Columns
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground h-8"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                </motion.div>
                Reset
              </Button>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div className="flex gap-2" variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggleAll(true)}
              className="flex-1 h-8 text-xs"
              disabled={visibleCount === columns.length}
            >
              <Eye className="h-3 w-3 mr-1" />
              Show All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggleAll(false)}
              className="flex-1 h-8 text-xs"
              disabled={visibleCount === 0}
            >
              <EyeOff className="h-3 w-3 mr-1" />
              Hide All
            </Button>
          </motion.div>

          <Separator />

          {/* Column List */}
          <motion.div
            className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {columns.map((column) => {
              const isVisible = columnVisibility[String(column.key)] !== false;
              return (
                <motion.div
                  key={String(column.key)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Checkbox
                    id={`column-${String(column.key)}`}
                    checked={isVisible}
                    onCheckedChange={(checked) =>
                      onColumnVisibilityChange(String(column.key), !!checked)
                    }
                  />
                  <Label
                    htmlFor={`column-${String(column.key)}`}
                    className={`text-sm flex-1 cursor-pointer ${
                      isVisible ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {column.label}
                  </Label>
                  <motion.div
                    animate={{ opacity: isVisible ? 1 : 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isVisible ? (
                      <Eye className="h-3 w-3 text-green-500" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-muted-foreground" />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer Info */}
          <motion.div
            className="text-xs text-muted-foreground text-center pt-2 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {visibleCount} / {columns.length} columns visible
          </motion.div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
