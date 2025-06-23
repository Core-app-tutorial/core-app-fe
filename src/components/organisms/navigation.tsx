"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Stack from "../atoms/stack";
import { useAuthContext } from "../context/auth-context";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MenuSheet from "./menu-sheet";
import ToggleTheme from "./toggle-theme";
import { UserProfile } from "./user-profile";

export default function Navigation() {
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "top-0 py-4 w-full z-50 transition-all duration-300 fixed flex xl:justify-between lg:justify-between justify-center items-center xl:px-8 sm:px-4 px-0 backdrop-blur-lg "
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.replace("/")}
        className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent uppercase hover:cursor-pointer  lg:block hidden"
      >
        Core
      </motion.div>
      <div className="md:max-w-3xl md:w-3xl lg:w-full md:border-2 md:rounded-full lg:mx-2 px-6 py-2 bg-zinc-200/50 dark:bg-slate-900/50 backdrop-blur-3xl mx-2 rounded-full lg:max-w-fit md:mx-2 max-w-2xl w-full">
        <div className="flex justify-between items-center gap-10 ">
          <Stack horizontal className="items-center gap-4 flex lg:hidden">
            <div className="lg:hidden">
              <MenuSheet />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.replace("/")}
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent uppercase hover:cursor-pointer lg:hidden"
            >
              Core
            </motion.div>
          </Stack>

          <div className="hidden lg:flex items-center gap-8">
            {["Home", "Features", "Pricing", "About Us", "Contact", "Blog"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300 text-sm font-medium scale-3d hover:scale-105"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
          <Stack horizontal className="items-center gap-4 flex lg:hidden">
            {/* Theme Toggle */}
            <ToggleTheme />

            {!isAuthenticated ? (
              <Button
                className="rounded-4xl liquid-button"
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
            ) : (
              <UserProfile
                user={{
                  username: "John Doe",
                  avatarUrl: "https://github.com/shadcn.png",
                  email: "anhthtservice@gmail.com",
                }}
              />
            )}
          </Stack>
        </div>
      </div>
      <div className="lg:flex hidden gap-4 items-center justify-end h-6">
        {/* Theme Toggle */}
        <ToggleTheme />

        <Separator orientation="vertical" />

        {!isAuthenticated ? (
          <Button
            className="rounded-4xl liquid-button"
            variant="outline"
            onClick={() => router.push("/login")}
            aria-label="Login"
          >
            <span className="ml-2">Login</span>
            <Icon icon="iconoir:nav-arrow-right-solid" width={16} height={16} />
          </Button>
        ) : (
          <UserProfile
            user={{
              username: user?.name || "Không xác định",
              avatarUrl: "https://github.com/shadcn.png",
              email: user?.email || "Không xác định",
            }}
          />
        )}
      </div>
    </motion.nav>
  );
}
