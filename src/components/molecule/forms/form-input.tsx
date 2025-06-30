import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import IconInput from "@/components/atoms/input/with-icon";

interface FormInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "",
  type = "text",
  iconLeft,
  iconRight,
  autoComplete,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <IconInput
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              iconLeft={iconLeft}
              iconRight={iconRight}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
