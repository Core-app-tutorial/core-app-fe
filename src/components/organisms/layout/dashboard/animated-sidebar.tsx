"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { IndicatorStyle, navSections } from "@/constants/router/sidebar";
import Logo from "@/components/atoms/image/logo";
import { NavigationMenu } from "./navigation-menu";
import { UserProfile } from "@/components/molecule/navigation/user-profile";
import { useAuthContext } from "@/components/context/auth-context";
import { useRouter } from "next/navigation";

export function AnimatedSidebar() {
  const [activeItem, setActiveItem] = useState("/dashboard");

  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    top: 0,
    height: 0,
  });

  const handleItemClick = (href: string) => {
    setActiveItem(href);
    router.push(href);
  };

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <Sidebar className="border-r bg-transparent dark:bg-transparent h-full">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <NavigationMenu
          sections={navSections}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          indicatorStyle={indicatorStyle}
          onIndicatorUpdate={setIndicatorStyle}
        />
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <UserProfile
            user={user}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
