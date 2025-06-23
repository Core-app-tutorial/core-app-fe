"use client";

import React from "react";
import { Icon } from "@iconify/react";

import { motion } from "framer-motion";
import { useTheme } from "../context/theme-provider";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Icon
        icon={theme === "dark" ? "solar:sun-bold" : "solar:moon-bold"}
        className={theme === "dark" ? "text-yellow-500" : "text-blue-500"}
        width={16}
        height={16}
      />
    </motion.button>
  );
};

export default ToggleTheme;
