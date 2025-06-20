import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
