import { Role } from "@/constants/enums/role";

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface DecodeToken {
  sub: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
