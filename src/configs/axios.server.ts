import axios from "axios";
import { cookies } from "next/headers";

const baseURL = "http://localhost:8000";

export const getServerAxios = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  return axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      Accept: "*/*",
      "Cache-Control": "no-cache",
    },
  });
};
