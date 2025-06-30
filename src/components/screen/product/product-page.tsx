"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TableTemplate } from "@/components/templates/table-template";
import { FilterConfig, TableColumn, TableData } from "@/constants/types/table";
import { useTableStore } from "@/shared/stores/table-store";

// Product type & mock data
interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: "P-001",
    name: "iPhone 15",
    category: "Điện thoại",
    brand: "Apple",
    price: 24990000,
    stock: 12,
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "P-002",
    name: "Galaxy S24",
    category: "Điện thoại",
    brand: "Samsung",
    price: 19990000,
    stock: 8,
    createdAt: new Date("2024-02-05").toISOString(),
  },
  {
    id: "P-003",
    name: "XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 32990000,
    stock: 5,
    createdAt: new Date("2024-01-25").toISOString(),
  },
  {
    id: "P-004",
    name: "AirPods Pro 2",
    category: "Tai nghe",
    brand: "Apple",
    price: 6490000,
    stock: 25,
    createdAt: new Date("2024-03-12").toISOString(),
  },
  {
    id: "P-005",
    name: "Surface Pro 10",
    category: "Máy tính bảng",
    brand: "Microsoft",
    price: 28990000,
    stock: 3,
    createdAt: new Date("2024-02-18").toISOString(),
  },
  {
    id: "P-006",
    name: "Galaxy Tab S9",
    category: "Máy tính bảng",
    brand: "Samsung",
    price: 19990000,
    stock: 10,
    createdAt: new Date("2024-03-01").toISOString(),
  },
  {
    id: "P-007",
    name: "ThinkPad X1 Carbon",
    category: "Laptop",
    brand: "Dell",
    price: 39990000,
    stock: 2,
    createdAt: new Date("2024-01-30").toISOString(),
  },
  {
    id: "P-008",
    name: "Galaxy Buds Pro",
    category: "Tai nghe",
    brand: "Samsung",
    price: 4990000,
    stock: 15,
    createdAt: new Date("2024-02-20").toISOString(),
  },
  {
    id: "P-009",
    name: "iPad Pro 12.9",
    category: "Máy tính bảng",
    brand: "Apple",
    price: 32990000,
    stock: 7,
    createdAt: new Date("2024-03-05").toISOString(),
  },
  {
    id: "P-010",
    name: "MacBook Air M2",
    category: "Laptop",
    brand: "Apple",
    price: 27990000,
    stock: 4,
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "P-011",
    name: "Galaxy Z Flip 5",
    category: "Điện thoại",
    brand: "Samsung",
    price: 29990000,
    stock: 6,
    createdAt: new Date("2024-02-28").toISOString(),
  },
  {
    id: "P-012",
    name: "MacBook Pro 16",
    category: "Laptop",
    brand: "Apple",
    price: 49990000,
    stock: 2,
    createdAt: new Date("2024-03-10").toISOString(),
  },
];

// Column & filter configuration with fixed widths
const columns: TableColumn<Product>[] = [
  {
    key: "id",
    label: "Code",
    sortable: true,
    width: "100px",
  },
  {
    key: "name",
    label: "Product Name",
    sortable: true,
    width: "220px",
  },
  {
    key: "category",
    label: "Category",
    sortable: true,
    width: "140px",
  },
  {
    key: "brand",
    label: "Brand",
    sortable: true,
    width: "140px",
  },
  {
    key: "price",
    label: "Price (VND)",
    sortable: true,
    width: "150px",
    render: (value) => Number(value).toLocaleString("vi-VN"),
  },
  {
    key: "stock",
    label: "Stock",
    sortable: true,
    width: "100px",
    render: (value) => (
      <Badge variant={Number(value) <= 5 ? "destructive" : "secondary"}>
        {String(value)}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    width: "150px",
    render: (value) => new Date(value).toLocaleDateString("vi-VN"),
  },
];

const filterConfigs: FilterConfig[] = [
  {
    key: "category",
    label: "Category",
    type: "multiselect",
    options: [
      { label: "Phone", value: "Điện thoại" },
      { label: "Laptop", value: "Laptop" },
      { label: "Tablet", value: "Máy tính bảng" },
      { label: "Headphones", value: "Tai nghe" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    type: "multiselect",
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Samsung", value: "Samsung" },
      { label: "Dell", value: "Dell" },
      { label: "Microsoft", value: "Microsoft" },
    ],
  },
];

export default function ProductsPage() {
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

      let filtered = [...mockProducts];

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
    console.log("Create new product");
  };

  return (
    <div className="container mx-auto py-6">
      <TableTemplate
        title="Quản lý sản phẩm"
        columns={columns}
        data={data}
        filterConfigs={filterConfigs}
        onCreateNew={handleCreate}
        createButtonLabel="Thêm sản phẩm"
      />
    </div>
  );
}
