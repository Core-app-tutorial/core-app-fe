"use client";

import { useTheme } from "@/components/context/theme-provider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ThemeImageProps {
  className?: string;
  width?: number;
  height?: number;
  maxWidth?: string;
  maxHeight?: string;
  lightSrc?: string;
  darkSrc?: string;
  alt?: string;
  priority?: boolean;
}

const ThemeImage: React.FC<ThemeImageProps> = ({
  className,
  width = 200,
  height = 200,
  maxWidth = "7rem",
  maxHeight = "7rem",
  lightSrc = "/logo-dark-text.svg",
  darkSrc = "/logo-white-text.svg",
  alt = "Logo",
  priority = false,
}) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? darkSrc : lightSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn("w-full h-full object-cover ", className)}
      priority={priority}
      style={{
        maxWidth,
        maxHeight,
      }}
    />
  );
};

export default ThemeImage;
