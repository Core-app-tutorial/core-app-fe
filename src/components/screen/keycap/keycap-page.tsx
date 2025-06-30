"use client";

import { useEffect, useState } from "react";
import { TableTemplate } from "@/components/templates/table-template";
import { TableData } from "@/constants/types/table";
import { useTableStore } from "@/shared/stores/table-store";
import { Product, productColumns } from "./column";
import { mockKeycaps } from "@/shared/seed/keycap";
import { filterConfigs } from "./filter";

export default function KeycapPage() {
  const { params } = useTableStore();
  const [data, setData] = useState<TableData<Product>>({
    items: [],
    total: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));

      await new Promise((r) => setTimeout(r, 400));

      let filtered = [...mockKeycaps];

      if (params.search) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(params.search.toLowerCase())
        );
      }

      Object.entries(params.filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          filtered = filtered.filter((p) =>
            value.map(String).includes(String(p[key as keyof Product]))
          );
        }
      });

      if (params.sort) {
        filtered.sort((a, b) => {
          const aVal = a[params.sort!.key as keyof Product];
          const bVal = b[params.sort!.key as keyof Product];
          if (aVal < bVal) return params.sort!.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return params.sort!.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      const { page, pageSize } = params.pagination;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginated = filtered.slice(start, end);

      setData({
        items: paginated,
        total: filtered.length,
        loading: false,
      });
    };

    fetchData();
  }, [params]);

  const handleCreate = () => {
    console.log("Create new keycap set");
  };

  return (
    <div className="container mx-auto py-6">
      <TableTemplate
        title="Manage Keycap Sets"
        columns={productColumns}
        data={data}
        filterConfigs={filterConfigs}
        onCreateNew={handleCreate}
        createButtonLabel="Thêm keycap"
      />
    </div>
  );
}
