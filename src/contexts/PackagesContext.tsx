"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Package } from "~/components/package-card";

async function getRandomPackage() {
  const characters = "abcdefghijklmnopqrstuvwxyz123456789";
  const randomPattern = (length = 2) =>
    Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join("");

  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${randomPattern()}&size=25&quality=0.5&popularity=0.5&maintenance=0.5`,
    );

    const data = await response.json();
    if (!data.objects || data.objects.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * data.objects.length);
    const npmPkg = data.objects[randomIndex].package;
    const weeklyDownloads = data.objects[randomIndex].downloads.weekly;

    const repository = (npmPkg.links?.repository || npmPkg.links?.homepage)
      ?.replace(/\.git$/, "")
      ?.replace("git+https://", "https://")
      ?.replace("git://", "https://");

    return {
      name: npmPkg.name,
      description: npmPkg.description || "No description available",
      version: npmPkg.version,
      weeklyDownloads,
      repository,
      keywords: npmPkg.keywords || [],
      author: npmPkg.author?.name || npmPkg.publisher?.username,
      lastPublish: npmPkg.date,
    } satisfies Package;
  } catch (error) {
    console.error("Failed to fetch package:", error);
    return null;
  }
}

interface PackagesContextType {
  currentPackage: Package | null;
  savedPackages: Package[];
  likePackage: (pkg: Package) => void;
  dislikePackage: () => void;
  removeSavedPackage: (pkgName: string) => void;
  resetPackages: () => void;
  hasMorePackages: boolean;
  remainingCount: number;
  isLoading: boolean;
}

const PackagesContext = createContext<PackagesContextType | null>(null);

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [currentPackages, setCurrentPackages] = useState<Package[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("savedPackages");
    const savedPkgs: Package[] = saved ? JSON.parse(saved) : [];
    setSavedPackages(savedPkgs);

    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const packages = await Promise.all(
          Array.from({ length: 10 }, getRandomPackage),
        );

        const filteredPackages = packages.filter(
          (pkg) =>
            pkg && !savedPkgs.some((savedPkg) => savedPkg.name === pkg.name),
        ) as Package[];

        setCurrentPackages(filteredPackages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setCurrentPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const getCurrentPackage = (): Package | null => {
    if (currentIndex >= currentPackages.length) return null;
    return currentPackages[currentIndex];
  };

  const likePackage = (pkg: Package) => {
    const updatedSaved = [...savedPackages, pkg];
    setSavedPackages(updatedSaved);
    localStorage.setItem("savedPackages", JSON.stringify(updatedSaved));

    const savedPackageNames = new Set(updatedSaved.map((p) => p.name));

    const remainingPackages = currentPackages.filter(
      (p) => !savedPackageNames.has(p.name),
    );

    setCurrentPackages(remainingPackages);
  };

  const dislikePackage = () => setCurrentIndex((prev) => prev + 1);

  const removeSavedPackage = (pkgName: string) => {
    const updated = savedPackages.filter((pkg) => pkg.name !== pkgName);
    setSavedPackages(updated);
    localStorage.setItem("savedPackages", JSON.stringify(updated));
  };

  const resetPackages = () => {
    setCurrentIndex(0);
    setCurrentPackages([]);
    setIsLoading(true);

    const savedPackageNames = new Set(savedPackages.map((p) => p.name));
    const fetchPackages = async () => {
      try {
        const packages = await Promise.all(
          Array.from({ length: 10 }, getRandomPackage),
        );

        const filteredPackages = packages.filter(
          (pkg) => pkg && !savedPackageNames.has(pkg.name),
        ) as Package[];

        setCurrentPackages(filteredPackages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setCurrentPackages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  };

  const hasMorePackages = currentIndex < currentPackages.length;

  const value: PackagesContextType = {
    currentPackage: getCurrentPackage(),
    savedPackages,
    likePackage,
    dislikePackage,
    removeSavedPackage,
    hasMorePackages,
    resetPackages,
    remainingCount: Math.max(0, currentPackages.length - currentIndex),
    isLoading,
  };

  return (
    <PackagesContext.Provider value={value}>
      {children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) {
    throw new Error("usePackages must be used within a PackagesProvider");
  }
  return context;
}
