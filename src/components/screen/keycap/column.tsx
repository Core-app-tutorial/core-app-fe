import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/constants/types/table";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  createdAt: string;
}

export const productColumns: TableColumn<Product>[] = [
  {
    key: "id",
    label: "Code",
    sortable: true,
    width: "100px",
  },
  {
    key: "name",
    label: "Keycap Set",
    sortable: true,
    width: "220px",
  },
  {
    key: "category",
    label: "Profile",
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
      <Badge variant={Number(value) <= 10 ? "destructive" : "secondary"}>
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
