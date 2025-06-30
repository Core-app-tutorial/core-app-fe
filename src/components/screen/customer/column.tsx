import { TableColumn } from "@/constants/types/table";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export const customerColumn: TableColumn<Customer>[] = [
  {
    key: "id",
    label: "ID",
    sortable: false,
    width: "100px",
    render: (value) => (value ? value : "N/A"),
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
    width: "200px",
    render: (value) => (value ? value : "N/A"),
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    width: "250px",
    render: (value) => (value ? value : "N/A"),
  },
  {
    key: "phone",
    label: "Phone",
    sortable: true,
    width: "150px",
    render: (value) => (value ? value : "N/A"),
  },
  {
    key: "address",
    label: "Address",
    sortable: true,
    width: "300px",
    render: (value) => (value ? value : "N/A"),
  },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    width: "150px",
    render: (value) => new Date(value).toLocaleDateString("vi-VN"),
  },
  {
    key: "updatedAt",
    label: "Updated At",
    sortable: true,
    width: "150px",
    render: (value) => new Date(value).toLocaleDateString("vi-VN"),
  },
];
