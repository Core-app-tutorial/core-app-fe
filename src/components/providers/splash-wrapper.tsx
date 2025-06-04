"use client";

import { useEffect, useState } from "react";
import SplashScreen from "../splash";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(async () => {
      try {
        await fetch("/api/splash", { method: "POST" });
      } catch (error) {
        console.error("Failed to set splash cookie", error);
      }
      setShowSplash(false);
    }, 3000); // 3s animation

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash) return <SplashScreen />;

  return <>{children}</>;
}
