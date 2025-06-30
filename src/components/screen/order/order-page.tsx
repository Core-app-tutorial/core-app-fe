"use client";

import { useEffect, useState } from "react";
import { TableTemplate } from "@/components/templates/table-template";
import { TableData } from "@/constants/types/table";
import { useTableStore } from "@/shared/stores/table-store";
import { Order, orderColumns } from "./column";
import { mockOrders } from "@/shared/seed/order";
import { filterConfigs } from "./filter";

export default function OrderPage() {
  const { params } = useTableStore();
  const [data, setData] = useState<TableData<Order>>({
    items: [],
    total: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));

      await new Promise((r) => setTimeout(r, 400));

      let filtered = [...mockOrders];

      if (params.search) {
        filtered = filtered.filter(
          (order) =>
            order.customerName
              .toLowerCase()
              .includes(params.search.toLowerCase()) ||
            order.customerEmail
              .toLowerCase()
              .includes(params.search.toLowerCase()) ||
            order.id.toLowerCase().includes(params.search.toLowerCase())
        );
      }

      Object.entries(params.filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          filtered = filtered.filter((order) =>
            value.map(String).includes(String(order[key as keyof Order]))
          );
        }
      });

      if (params.sort) {
        filtered.sort((a, b) => {
          const aVal = a[params.sort!.key as keyof Order];
          const bVal = b[params.sort!.key as keyof Order];
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
    console.log("Create new order");
  };

  return (
    <div className="container mx-auto py-6">
      <TableTemplate
        title="Manage Orders"
        columns={orderColumns}
        data={data}
        filterConfigs={filterConfigs}
        onCreateNew={handleCreate}
        createButtonLabel="Tạo đơn hàng"
      />
    </div>
  );
}
