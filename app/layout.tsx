import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { RootProvider } from "@/app/RootProvider";
import { QueryClientProvider } from "@/shared/libs/@tanstack-query/QueryClientProvider";
import { SearchLinkIcon } from "@/shared/ui/SearchLinkIcon";
import { Toaster } from "@/shared/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "날씨 정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryClientProvider>
          <RootProvider>
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="container flex h-14 items-center max-w-4xl mx-auto px-8 justify-between">
                <Link href="/">
                  <h1 className="text-xl font-bold tracking-tight">🌤️ 날씨</h1>
                </Link>
                <SearchLinkIcon />
              </div>
            </header>
            <div className="min-h-screen bg-background text-foreground pb-20">
              {children}
            </div>
            <Toaster />
          </RootProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
