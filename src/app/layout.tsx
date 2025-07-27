import "./globals.css";
import type { Metadata, Viewport } from "next";
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
  openGraph: { images: "/banner.png" },
  twitter: { card: "summary_large_image", images: "/banner.png" },
};

export const viewport: Viewport = { themeColor: "#0A0A0A" };

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
