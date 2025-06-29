"use client";

import { NavigationSection } from "@/components/molecule/navigation/section";
import { SlidingIndicator } from "@/components/molecule/navigation/sliding-indicator";
import { IndicatorStyle, NavSection } from "@/constants/router/sidebar";
import { useRef, useEffect } from "react";

interface NavigationMenuProps {
  sections: NavSection[];
  activeItem: string;
  onItemClick: (href: string) => void;
  indicatorStyle: IndicatorStyle;
  onIndicatorUpdate: (style: IndicatorStyle) => void;
}

export function NavigationMenu({
  sections,
  activeItem,
  onItemClick,
  indicatorStyle,
  onIndicatorUpdate,
}: NavigationMenuProps) {
  const menuRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  useEffect(() => {
    let activeElement: HTMLElement | null = null;

    // Find the active element across all sections
    Object.values(menuRefs.current).forEach((menuRef) => {
      if (menuRef && !activeElement) {
        const element = menuRef.querySelector(
          `[data-item-href="${activeItem}"]`
        ) as HTMLElement;
        if (element) {
          activeElement = element;
        }
      }
    });

    if (activeElement) {
      // Find the parent menu container to calculate relative position
      const parentMenu = (activeElement as HTMLElement).closest(
        "[data-menu-container]"
      ) as HTMLElement;
      if (parentMenu) {
        const parentRect = parentMenu.getBoundingClientRect();
        const activeRect = (
          activeElement as HTMLElement
        ).getBoundingClientRect();

        onIndicatorUpdate({
          top: activeRect.top - parentRect.top,
          height: activeRect.height,
        });
      }
    }
  }, [activeItem, onIndicatorUpdate]);

  return (
    <div className="relative" data-menu-container>
      <SlidingIndicator style={indicatorStyle} />

      {sections.map((section) => (
        <NavigationSection
          key={section.title}
          ref={(el) => {
            menuRefs.current[section.title] = el;
          }}
          section={section}
          activeItem={activeItem}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}
