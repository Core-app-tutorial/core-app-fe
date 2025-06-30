import { FilterConfig } from "@/constants/types/table";

export const filterConfigs: FilterConfig[] = [
  {
    key: "category",
    label: "Category",
    type: "multiselect",
    options: [
      { label: "Gaming Accessories", value: "Phụ kiện gaming" },
      { label: "Webcam", value: "Webcam" },
      { label: "USB Hub", value: "Hub USB" },
      { label: "Wireless Charger", value: "Sạc không dây" },
      { label: "Cables", value: "Dây cáp" },
      { label: "Monitor Stand", value: "Giá đỡ màn hình" },
      { label: "Cooling", value: "Tản nhiệt" },
      { label: "Speaker", value: "Loa" },
      { label: "Power Bank", value: "Pin dự phòng" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    type: "multiselect",
    options: [
      { label: "Corsair", value: "Corsair" },
      { label: "Logitech", value: "Logitech" },
      { label: "Anker", value: "Anker" },
      { label: "Samsung", value: "Samsung" },
      { label: "Razer", value: "Razer" },
      { label: "IKEA", value: "IKEA" },
      { label: "Dell", value: "Dell" },
      { label: "Cooler Master", value: "Cooler Master" },
      { label: "JBL", value: "JBL" },
      { label: "Xiaomi", value: "Xiaomi" },
    ],
  },
];
