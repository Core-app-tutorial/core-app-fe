"use client";

import { motion } from "framer-motion";
import React from "react";

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export default function SplashScreen({
  onAnimationComplete,
}: SplashScreenProps) {
  // Scroll to the top of the page when the splash screen is mounted
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black text-white flex items-center justify-center z-50 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      onAnimationComplete={onAnimationComplete}
      style={{ visibility: "visible" }}
    >
      <motion.div
        id="splash-screen"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold"
      >
        🚀 MyApp
      </motion.div>
    </motion.div>
  );
}
