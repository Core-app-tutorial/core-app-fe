"use server";

import { getServerAxios } from "@/configs/axios.server";
import { UserProfile } from "@/features/user/models/response";
import { AxiosError } from "axios";

export const getUserProfile = async (): Promise<Result<UserProfile | null>> => {
  try {
    const axios = await getServerAxios();
    const res = await axios.get<Result<UserProfile>>("/users/profile");

    return {
      isSuccess: res.data.isSuccess,
      value: res.data.value || null,
      message: res.data.message || "User profile fetched successfully",
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || error.message;
    }
    return {
      isSuccess: false,
      message,
    };
  }
};
