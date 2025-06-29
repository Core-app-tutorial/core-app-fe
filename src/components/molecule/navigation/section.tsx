"use client";

import { forwardRef } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavSection } from "@/constants/router/sidebar";
import { NavigationItem } from "./item";

interface NavigationSectionProps {
  section: NavSection;
  activeItem: string;
  onItemClick: (href: string) => void;
}

export const NavigationSection = forwardRef<
  HTMLUListElement,
  NavigationSectionProps
>(({ section, activeItem, onItemClick }, ref) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {section.title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu ref={ref}>
          {section.items.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              isActive={activeItem === item.href}
              onClick={onItemClick}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});

NavigationSection.displayName = "NavigationSection";
