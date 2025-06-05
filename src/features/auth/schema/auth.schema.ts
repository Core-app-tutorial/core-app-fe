import { z } from "zod";

export const RegexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export const registerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      RegexPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .nonempty("Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export type AuthSchema = LoginSchema & Partial<RegisterSchema>;
