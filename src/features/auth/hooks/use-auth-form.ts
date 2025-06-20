"use client";

import { useForm } from "react-hook-form";
import { AuthSchema, loginSchema, registerSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "./use-auth";

interface UseAuthForm {
  type: "login" | "register";
}

export const useAuthForm = ({ type }: UseAuthForm) => {
  const { loginMutation, registerMutation } = useAuthMutation();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : {
            name: "",
            email: "",
            password: "",
          },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    switch (type) {
      case "login":
        loginMutation.mutateAsync(
          {
            email: data.email!,
            password: data.password!,
          }
          // {
          //   onSuccess: () => {
          //     // form.reset();
          //   },
          // }
        );

        break;
      case "register":
        registerMutation.mutateAsync({
          name: data.name!,
          email: data.email!,
          password: data.password!,
        });
        break;
      default:
        throw new Error("Invalid form type");
    }
  });

  const isPending =
    type === "login" ? loginMutation.isPending : registerMutation.isPending;

  return {
    form,
    onSubmit,
    isPending,
  };
};
