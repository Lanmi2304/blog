import { DesktopMenuItems, MobileMenu } from "./menu-items";
import { NavigationMenu } from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="bg-background/50 border-foreground/10 fixed top-0 left-[50%] z-50 flex h-20 w-full max-w-4xl shrink-0 translate-x-[-50%] transform items-center border-b backdrop-blur-md md:px-6">
      <MobileMenu />

      <NavigationMenu className="hidden lg:flex">
        <DesktopMenuItems />
      </NavigationMenu>
    </header>
  );
}
