"use client";

import { TableColumn } from "@/constants/types/table";
import { useUrlSync } from "@/hooks/use-url-sync";
import { useTableStore } from "@/shared/stores/table-store";
import { useEffect } from "react";
import { DataTable } from "../organisms/table/dynamic-data-table";

interface TableTemplateProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  loading?: boolean;
}

export const TableTemplate = <T extends Record<string, any>>({
  data,
  columns,
  title,
  loading = false,
}: TableTemplateProps<T>) => {
  const tableStore = useTableStore();

  // Sync with URL parameters
  useUrlSync();

  // Optional: Reset store when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup on unmount (optional)
      // tableStore.reset()
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      )}

      <DataTable
        data={data}
        columns={columns}
        state={tableStore}
        onSearchChange={tableStore.setSearch}
        onSortChange={tableStore.setSorting}
        onFilterChange={tableStore.setFilter}
        onClearFilters={tableStore.clearFilters}
        onPageChange={tableStore.setPage}
        loading={loading}
      />
    </div>
  );
};
