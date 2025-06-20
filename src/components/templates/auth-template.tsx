"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthTemplateProps {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 1.2 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen relative px-4">
      <div className="space-y-6 w-full md:max-w-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button
          className="absolute top-4 left-4 z-20 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full"
          variant="link"
          size={"icon"}
          onClick={() => router.replace("/")}
        >
          <ArrowLeft />
          <span className="hidden font-semibold">Back</span>
        </Button>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-950/30 dark:to-gray-900/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/30 shadow-xl space-y-4 overflow-hidden h-full min-w-xl py-4 md:py-8"
        >
          {children}
        </motion.div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </section>
  );
};

export default AuthTemplate;
