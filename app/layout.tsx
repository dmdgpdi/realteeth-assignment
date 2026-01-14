import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/app/RootProvider";
import { QueryClientProvider } from "@/shared/libs/@tanstack-query/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather AI",
  description: "AI-powered weather forecast",
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
          <RootProvider>{children}</RootProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
