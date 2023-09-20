import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Fold",
  description: "Page Fold is a AI course genarator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
