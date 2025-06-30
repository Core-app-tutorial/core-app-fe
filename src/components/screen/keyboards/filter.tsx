import { FilterConfig } from "@/constants/types/table";

export const filterConfigs: FilterConfig[] = [
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
