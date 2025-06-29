import {
  Home,
  Keyboard,
  Package,
  Cpu,
  Wrench,
  ShoppingCart,
  Users,
  MessageCircle,
} from "lucide-react";
import { Role } from "../enums/role";

export interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: Role[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface IndicatorStyle {
  top: number;
  height: number;
}

export const navSections: NavSection[] = [
  {
    title: "Store",
    items: [
      {
        href: "/dashboard",
        icon: Home,
        label: "Dashboard",
        roles: [Role.ADMIN],
      },
      {
        href: "/dashboard/keyboards",
        icon: Keyboard,
        label: "Keyboards",
        roles: [Role.ADMIN, Role.STAFF],
      },
      {
        href: "/dashboard/keycaps",
        icon: Package,
        label: "Keycaps",
        roles: [Role.ADMIN, Role.STAFF],
      },
      {
        href: "/dashboard/switches",
        icon: Cpu,
        label: "Switches",
        roles: [Role.ADMIN, Role.STAFF],
      },
      {
        href: "/dashboard/accessories",
        icon: Wrench,
        label: "Accessories",
        roles: [Role.ADMIN, Role.STAFF],
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        href: "/dashboard/orders",
        icon: ShoppingCart,
        label: "Orders",
        roles: [Role.ADMIN, Role.STAFF],
      },
      {
        href: "/dashboard/customers",
        icon: Users,
        label: "Customers",
        roles: [Role.ADMIN, Role.STAFF],
      },
      {
        href: "/dashboard/chat-support",
        icon: MessageCircle,
        label: "Chat Support",
        roles: [Role.ADMIN, Role.STAFF],
      },
    ],
  },
];

export const currentUser = {
  name: "Jane Cooper",
  role: "Admin",
  initials: "JC",
  avatar: "/placeholder.svg?height=32&width=32",
};
