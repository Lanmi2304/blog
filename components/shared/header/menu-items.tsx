"use client";

import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { LockIcon, LogOutIcon, Plus, Rss, UserIcon } from "lucide-react";
// import { createAuthClient } from "better-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";
export const navItems = [
  { title: "Posts", href: "/" },
  { title: "Login", href: "/login" },
  { title: "Sign Up", href: "/sign-up" },
];

export function MenuItems({ user }: { user?: User }) {
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setTimeout(() => router.refresh(), 500);
        },
      },
    });
  };

  return (
    <NavigationMenuList className="flex w-full items-center justify-start gap-6">
      <Rss className="text-primary size-8" />
      {!user ? (
        navItems.map((item) => (
          <NavigationMenuLink
            className="w-full"
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
        ))
      ) : (
        <div className="flex w-full items-center justify-between">
          <NavigationMenuLink asChild active={"/" === pathname}>
            <Link
              href="/"
              className={cn(
                "group relative inline-flex h-9 w-max cursor-pointer items-center justify-center px-0.5 py-2 text-sm font-medium",
                "before:bg-primary before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:transition-transform",
                "hover:text-accent-foreground hover:before:scale-x-100",
                "focus:text-accent-foreground focus:outline-none focus:before:scale-x-100",
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100",
              )}
            >
              Posts
            </Link>
          </NavigationMenuLink>

          <div className="flex items-center gap-4">
            <Button asChild className="cursor-pointer rounded-full">
              <Link href="/add-blog" className="flex items-center">
                <Plus />
                <span>Blog</span>
              </Link>
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer rounded-full"
                >
                  {user?.image && (
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image} alt="User avatar" />
                      <AvatarFallback>{user?.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  )}

                  {!user?.image && (
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="/images/avatar-placeholder.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>{user?.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-foreground w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LockIcon />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="text-destructive"
                >
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </NavigationMenuList>
  );
}
