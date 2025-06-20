import { cn } from "@/lib/utils";
import React from "react";

interface WaveTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const WaveText: React.FC<WaveTextProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <span className={cn("wave-text", className)} {...props}>
      {children}
    </span>
  );
};
