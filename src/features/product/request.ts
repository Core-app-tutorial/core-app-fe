import { Layout } from "@/constants/enums/layout";
import { Material } from "@/constants/enums/material";
import { IParams } from "@/constants/types/params";

export interface ProductParams extends IParams {
  material: Material;
  layout: Layout;
  code: string;
}
