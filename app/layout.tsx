import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Header } from "@/components/shared/header/header";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogger",
  description:
    "Blogger is a blogging platform built with Next.js, Drizzle ORM, and BetterAuth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Shadcn component bug prevent */}
        <div className="w-full overflow-x-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <Header />
              {children}
            </NuqsAdapter>

            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
