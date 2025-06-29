import type React from "react";
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableState {
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  filters: Record<string, string>;
  page: number;
  pageSize: number;
}

export interface TableActions {
  setSearch: (search: string) => void;
  setSorting: (sortBy: string, sortOrder: "asc" | "desc") => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export type TableStore = TableState & TableActions;
