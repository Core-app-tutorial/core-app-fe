"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBlob } from "@/components/atoms/animated-blob";
import { useTheme } from "@/components/context/theme-provider";
import { themeColors } from "@/constants/color/theme";

const AuthBanner: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLogin = pathname === "/login";

  const themeBlobColor =
    theme === "dark" ? themeColors.BlueAbyss : themeColors.GrayAbyss;

  return (
    <motion.div
      key={`banner-${isLogin ? "login" : "register"}`}
      className="hidden md:flex absolute inset-0 w-1/2 items-center justify-center text-white z-10 overflow-hidden dark:bg-slate-900 backdrop-blur"
      initial={{
        x: isLogin ? "0%" : "100%",
      }}
      animate={{
        x: isLogin ? "100%" : "0%",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.2,
      }}
    >
      <div
        className={cn(
          "absolute",
          isLogin ? "bottom-16 right-1 scale-x-[-1]" : "bottom-24 left-1"
        )}
      >
        <AnimatedBlob fill={themeBlobColor} />
      </div>
      <motion.div
        key={isLogin ? "register-banner" : "login-banner"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-6 p-8 max-w-4xl absolute"
      >
        <Image
          src="/workingperson.svg"
          alt="Working Person"
          width={1200}
          height={900}
          className={cn(
            "relative z-10 mx-auto object-cover w-full h-auto max-w-xs md:max-w-sm",
            !isLogin && "scale-x-[-1]"
          )}
          style={{
            maxWidth: "28rem",
            maxHeight: "28rem",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AuthBanner;
