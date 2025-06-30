/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
export interface TableColumn<T = Record<string, any>> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig {
  key?: string;
  label?: string;
  type?: "select" | "multiselect" | "date" | "daterange" | "text" | "number";
  options?: FilterOption[];
  placeholder?: string;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface TableParams {
  search: string;
  filters: Record<string, string | string[] | number | Date | [Date, Date]>;
  sort: SortConfig | null;
  pagination: PaginationConfig;
}

export interface TableData<T = Record<string, any>> {
  items: T[];
  total: number;
  loading: boolean;
}
