"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableColumn, TableState } from "@/constants/types/table";
import { TableHeader as TableHeaderComponent } from "@/components/molecule/table/header";
import { SortButton } from "@/components/atoms/table/sort-button";

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  state: TableState;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  state,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onClearFilters,
  onPageChange,
  loading = false,
}: DataTableProps<T>) => {
  // Filter data based on search and filters
  const filteredData = data.filter((item) => {
    // Search filter
    if (state.search) {
      const searchLower = state.search.toLowerCase();
      const matchesSearch = columns.some((column) => {
        const value = String(item[column.key]).toLowerCase();
        return value.includes(searchLower);
      });
      if (!matchesSearch) return false;
    }

    // Column filters
    for (const [key, value] of Object.entries(state.filters)) {
      if (value && value !== "all" && String(item[key]) !== value) {
        return false;
      }
    }

    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!state.sortBy) return 0;

    const aValue = a[state.sortBy];
    const bValue = b[state.sortBy];

    if (aValue < bValue) return state.sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return state.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate data
  const startIndex = (state.page - 1) * state.pageSize;
  const paginatedData = sortedData.slice(
    startIndex,
    startIndex + state.pageSize
  );
  const totalPages = Math.ceil(sortedData.length / state.pageSize);

  return (
    <div className="space-y-4">
      <TableHeaderComponent
        columns={columns}
        search={state.search}
        filters={state.filters}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
        data={data}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>
                  {column.sortable ? (
                    <SortButton
                      label={column.label}
                      sortKey={String(column.key)}
                      currentSortBy={state.sortBy}
                      currentSortOrder={state.sortOrder}
                      onSort={onSortChange}
                    />
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + state.pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(state.page - 1)}
              disabled={state.page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {state.page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(state.page + 1)}
              disabled={state.page >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
