import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FamiLynk",
  description: "Next.js aplikacja hakhiros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
