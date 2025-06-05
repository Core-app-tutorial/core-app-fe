"use client";

import { useScrollState } from "@/hooks/use-scroll-state";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Stack from "../atoms/stack";
import { useTheme } from "../providers/theme-provider";
import { Button } from "../ui/button";
import MenuSheet from "./menu-sheet";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const isVisible = useScrollState();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "top-4 w-full z-50 transition-all duration-300 fixed flex justify-center items-center"
      )}
    >
      <div className="md:max-w-3xl md:w-3xl lg:w-full md:border-2 md:rounded-full lg:mx-2 px-6 py-2 bg-zinc-200/50 dark:bg-slate-900/50 backdrop-blur-3xl mx-2 rounded-full lg:max-w-fit md:mx-2 max-w-2xl w-full">
        <div className="flex justify-between items-center gap-10">
          <Stack horizontal className="items-center gap-4">
            <div className="lg:hidden">
              <MenuSheet />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.replace("/")}
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent uppercase hover:cursor-pointer"
            >
              Core
            </motion.div>
          </Stack>

          <div className="flex items-center space-x-8 ">
            <div className="hidden lg:flex items-center space-x-8">
              {[
                "Overview",
                "Stack",
                "Experience",
                "Projects",
                "Testimonials",
                "Certifications",
                "Contact",
              ].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <Stack horizontal className="items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Icon
                    icon="solar:sun-bold"
                    className="text-yellow-500"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Icon
                    icon="solar:moon-bold"
                    className="text-blue-500"
                    width={16}
                    height={16}
                  />
                )}
              </motion.button>

              <Button
                className="rounded-4xl gap-0"
                variant="outline"
                onClick={() => router.push("/login")}
                aria-label="Login"
              >
                <span className="ml-2">Login</span>
                <Icon
                  icon="iconoir:nav-arrow-right-solid"
                  width={16}
                  height={16}
                />
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
