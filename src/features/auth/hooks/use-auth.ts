import { useMutation } from "@tanstack/react-query";
import { LoginRequest, RegisterRequest } from "../models/request";
import { AuthService } from "../api";
import { QUERY_KEY } from "@/shared/key/query-key";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { message } from "@/shared/message/toast";
import { AxiosError } from "axios";
import { useAuthContext } from "@/components/context/auth-context";

export const useAuthMutation = () => {
  const redirect = useRouter();
  const { setAuthenticated } = useAuthContext();

  const loginMutation = useMutation({
    mutationKey: [QUERY_KEY.Auth.Login],
    mutationFn: async (req: LoginRequest) => await AuthService.login(req),

    onSuccess: async (response) => {
      toast.success(response.message || message.success.auth.login);

      if (response.value?.accessToken && response.value?.refreshToken) {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: response.value.accessToken,
            refreshToken: response.value.refreshToken,
          }),
        });
        setAuthenticated(true);
      }

      // Dismiss the toast after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.dismiss();

      // // Redirect to the home page after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      redirect.replace("/");
    },
    onError: (error: AxiosError<Result<null>>) => {
      toast.error(error.response?.data?.message || message.error.auth.login, {
        description: "Please check your credentials and try again.",
      });
    },
  });

  const registerMutation = useMutation({
    mutationKey: [QUERY_KEY.Auth.Register],
    mutationFn: async (req: RegisterRequest) => await AuthService.register(req),

    onSuccess: () => {
      toast("Registration successful", {
        description: "Login with your new account.",
        action: {
          label: "Log In",
          onClick: () => redirect.push("/login"),
        },
        position: "top-center",
      });
    },
    onError: (error: AxiosError<Result<null>>) => {
      toast.error(
        error.response?.data?.message || message.error.auth.register,
        {
          description: "Please try again.",
        }
      );
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
};
