"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useTheme } from "../context/theme-provider";
import Image from "next/image";
import { Separator } from "../ui/separator";

const MenuSheet = () => {
  const { theme } = useTheme();

  const handleNavigation = (item: string) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    "Overview",
    "Stack",
    "Experience",
    "Projects",
    "Testimonials",
    "Certifications",
    "Contact",
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Image
            src={
              theme === "dark" ? "/logo-white-text.svg" : "/logo-dark-text.svg"
            }
            alt="Auth Left Image"
            width={200}
            height={200}
            priority
            className="w-full h-full object-cover "
            style={{
              maxWidth: "4rem",
              maxHeight: "4rem",
            }}
          />
        </SheetHeader>
        <Separator />

        <div className="flex-1 px-6 py-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-12 px-4 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={() => handleNavigation(item)}
                  >
                    {item}
                  </Button>
                </SheetClose>
              </motion.div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
