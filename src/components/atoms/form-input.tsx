import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
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
}: FormInputProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`peer ${iconLeft ? "ps-9" : ""} ${
                  iconRight ? "pe-9" : ""
                }`}
              />
            </FormControl>
            {iconLeft && (
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                {iconLeft}
              </div>
            )}
            {iconRight && (
              <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-3">
                {iconRight}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
