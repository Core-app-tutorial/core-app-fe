import { TableStore } from "@/constants/types/table";
import { create } from "zustand";

const initialState = {
  search: "",
  sortBy: "",
  sortOrder: "asc" as const,
  filters: {},
  page: 1,
  pageSize: 10,
};

export const useTableStore = create<TableStore>((set, get) => ({
  ...initialState,

  setSearch: (search: string) => {
    set({
      search,
      // Reset other params when searching
      sortBy: "",
      sortOrder: "asc",
      filters: {},
      page: 1,
    });
  },

  setSorting: (sortBy: string, sortOrder: "asc" | "desc") => {
    set({ sortBy, sortOrder, page: 1 });
  },

  setFilter: (key: string, value: string) => {
    const { filters } = get();
    const newFilters = { ...filters };

    if (value && value !== "all") {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }

    set({
      filters: newFilters,
      page: 1,
    });
  },

  clearFilters: () => {
    set({ filters: {}, page: 1 });
  },

  setPage: (page: number) => {
    set({ page });
  },

  setPageSize: (pageSize: number) => {
    set({ pageSize, page: 1 });
  },

  reset: () => {
    set(initialState);
  },
}));
