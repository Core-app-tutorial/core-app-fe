import { IParams } from "@/constants/types/params";

export interface UserParams extends IParams {
  status: string;
  role: string;
}
