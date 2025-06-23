"use client";

import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "./context/theme-provider";
import ChromaKeyVideo from "./atoms/video/chroma-key-video";

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export default function SplashScreen({
  onAnimationComplete,
}: SplashScreenProps) {
  const { theme } = useTheme();

  // Scroll to the top of the page when the splash screen is mounted
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-zinc-200 dark:bg-slate-900 text-white flex items-center justify-center z-50 pointer-events-none "
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 3, duration: 1 }}
      onAnimationComplete={onAnimationComplete}
      style={{ visibility: "visible" }}
    >
      <ChromaKeyVideo
        src={
          theme === "dark"
            ? "/videos/core-light-effect.mp4"
            : "/videos/core-dark-effect.mp4"
        }
        size={{
          width: 1080,
          height: 640,
        }}
        options={{
          minHue: 60,
          maxHue: 180,
          minSaturation: 0.01,
          threshold: 1.0,
        }}
      />
    </motion.div>
  );
}
