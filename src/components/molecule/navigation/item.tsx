"use client";

import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavItem } from "@/constants/router/sidebar";
import { NavIcon } from "@/components/atoms/icons/nav-icon";

interface NavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (href: string) => void;
}

export function NavigationItem({
  item,
  isActive,
  onClick,
}: NavigationItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "relative transition-all duration-200 hover:bg-blue-200 dark:hover:bg-blue-900/40 hover:scale-105",
          isActive &&
            "text-zinc-800 dark:text-slate-100 font-medium  dark:bg-blue-900/40 "
        )}
        data-item-href={item.href}
      >
        <button
          onClick={() => onClick(item.href)}
          className="w-full flex items-center gap-3 px-4 py-2 text-left"
        >
          <NavIcon icon={item.icon} isActive={isActive} />
          <span className="truncate">{item.label}</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
