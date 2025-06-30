"use client";

import { TableData } from "@/constants/types/table";
import { useTableStore } from "@/shared/stores/table-store";
import React from "react";
import { Customer, customerColumn } from "./column";
import { TableTemplate } from "@/components/templates/table-template";
import { mockCustomers } from "@/shared/seed/customer";
import { filterUserConfig } from "./filter";

const CustomerPage = () => {
  const { params } = useTableStore();
  const [data, setData] = React.useState<TableData<Customer>>({
    items: [],
    total: 0,
    loading: true,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));

      await new Promise((resolve) => setTimeout(resolve, 400));

      let filtered = [...mockCustomers];

      if (params.search) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(params.search.toLowerCase())
        );
      }

      if (params.sort) {
        filtered.sort((a, b) => {
          const aVal = a[params.sort!.key as keyof Customer];
          const bVal = b[params.sort!.key as keyof Customer];
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
    console.log("Create new customer");
  };

  return (
    <div className="container mx-auto py-6">
      <TableTemplate
        title="Manage Keyboard Products"
        columns={customerColumn}
        data={data}
        filterConfigs={filterUserConfig}
        onCreateNew={handleCreate}
        createButtonLabel="Thêm sản phẩm"
      />
    </div>
  );
};
export default CustomerPage;
