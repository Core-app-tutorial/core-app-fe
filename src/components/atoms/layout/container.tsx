import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        "flex justify-center items-center min-h-screen h-screen flex-col gap-4 relative",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Container;
