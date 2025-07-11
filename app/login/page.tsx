import { Rss } from "lucide-react";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:mt-0 md:p-10">
      <div className="mt-20 flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Rss className="size-4" />
          </div>
          Bloger
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
