import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getServerAxios = async () => {
  const token = (await cookies()).get("token")?.value;

  return axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
};
