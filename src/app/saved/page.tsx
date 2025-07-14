"use client";

import { usePackages } from "~/contexts/PackagesContext";
import { Package, PackageCardDetails } from "~/components/package-card";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  IconExternalLink,
  IconHeart,
  IconPackage,
  IconTerminal,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";
import Link from "next/link";

export default function SavedPackages() {
  const { savedPackages, removeSavedPackage } = usePackages();

  const handleRemoveSavedPackage = (pkgName: string) => {
    removeSavedPackage(pkgName);
  };

  const copyInstallCommand = (pkgName: string) => {
    navigator.clipboard.writeText(`npm install ${pkgName}`);
    toast(`npm install ${pkgName} copied`, {
      icon: <IconTerminal className="w-4 h-4" />,
      duration: 2000,
    });
  };

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
        {savedPackages.length === 0 ? (
          <Card className="border-border shadow-card p-12 text-center">
            <IconHeart className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              no saved packages yet
            </h2>
            <p className="text-muted-foreground">
              start swiping to discover and save packages you love!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="border-0 font-medium">
                <Link href="/">start discovering</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {savedPackages.map((pkg) => (
              <Card
                key={pkg.name}
                className="border-border flex flex-col h-full"
              >
                <div className="px-6 flex-1 space-y-4">
                  <PackageCardDetails package={pkg} />
                </div>

                <div className="px-6 flex gap-2">
                  <Button
                    onClick={() => copyInstallCommand(pkg.name)}
                    size="icon"
                    className="flex-1 text-xs"
                    variant="outline"
                  >
                    npm install
                  </Button>

                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="border-border hover:bg-secondary"
                  >
                    <Link
                      href={`https://npmjs.org/package/${pkg.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconExternalLink className="w-3 h-3" />
                    </Link>
                  </Button>

                  <Button
                    onClick={() => handleRemoveSavedPackage(pkg.name)}
                    size="icon"
                    variant="outline"
                    className="text-destructive"
                  >
                    <IconTrash className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
