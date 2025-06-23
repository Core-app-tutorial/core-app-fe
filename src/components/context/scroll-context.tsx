"use client";

import React, { createContext, useEffect, useRef, useState } from "react";

interface ScrollContextValue {
  direction: "DOWN" | "UP" | "NONE";
  scrollY: number;
  diff: number;
  isScrollDown: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  direction: "NONE",
  scrollY: 0,
  diff: 0,
  isScrollDown: false,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ScrollContextValue>({
    direction: "NONE",
    scrollY: 0,
    diff: 0,
    isScrollDown: false,
  });
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < 10) return;

      const direction = diff > 0 ? "DOWN" : "UP";
      setState({
        direction,
        scrollY: y,
        diff,
        isScrollDown: direction === "DOWN",
      });
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
