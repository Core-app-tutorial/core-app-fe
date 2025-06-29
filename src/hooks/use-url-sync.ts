"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTableStore } from "@/shared/stores/table-store";

export const useUrlSync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tableStore = useTableStore();

  const isInitialized = useRef(false);
  const skipNextUrlUpdate = useRef(false);
  const lastPathname = useRef<string>("");

  // Handle pathname changes - reset everything
  useEffect(() => {
    // If this is not the first render and pathname changed
    if (lastPathname.current && lastPathname.current !== pathname) {
      // Reset store
      tableStore.reset();

      // Clear URL if it has params
      const currentUrl = window.location.href;
      const baseUrl = window.location.origin + pathname;

      if (currentUrl !== baseUrl) {
        window.history.replaceState({}, "", pathname);
      }

      // Reset flags
      isInitialized.current = false;
      skipNextUrlUpdate.current = false;
    }

    lastPathname.current = pathname;
  }, [pathname, tableStore]);

  // Initialize from URL params
  useEffect(() => {
    if (!isInitialized.current) {
      const search = searchParams.get("search") || "";
      const sortBy = searchParams.get("sortBy") || "";
      const sortOrder =
        (searchParams.get("sortOrder") as "asc" | "desc") || "asc";
      const page = Number.parseInt(searchParams.get("page") || "1");
      const pageSize = Number.parseInt(searchParams.get("pageSize") || "10");

      const filters: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        if (key.startsWith("filter_")) {
          const filterKey = key.replace("filter_", "");
          filters[filterKey] = value;
        }
      });

      // Only update store if URL has actual params
      if (searchParams.toString()) {
        skipNextUrlUpdate.current = true;
        useTableStore.setState({
          search,
          sortBy,
          sortOrder,
          filters,
          page,
          pageSize,
        });
      }

      isInitialized.current = true;
    }
  }, [searchParams]);

  // Sync store changes to URL
  useEffect(() => {
    if (!isInitialized.current) return;

    if (skipNextUrlUpdate.current) {
      skipNextUrlUpdate.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (tableStore.search) {
      params.set("search", tableStore.search);
    }

    if (tableStore.sortBy) {
      params.set("sortBy", tableStore.sortBy);
      params.set("sortOrder", tableStore.sortOrder);
    }

    Object.entries(tableStore.filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(`filter_${key}`, value);
      }
    });

    if (tableStore.page > 1) {
      params.set("page", tableStore.page.toString());
    }

    if (tableStore.pageSize !== 10) {
      params.set("pageSize", tableStore.pageSize.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [
    tableStore.search,
    tableStore.sortBy,
    tableStore.sortOrder,
    tableStore.filters,
    tableStore.page,
    tableStore.pageSize,
    pathname,
    router,
  ]);
};
