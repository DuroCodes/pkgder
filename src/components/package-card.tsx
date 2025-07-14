import { useState } from "react";
import {
  IconHeart,
  IconX,
  IconDownload,
  IconCalendar,
  IconExternalLink,
} from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn, formatDate, formatNumber } from "~/lib/utils";
import { Badge } from "./ui/badge";
import Link from "next/link";

export interface Package {
  name: string;
  description: string;
  version: string;
  weeklyDownloads: number;
  repository?: string;
  keywords?: string[];
  author?: string;
  lastPublish?: string;
}

interface PackageCardProps {
  package: Package;
  onLike: (pkg: Package) => void;
  onDislike: (pkg: Package) => void;
  className?: string;
}

export function PackageCardDetails({ package: pkg }: { package: Package }) {
  return (
    <>
      <div>
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-foreground break-all">
            {pkg.name}
          </h2>
          <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
            v{pkg.version}
          </span>
        </div>

        {pkg.author && (
          <p className="text-sm text-muted-foreground">
            by <span className="font-medium">{pkg.author}</span>
          </p>
        )}
      </div>

      <p className="text-sm text-foreground leading-relaxed line-clamp-3">
        {pkg.description}
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <IconDownload className="w-3 h-3" />
            {formatNumber(pkg.weeklyDownloads)}/week
          </Badge>

          {pkg.lastPublish && (
            <Badge variant="outline">
              <IconCalendar className="w-3 h-3" />
              {formatDate(pkg.lastPublish)}
            </Badge>
          )}
        </div>

        {pkg.keywords && pkg.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pkg.keywords.slice(0, 3).map((keyword, index) => (
              <Link
                href={`https://github.com/topics/${encodeURIComponent(
                  keyword,
                )}`}
                key={index}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20"
              >
                {keyword}
              </Link>
            ))}
            {pkg.keywords.length > 3 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{pkg.keywords.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export function PackageCard({
  package: pkg,
  onLike,
  onDislike,
  className,
}: PackageCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    onLike(pkg);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDislike = () => {
    setIsAnimating(true);
    onDislike(pkg);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Card className={cn(isAnimating && "pointer-events-none", className)}>
      <div className="px-6 space-y-4">
        <PackageCardDetails package={pkg} />

        <Link
          href={`https://www.npmjs.com/package/${pkg.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mr-4"
        >
          <IconExternalLink className="w-3 h-3" />
          view on npm
        </Link>

        {pkg.repository && (
          <Link
            href={pkg.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <IconExternalLink className="w-3 h-3" />
            view repository
          </Link>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleLike}
            className="flex-1"
            disabled={isAnimating}
          >
            <IconHeart />
            like
          </Button>

          <Button
            onClick={handleDislike}
            className="flex-1"
            variant="destructive"
            disabled={isAnimating}
          >
            <IconX />
            pass
          </Button>
        </div>
      </div>
    </Card>
  );
}
