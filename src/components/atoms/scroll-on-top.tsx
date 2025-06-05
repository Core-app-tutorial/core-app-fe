"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollOnTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-8 right-8 p-3 bg-zinc-200/50 dark:bg-slate-900/50 text-white rounded-full shadow-lg border border-muted 
                 hover:scale-110 transform transition-transform duration-200 ease-in-out
                 hover:bg-gray-700 z-50"
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}
