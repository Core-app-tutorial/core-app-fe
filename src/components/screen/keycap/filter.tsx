import { FilterConfig } from "@/constants/types/table";

export const filterConfigs: FilterConfig[] = [
  {
    key: "category",
    label: "Profile",
    type: "multiselect",
    options: [
      { label: "OEM", value: "OEM" },
      { label: "Cherry", value: "Cherry" },
      { label: "SA", value: "SA" },
      { label: "XDA", value: "XDA" },
      { label: "DSA", value: "DSA" },
      { label: "MT3", value: "MT3" },
      { label: "KAT", value: "KAT" },
      { label: "ASA", value: "ASA" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    type: "multiselect",
    options: [
      { label: "Generic", value: "Generic" },
      { label: "GMK", value: "GMK" },
      { label: "Signature Plastics", value: "Signature Plastics" },
      { label: "Drop", value: "Drop" },
      { label: "Keyreative", value: "Keyreative" },
      { label: "Akko", value: "Akko" },
      { label: "Tai-Hao", value: "Tai-Hao" },
    ],
  },
];
