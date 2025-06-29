import { cn } from "@/lib/utils";
import React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  children?: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({
  horizontal,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        horizontal ? "flex flex-row" : "flex flex-col",
        "justify-start items-start gap-2 ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
