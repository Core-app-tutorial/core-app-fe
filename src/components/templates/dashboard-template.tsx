import type React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { AnimatedSidebar } from "../organisms/layout/dashboard/animated-sidebar";
import ToggleTheme from "../atoms/toggle/toggle-theme";
import { DynamicBreadcrumb } from "../organisms/breadcrumb/dynamic";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export function DashboardTemplate({ children }: DashboardTemplateProps) {
  return (
    <SidebarProvider>
      <AnimatedSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between pr-4">
          <div className="flex  items-center gap-2b px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
          <ToggleTheme />
        </header>
        <main className="flex-1 p-2 bg-slate-50 dark:bg-background/50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
