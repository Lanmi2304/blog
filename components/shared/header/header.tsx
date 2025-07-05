import { NavigationMenu } from "@/components/ui/navigation-menu";
import { MenuItems } from "./menu-items";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

export async function Header() {
  const data = await auth.api.getSession({ headers: await headers() });
  const user = data?.user;
  return (
    <header className="bg-background/50 fixed top-0 left-[50%] z-50 flex h-20 w-full max-w-4xl px-4 shrink-0 translate-x-[-50%] transform items-center border-b backdrop-blur-md">
      <NavigationMenu className="flex w-full max-w-full justify-start">
        <MenuItems user={user} />
      </NavigationMenu>
    </header>
  );
}
