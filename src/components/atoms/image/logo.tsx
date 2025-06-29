"use client";

import { useTheme } from "@/components/context/theme-provider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  maxWidth?: string;
  maxHeight?: string;
}

const Logo: React.FC<LogoProps> = ({
  className,
  width = 200,
  height = 200,
  maxWidth = "7rem",
  maxHeight = "7rem",
}) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/logo-white-text.svg" : "/logo-dark-text.svg"}
      alt="Auth Left Image"
      width={width}
      height={height}
      className={cn("w-full h-full object-cover ", className)}
      style={{
        maxWidth,
        maxHeight,
      }}
    />
  );
};

export default Logo;
