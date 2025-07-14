"use client";

import { IconHeart, IconPackage } from "@tabler/icons-react";
import Link from "next/link";
import { PackageSwipe } from "~/components/package-swipe";
import { Button } from "~/components/ui/button";
import { usePackages } from "~/contexts/PackagesContext";

export default function Home() {
  const { savedPackages } = usePackages();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-card backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-foreground rounded-lg">
                <IconPackage className="text-card" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">pkgder</h1>
                <p className="text-sm text-muted-foreground">
                  find your next favorite npm package
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                <Link href="/saved">
                  <IconHeart />
                  saved ({savedPackages.length})
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <PackageSwipe />
      </main>
    </div>
  );
}
