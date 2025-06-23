"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import SplashScreen from "../splash";
import { motion } from "framer-motion";

const SplashContext = createContext<{ isSplashVisible: boolean }>({
  isSplashVisible: true,
});

export const SplashProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // delay match với motion delay + duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <SplashContext.Provider value={{ isSplashVisible: showSplash }}>
      {showSplash ? (
        <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </SplashContext.Provider>
  );
};

export const useSplash = () => useContext(SplashContext);
