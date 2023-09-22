import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Fold AI",
  description: "Page Fold is a AI course genarator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "antialiased min-h-screen pt-16")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
