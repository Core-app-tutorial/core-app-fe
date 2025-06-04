"use client";

import { motion } from "framer-motion";

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export default function SplashScreen({
  onAnimationComplete,
}: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div
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
