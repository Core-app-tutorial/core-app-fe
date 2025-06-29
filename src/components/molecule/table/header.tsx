"use client";

import { FilterSelect } from "@/components/atoms/table/filter-select";
import { SearchInput } from "@/components/atoms/table/search-input";
import { Button } from "@/components/ui/button";
import { TableColumn } from "@/constants/types/table";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  search: string;
  filters: Record<string, string>;
  onSearchChange: (search: string) => void;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  data: T[];
}

export const TableHeader = <T,>({
  columns,
  search,
  filters,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  data,
}: TableHeaderProps<T>) => {
  const filterableColumns = columns.filter((col) => col.filterable);

  const getFilterOptions = (column: TableColumn<T>) => {
    const values = data.map((item) => String(item[column.key]));
    const uniqueValues = [...new Set(values)].filter(Boolean);
    return uniqueValues.map((value) => ({ value, label: value }));
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search all columns..."
        />

        <div className="flex flex-wrap gap-2">
          {filterableColumns.map((column) => (
            <FilterSelect
              key={String(column.key)}
              value={filters[String(column.key)] || ""}
              onChange={(value) => onFilterChange(String(column.key), value)}
              options={getFilterOptions(column)}
              placeholder={`Filter by ${column.label}`}
            />
          ))}

          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
