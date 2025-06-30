"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterConfig } from "@/constants/types/table";
import { FilterItem } from "@/components/molecule/table/filter-item";

interface FilterPanelProps {
  filterConfigs: FilterConfig[];
  activeFilters: Record<
    string,
    string | string[] | number | Date | [Date, Date]
  >;
  onFilterChange: (
    key: string,
    value: string | string[] | number | Date | [Date, Date]
  ) => void;
  onFilterRemove: (key: string) => void;
  onFiltersClear: () => void;
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
      staggerChildren: 0.05,
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

const filterItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
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

export function FilterPanel({
  filterConfigs,
  activeFilters,
  onFilterChange,
  onFilterRemove,
  onFiltersClear,
}: FilterPanelProps) {
  const activeFilterCount = Object.keys(activeFilters).filter((key) => {
    const value = activeFilters[key];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "" && value !== null && value !== undefined;
  }).length;

  const handleFilterChange = (
    key?: string,
    value?: string | string[] | number | Date | [Date, Date]
  ) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      if (key !== undefined) {
        onFilterRemove(key);
      }
    } else {
      if (key !== undefined) {
        onFilterChange(key, value);
      }
    }
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
              animate={{ rotate: activeFilterCount > 0 ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Filter className="h-4 w-4" />
            </motion.div>
            <span>Fitler</span>
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.span
                  className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[800px] max-w-[90vw] border-border bg-popover p-0"
        align="start"
      >
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
              <span>Filter Data</span>
            </motion.h4>
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onFiltersClear}
                    className="text-muted-foreground h-8"
                  >
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                    </motion.div>
                    <span>Reset</span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Items */}
          {filterConfigs.length > 0 && (
            <motion.div
              className="grid gap-4 grid-cols-1 md:grid-cols-2"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filterConfigs.map((config) =>
                config.key !== undefined ? (
                  <motion.div key={config.key} variants={filterItemVariants}>
                    <FilterItem
                      config={config}
                      value={activeFilters[config.key]}
                      onChange={(value) =>
                        handleFilterChange(config.key, value)
                      }
                      onRemove={() => onFilterRemove(config.key)}
                    />
                  </motion.div>
                ) : null
              )}
            </motion.div>
          )}

          {filterConfigs.length === 0 && (
            <motion.p
              className="text-sm text-muted-foreground text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No filters available. Please configure your filters in the
              settings.
            </motion.p>
          )}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
