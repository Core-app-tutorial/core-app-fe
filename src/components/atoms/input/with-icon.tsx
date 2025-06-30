import { Input } from "@/components/ui/input";
import React from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const IconInput = ({
  iconLeft,
  iconRight,
  type,
  placeholder,
  autoComplete,
  ...props
}: IconInputProps) => {
  return (
    <div className="relative">
      <Input
        {...props}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`peer ${iconLeft ? "ps-9" : ""} ${iconRight ? "pe-9" : ""}`}
      />
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
  );
};

export default IconInput;
