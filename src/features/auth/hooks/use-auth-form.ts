import { useForm } from "react-hook-form";
import { AuthSchema, loginSchema, registerSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseAuthForm {
  type: "login" | "register";
}

export const useAuthForm = ({ type }: UseAuthForm) => {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues:
      type === "login"
        ? { email: undefined, password: undefined }
        : {
            name: undefined,
            email: undefined,
            password: undefined,
          },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("Form submitted with data:", data);
  });

  return {
    form,
    onSubmit,
  };
};
