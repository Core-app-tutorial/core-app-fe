"use client";

import { Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/features/user/models/response";

interface UserProfileProps {
  user: UserProfile;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export function UserProfile({
  user,
  onSettingsClick,
  onLogoutClick,
}: UserProfileProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={"https://github.com/shadcn.png"} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.role}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-start gap-2 h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={onSettingsClick}
        >
          <Settings className="h-4 w-4" />
          <span className="text-xs">Setting</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-start gap-2 h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={onLogoutClick}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs">Log out</span>
        </Button>
      </div>
    </div>
  );
}
