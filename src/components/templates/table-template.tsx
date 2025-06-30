"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlSync } from "@/hooks/use-url-sync";
import { FilterConfig, TableColumn, TableData } from "@/constants/types/table";
import { useTableStore } from "@/shared/stores/table-store";
import { SearchInput } from "../atoms/table/input-search";
import { ColumnVisibility } from "../molecule/table/column-visibility";
import { FilterPanel } from "../organisms/table/filter-panel";
import { DataTable } from "../organisms/table/dynamic-table";
import { ModernPagination } from "../molecule/table/pagination-contoller";

interface TableTemplateProps<T extends Record<string, unknown>> {
  title: string;
  columns: TableColumn<T>[];
  data: TableData<T>;
  filterConfigs?: FilterConfig[];
  onCreateNew?: () => void;
  createButtonLabel?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

export function TableTemplate<T extends Record<string, unknown>>({
  title,
  columns,
  data,
  filterConfigs = [],
  onCreateNew,
  createButtonLabel = "Tạo mới",
}: TableTemplateProps<T>) {
  const {
    params,
    columnVisibility,
    setSearch,
    setFilter,
    removeFilter,
    clearFilters,
    setSort,
    setPagination,
    setColumnVisibility,
    resetColumnVisibility,
  } = useTableStore();

  // Initialize URL sync
  useUrlSync();

  // Reset params when component mounts (page change)
  useEffect(() => {
    // This ensures clean state when navigating to this page
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Quản lý và theo dõi dữ liệu của bạn
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        variants={itemVariants}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4 flex-1">
          {/* Search Input */}
          <div className="w-full lg:w-80">
            <SearchInput value={params.search} onChange={setSearch} />
          </div>

          {/* Filter and Column Controls */}
          <div className="flex items-center gap-2">
            {filterConfigs.length > 0 && (
              <FilterPanel
                filterConfigs={filterConfigs}
                activeFilters={params.filters}
                onFilterChange={setFilter}
                onFilterRemove={removeFilter}
                onFiltersClear={clearFilters}
              />
            )}

            <ColumnVisibility
              columns={columns}
              columnVisibility={columnVisibility}
              onColumnVisibilityChange={setColumnVisibility}
              onResetVisibility={resetColumnVisibility}
            />
          </div>
        </div>

        {/* Create Button */}
        {onCreateNew && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button onClick={onCreateNew} className="w-full lg:w-auto">
              <motion.div
                className="mr-2"
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-4 w-4" />
              </motion.div>
              {createButtonLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Data Table */}
      <motion.div variants={itemVariants}>
        <DataTable
          columns={columns}
          data={data.items}
          loading={data.loading}
          currentSort={params.sort}
          onSort={setSort}
          columnVisibility={columnVisibility}
        />
      </motion.div>

      {/* Pagination */}
      {data.total > 0 && (
        <motion.div variants={itemVariants}>
          <ModernPagination
            pagination={{ ...params.pagination, total: data.total }}
            onPaginationChange={setPagination}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
