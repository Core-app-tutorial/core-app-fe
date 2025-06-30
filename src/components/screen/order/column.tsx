import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/constants/types/table";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "completed" | "shipped" | "cancelled";
  totalAmount: number;
  orderDate: string;
  items: OrderItem[];
}

const getStatusVariant = (status: Order["status"]) => {
  switch (status) {
    case "completed":
      return "default";
    case "shipped":
      return "secondary";
    case "pending":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusLabel = (status: Order["status"]) => {
  switch (status) {
    case "completed":
      return "Hoàn thành";
    case "shipped":
      return "Đã gửi";
    case "pending":
      return "Chờ xử lý";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export const orderColumns: TableColumn<Order>[] = [
  {
    key: "id",
    label: "Order ID",
    sortable: true,
    width: "120px",
  },
  {
    key: "customerName",
    label: "Customer",
    sortable: true,
    width: "200px",
  },
  {
    key: "customerEmail",
    label: "Email",
    sortable: true,
    width: "220px",
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    width: "120px",
    render: (value) => (
      <Badge variant={getStatusVariant(value as Order["status"])}>
        {getStatusLabel(value as Order["status"])}
      </Badge>
    ),
  },
  {
    key: "totalAmount",
    label: "Total (VND)",
    sortable: true,
    width: "150px",
    render: (value) => Number(value).toLocaleString("vi-VN"),
  },
  {
    key: "items",
    label: "Items",
    sortable: false,
    width: "100px",
    render: (value) => `${(value as OrderItem[]).length} sản phẩm`,
  },
  {
    key: "orderDate",
    label: "Order Date",
    sortable: true,
    width: "150px",
    render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
  },
];
