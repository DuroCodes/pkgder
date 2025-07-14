import "./globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import { PackagesProvider } from "~/contexts/PackagesContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pkgder",
  description: "find your next favorite npm package",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased font-mono`}>
        <PackagesProvider>
          {children}
          <Toaster />
        </PackagesProvider>
      </body>
    </html>
  );
}
