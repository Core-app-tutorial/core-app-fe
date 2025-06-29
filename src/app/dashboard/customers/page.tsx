"use client";
import { TableTemplate } from "@/components/templates/table-template";
import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/constants/types/table";
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-05-12",
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    role: "Editor",
    status: "inactive",
    joinDate: "2023-06-18",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-07-22",
  },
  {
    id: 8,
    name: "Grace Lee",
    email: "grace@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-08-30",
  },
];

const userColumns: TableColumn<User>[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
    filterable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    filterable: true,
    render: (value: string) => (
      <Badge variant={value === "active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    key: "joinDate",
    label: "Join Date",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

const CustomerPage = () => {
  return (
    <TableTemplate
      data={sampleUsers}
      columns={userColumns}
      title="User Management"
    />
  );
};

export default CustomerPage;
