import axios from "axios";
import { cookies } from "next/headers";

const baseURL = "http://localhost:8000";

export const getServerAxios = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const instance = axios.create({
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

  // Add response error interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      if (status === 401 || /token|unauthorized|expired/i.test(errorMessage)) {
        // Remove token
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      }

      // Re-throw error so your catch block in action still works
      return Promise.reject(error);
    }
  );

  return instance;
};
