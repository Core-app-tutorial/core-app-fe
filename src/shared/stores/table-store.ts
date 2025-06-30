import { PaginationConfig, SortConfig, TableParams } from "@/constants/types/table";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TableStore {
  params: TableParams;
  columnVisibility: Record<string, boolean>;
  setSearch: (search: string) => void;
  setFilter: (
    key: string,
    value: string | string[] | number | Date | [Date, Date]
  ) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  setSort: (sort: SortConfig | null) => void;
  setPagination: (pagination: Partial<PaginationConfig>) => void;
  setColumnVisibility: (columnKey: string, visible: boolean) => void;
  resetColumnVisibility: (columns: string[]) => void;
  resetParams: () => void;
  setParams: (params: Partial<TableParams>) => void;
  updateParams: (updater: (params: TableParams) => TableParams) => void;
}

const initialParams: TableParams = {
  search: "",
  filters: {},
  sort: null,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

export const useTableStore = create<TableStore>()(
  devtools(
    (set, get) => ({
      params: initialParams,
      columnVisibility: {},

      setSearch: (search: string) =>
        set(
          (state) => ({
            params: {
              ...state.params,
              search,
              pagination: { ...state.params.pagination, page: 1 },
            },
          }),
          false,
          "setSearch"
        ),

      setFilter: (
        key: string,
        value: string | string[] | number | Date | [Date, Date]
      ) =>
        set(
          (state) => ({
            params: {
              ...state.params,
              filters: { ...state.params.filters, [key]: value },
              pagination: { ...state.params.pagination, page: 1 },
            },
          }),
          false,
          "setFilter"
        ),

      removeFilter: (key: string) =>
        set(
          (state) => {
            const { [key]: removed, ...restFilters } = state.params.filters;
            return {
              params: {
                ...state.params,
                filters: restFilters,
                pagination: { ...state.params.pagination, page: 1 },
              },
            };
          },
          false,
          "removeFilter"
        ),

      clearFilters: () =>
        set(
          (state) => ({
            params: {
              ...state.params,
              filters: {},
              pagination: { ...state.params.pagination, page: 1 },
            },
          }),
          false,
          "clearFilters"
        ),

      setSort: (sort: SortConfig | null) =>
        set(
          (state) => ({
            params: {
              ...state.params,
              sort,
              pagination: { ...state.params.pagination, page: 1 },
            },
          }),
          false,
          "setSort"
        ),

      setPagination: (pagination: Partial<PaginationConfig>) =>
        set(
          (state) => ({
            params: {
              ...state.params,
              pagination: { ...state.params.pagination, ...pagination },
            },
          }),
          false,
          "setPagination"
        ),

      setColumnVisibility: (columnKey: string, visible: boolean) =>
        set(
          (state) => ({
            columnVisibility: {
              ...state.columnVisibility,
              [columnKey]: visible,
            },
          }),
          false,
          "setColumnVisibility"
        ),

      resetColumnVisibility: (columns: string[]) =>
        set(
          () => {
            const visibility: Record<string, boolean> = {};
            columns.forEach((col) => {
              visibility[col] = true;
            });
            return { columnVisibility: visibility };
          },
          false,
          "resetColumnVisibility"
        ),

      resetParams: () => {
        set({ params: { ...initialParams } }, false, "resetParams");
      },

      setParams: (newParams: Partial<TableParams>) =>
        set(
          (state) => ({
            params: { ...state.params, ...newParams },
          }),
          false,
          "setParams"
        ),

      updateParams: (updater: (params: TableParams) => TableParams) =>
        set(
          (state) => ({
            params: updater(state.params),
          }),
          false,
          "updateParams"
        ),
    }),
    { name: "table-store" }
  )
);
