"use client";

import { FormInput } from "@/components/atoms/form-input";
import Stack from "@/components/atoms/stack";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { EyeOff, EyeIcon, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();
  const { form, onSubmit } = useAuthForm({ type: "login" });

  return (
    <div className="flex flex-col items-center justify-center px-4 space-y-4">
      <Image
        src={theme === "dark" ? "/logo-white-text.svg" : "/logo-dark-text.svg"}
        alt="Auth Left Image"
        width={200}
        height={200}
        className="w-full h-full object-cover"
        style={{
          maxWidth: "7rem",
          maxHeight: "7rem",
        }}
      />

      <h1 className="text-3xl font-bold">Welcome Back</h1>

      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full max-w-sm space-y-1"
        >
          <FormInput
            name="email"
            control={form.control}
            label="Email"
            placeholder="Enter your email"
            type="email"
            iconLeft={<Mail className="text-muted-foreground size-4" />}
          />
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            iconLeft={<Lock className="text-muted-foreground size-4" />}
            iconRight={
              showPassword ? (
                <EyeOff
                  className="text-muted-foreground size-4"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="text-muted-foreground size-4"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          <Stack horizontal className="justify-between items-center">
            <Stack horizontal className="items-center">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me">Remember me</Label>
            </Stack>

            <Link
              href="/forgot-password"
              className="text-sm text-primary underline font-semibold"
            >
              Forgot password?
            </Link>
          </Stack>

          <Button className="py-5 justify-between">
            <div></div>
            <div>
              {form.formState.isSubmitting ? "Logging in..." : "Sign in"}
            </div>
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Form>

      <h3 className="flex items-center w-full max-w-sm gap-4 text-muted-foreground uppercase text-sm">
        <div className="flex-1 h-[1px] bg-border" />
        Or log in with Email
        <div className="flex-1 h-[1px] bg-border" />
      </h3>

      <div className="w-full max-w-sm space-y-4">
        <Button className="w-full py-5" variant="outline">
          <div className="flex  justify-between w-full">
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={16}
              height={16}
              className="inline mr-2"
            />
            <span>Log in with Google</span>
            <div></div>
          </div>
        </Button>
      </div>

      <span className="text-sm text-muted-foreground font-semibold">
        Don&apos;t have an account yet?&nbsp;
        <Link href="/register" className="text-primary underline font-semibold">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default LoginForm;
