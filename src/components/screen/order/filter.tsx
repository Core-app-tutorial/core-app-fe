import { FilterConfig } from "@/constants/types/table";

export const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { label: "Chờ xử lý", value: "pending" },
      { label: "Hoàn thành", value: "completed" },
      { label: "Đã gửi", value: "shipped" },
      { label: "Đã hủy", value: "cancelled" },
    ],
  },
];
