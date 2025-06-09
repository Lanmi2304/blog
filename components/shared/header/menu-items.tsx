"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation";
import { Rss } from "lucide-react";

export const navItems = [
  { title: "Posts", href: "/" },
  { title: "Login", href: "/login" },
  { title: "Create Account", href: "/create-account" },
];

export function MobileMenuItems() {
  return (
    <div className="mt-6 flex flex-col gap-4 px-4">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className="text-primary text-lg font-semibold"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export function DesktopMenuItems() {
  const scrollToSection = (href: string) => {
    const section = document.getElementById(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <NavigationMenuList className="flex items-center gap-6">
      <Rss className="text-primary size-8" />
      {navItems.map((item) => (
        <NavigationMenuLink key={item.title} asChild>
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
            onClick={() => scrollToSection(item.href)}
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      ))}
    </NavigationMenuList>
  );
}

export function MobileMenu() {
  const pathname = usePathname();
  return (
    <NavigationMenu className="px-4 md:hidden">
      <NavigationMenuList className="space-x-8">
        <Rss className="text-primary size-8" />
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                "group relative inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                "before:bg-primary before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:transition-transform",
                "hover:text-accent-foreground hover:before:scale-x-100",
                "focus:text-accent-foreground focus:outline-none focus:before:scale-x-100",
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100",
              )}
              asChild
              active={item.href === pathname}
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
