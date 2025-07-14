"use client";

import { usePackages } from "~/contexts/PackagesContext";
import { Card } from "./ui/card";
import {
  IconHeart,
  IconLoader2,
  IconRotate,
  IconSparkles,
} from "@tabler/icons-react";
import { PackageCard } from "./package-card";
import { Button } from "./ui/button";
import Link from "next/link";

export function PackageSwipe() {
  const {
    currentPackage,
    likePackage,
    dislikePackage,
    resetPackages,
    hasMorePackages,
    remainingCount,
    savedPackages,
    isLoading,
  } = usePackages();

  if (isLoading)
    return (
      <Card className="border-border shadow-card p-12 text-center">
        <IconLoader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
        <h2 className="text-2xl font-bold text-foreground">loading...</h2>
        <p className="text-muted-foreground">
          fetching packages, please wait...
        </p>
      </Card>
    );

  return (
    <>
      {hasMorePackages && currentPackage ? (
        <div className="space-y-4">
          <div className="relative">
            <PackageCard
              package={currentPackage}
              onLike={likePackage}
              onDislike={dislikePackage}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {remainingCount} package{remainingCount !== 1 ? "s" : ""}{" "}
              remaining
            </span>
            <span>{savedPackages.length} saved</span>
          </div>
        </div>
      ) : (
        <Card className="border-border shadow-card p-12 text-center">
          <IconSparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">all done!</h2>
          <p className="text-muted-foreground">
            you've swiped through all available packages.
            {savedPackages.length > 0 && (
              <>
                {" "}
                you saved {savedPackages.length} package
                {savedPackages.length !== 1 ? "s" : ""}!
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={resetPackages} className="border-0 font-medium">
              <IconRotate />
              discover more
            </Button>

            {savedPackages.length > 0 && (
              <Button
                asChild
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                <Link href="/saved">
                  <IconHeart />
                  view saved ({savedPackages.length})
                </Link>
              </Button>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
