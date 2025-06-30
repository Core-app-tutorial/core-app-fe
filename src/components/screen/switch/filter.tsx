import { FilterConfig } from "@/constants/types/table";

export const filterConfigs: FilterConfig[] = [
  {
    key: "category",
    label: "Switch Type",
    type: "multiselect",
    options: [
      { label: "Linear", value: "Linear" },
      { label: "Tactile", value: "Tactile" },
      { label: "Clicky", value: "Clicky" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    type: "multiselect",
    options: [
      { label: "Cherry", value: "Cherry" },
      { label: "Gateron", value: "Gateron" },
      { label: "Kailh", value: "Kailh" },
      { label: "ZealPC", value: "ZealPC" },
      { label: "Drop", value: "Drop" },
      { label: "NovelKeys", value: "NovelKeys" },
      { label: "Gazzew", value: "Gazzew" },
      { label: "Durock", value: "Durock" },
      { label: "C³Equalz", value: "C³Equalz" },
    ],
  },
];
