import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useScrollContext } from "@/components/context/scroll-context";
import { useAuthContext } from "@/components/context/auth-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface UserProfileProps {
  user: { username: string; avatarUrl: string; email: string };
  isScrollDown?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user: { username, avatarUrl, email },
}) => {
  const { isScrollDown } = useScrollContext();
  const { logout } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isScrollDown && open) {
      setOpen(false);
    }
  }, [isScrollDown, open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className="h-8 w-8 hover:scale-110 transition-transform duration-200 ease-out hover:cursor-pointer">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>
            {username
              .split(" ")
              .map((name) => name.charAt(0).toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="p-4 rounded-lg shadow-lg dark:bg-slate-900/50 bg-zinc-200/50 backdrop-blur "
      >
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{username}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </div>

        <Separator className="mt-2" />

        <div className="flex flex-col space-y-2 mt-2">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:scale-[1.03] transition-all duration-150 ease-out"
          >
            <Icon icon="mdi:account" className="mr-2" />
            Profile
          </Link>

          <Link
            href="/credits"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:scale-[1.03] transition-all duration-150 ease-out"
          >
            <Icon icon="mdi:credit-card" className="mr-2" />
            Credits
          </Link>

          <span
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:scale-[1.03] transition-all duration-150 ease-out w-full"
            onClick={() => logout()}
          >
            <Icon icon="mdi:logout" className="mr-2" />
            Log out
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
