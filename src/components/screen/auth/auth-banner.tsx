"use client";

import type React from "react";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

const AuthBanner: React.FC = () => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <motion.div
      key={`banner-${isLogin ? "login" : "register"}`}
      className="hidden md:flex absolute inset-0 w-1/2 items-center justify-center text-white z-10 overflow-hidden dark:bg-slate-900"
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
      }}
    >
      <motion.div
        key={isLogin ? "register-banner" : "login-banner"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.1 }}
        className="text-center space-y-6 p-8 max-w-4xl"
      >
        <Image
          src="/workingperson.svg"
          alt="Working Person"
          width={1200}
          height={900}
          className="mx-auto object-cover w-full h-auto max-w-xs md:max-w-sm"
          style={{
            maxWidth: "30rem",
            maxHeight: "30rem",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AuthBanner;
