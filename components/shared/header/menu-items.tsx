"use client";

import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation";
import { Rss } from "lucide-react";

export const navItems = [
  { title: "Posts", href: "/" },
  // TODO: Temp Link
  { title: "Add Blog", href: "/add-blog" },
  { title: "Login", href: "/login" },
  { title: "Sign Up", href: "/sign-up" },
];

export function MenuItems() {
  const pathname = usePathname();

  return (
    <NavigationMenuList className="flex items-center gap-6 px-4">
      <Rss className="text-primary size-8" />
      {navItems.map((item) => (
        <NavigationMenuLink
          key={item.title}
          asChild
          active={item.href === pathname}
        >
          <Link
            href={item.href}
            className={cn(
              "group relative inline-flex h-9 w-max cursor-pointer items-center justify-center px-0.5 py-2 text-sm font-medium",
              "before:bg-primary before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:transition-transform",
              "hover:text-accent-foreground hover:before:scale-x-100",
              "focus:text-accent-foreground focus:outline-none focus:before:scale-x-100",
              "disabled:pointer-events-none disabled:opacity-50",
              "data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100",
            )}
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      ))}
    </NavigationMenuList>
  );
}
