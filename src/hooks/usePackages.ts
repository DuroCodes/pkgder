"use client";

import { useState, useEffect } from "react";
import { Package } from "~/components/package-card";

const SAMPLE_PACKAGES: Package[] = [
  {
    name: "react",
    description: "React is a JavaScript library for building user interfaces",
    version: "18.2.0",
    weeklyDownloads: 20500000,
    repository: "https://github.com/facebook/react",
    keywords: ["react", "ui", "javascript", "library"],
    author: "Facebook",
    lastPublish: "2023-06-15",
    stars: 218000,
  },
  {
    name: "lodash",
    description:
      "A modern JavaScript utility library delivering modularity, performance, & extras.",
    version: "4.17.21",
    weeklyDownloads: 32000000,
    repository: "https://github.com/lodash/lodash",
    keywords: ["lodash", "utility", "functional", "programming"],
    author: "John-David Dalton",
    lastPublish: "2021-02-20",
    stars: 58900,
  },
  {
    name: "express",
    description: "Fast, unopinionated, minimalist web framework for node.",
    version: "4.18.2",
    weeklyDownloads: 25000000,
    repository: "https://github.com/expressjs/express",
    keywords: [
      "express",
      "framework",
      "sinatra",
      "web",
      "rest",
      "restful",
      "router",
      "app",
      "api",
    ],
    author: "TJ Holowaychuk",
    lastPublish: "2022-10-08",
    stars: 63500,
  },
  {
    name: "typescript",
    description:
      "TypeScript is a language for application scale JavaScript development",
    version: "4.9.5",
    weeklyDownloads: 26000000,
    repository: "https://github.com/Microsoft/TypeScript",
    keywords: ["typescript", "language", "javascript"],
    author: "Microsoft",
    lastPublish: "2023-01-17",
    stars: 95800,
  },
  {
    name: "axios",
    description: "Promise based HTTP client for the browser and node.js",
    version: "1.3.4",
    weeklyDownloads: 45000000,
    repository: "https://github.com/axios/axios",
    keywords: ["xhr", "http", "ajax", "promise", "node"],
    author: "Matt Zabriskie",
    lastPublish: "2023-02-23",
    stars: 103000,
  },
  {
    name: "moment",
    description: "Parse, validate, manipulate, and display dates",
    version: "2.29.4",
    weeklyDownloads: 15000000,
    repository: "https://github.com/moment/moment",
    keywords: [
      "moment",
      "date",
      "time",
      "parse",
      "format",
      "validate",
      "i18n",
      "l10n",
    ],
    author: "Iskren Ivov Chernev",
    lastPublish: "2022-07-06",
    stars: 47400,
  },
  {
    name: "next",
    description: "The React Framework",
    version: "13.2.3",
    weeklyDownloads: 5600000,
    repository: "https://github.com/vercel/next.js",
    keywords: ["react", "next", "framework", "ssr", "static"],
    author: "Vercel",
    lastPublish: "2023-03-07",
    stars: 112000,
  },
  {
    name: "prettier",
    description: "Prettier is an opinionated code formatter",
    version: "2.8.4",
    weeklyDownloads: 27000000,
    repository: "https://github.com/prettier/prettier",
    keywords: [
      "formatter",
      "javascript",
      "css",
      "less",
      "scss",
      "typescript",
      "json",
      "markdown",
    ],
    author: "James Long",
    lastPublish: "2023-01-25",
    stars: 47600,
  },
  {
    name: "tailwindcss",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces.",
    version: "3.2.7",
    weeklyDownloads: 4800000,
    repository: "https://github.com/tailwindlabs/tailwindcss",
    keywords: ["css", "tailwind", "utility", "framework"],
    author: "Adam Wathan",
    lastPublish: "2023-02-16",
    stars: 75400,
  },
  {
    name: "vue",
    description: "The progressive JavaScript framework",
    version: "3.2.47",
    weeklyDownloads: 4200000,
    repository: "https://github.com/vuejs/core",
    keywords: ["vue", "framework", "frontend"],
    author: "Evan You",
    lastPublish: "2023-02-14",
    stars: 42600,
  },
  {
    name: "webpack",
    description:
      "Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand.",
    version: "5.76.2",
    weeklyDownloads: 18000000,
    repository: "https://github.com/webpack/webpack",
    keywords: ["webpack", "build", "tool", "bundler"],
    author: "Tobias Koppers",
    lastPublish: "2023-02-26",
    stars: 64100,
  },
  {
    name: "eslint",
    description: "An AST-based pattern checker for JavaScript.",
    version: "8.36.0",
    weeklyDownloads: 29000000,
    repository: "https://github.com/eslint/eslint",
    keywords: ["ast", "lint", "linter", "eslint", "ecmascript", "javascript"],
    author: "Nicholas C. Zakas",
    lastPublish: "2023-03-03",
    stars: 23700,
  },
  {
    name: "socket.io",
    description: "node.js realtime framework server",
    version: "4.6.1",
    weeklyDownloads: 3100000,
    repository: "https://github.com/socketio/socket.io",
    keywords: [
      "realtime",
      "framework",
      "websocket",
      "tcp",
      "events",
      "socket",
      "io",
    ],
    author: "Guillermo Rauch",
    lastPublish: "2023-02-20",
    stars: 59800,
  },
  {
    name: "joi",
    description: "Object schema validation",
    version: "17.8.3",
    weeklyDownloads: 5600000,
    repository: "https://github.com/sideway/joi",
    keywords: ["hapi", "joi", "travelogue", "validation", "schema", "express"],
    author: "Sideway Inc",
    lastPublish: "2023-02-11",
    stars: 20000,
  },
  {
    name: "vite",
    description: "Native-ESM powered web dev build tool",
    version: "4.1.4",
    weeklyDownloads: 8900000,
    repository: "https://github.com/vitejs/vite",
    keywords: ["frontend", "hmr", "dev-server", "build-tool", "vite"],
    author: "Evan You",
    lastPublish: "2023-02-28",
    stars: 61500,
  },
];

async function getRandomPackage() {
  const totalRes = await fetch(
    "https://api.npms.io/v2/search?q=quality:high&size=1",
  );
  const totalJson = await totalRes.json();
  const total = totalJson.total;

  const from = Math.floor(Math.random() * total);
  const pkgRes = await fetch(
    `https://api.npms.io/v2/search?size=1&from=${from}&q=quality:high`,
  );
  const pkgJson = await pkgRes.json();
  if (!pkgJson.results.length) return null;

  const npmPkg = pkgJson.results[0].package;

  const downloadsRes = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${npmPkg.name}`,
  );
  const downloadsJson = await downloadsRes.json();
  const weeklyDownloads = downloadsJson.downloads || 0;

  return {
    name: npmPkg.name,
    description: npmPkg.description,
    version: npmPkg.version,
    weeklyDownloads,
    repository: npmPkg.links?.repository || npmPkg.links?.homepage,
    keywords: npmPkg.keywords,
    author: npmPkg.author?.name || npmPkg.publisher?.username,
    lastPublish: npmPkg.date,
    stars: undefined,
  } satisfies Package;
}

// const getRandomPackage = async () => {
//   let max = 0;

//   const fetchMax = async () => {
//     if (max) return max;

//     const data = (await (
//       await fetch("https://api.npms.io/v2/search?q=quality:high&size=1")
//     ).json()) as { total: number };

//     max = data.total;
//     return max;
//   };

//   return async () =>

//   // max shouldn't be called every time the function is called, just once
//   // the max can be calced from https://api.npms.io/v2/search?q=quality:high&size=1 and then getting "total"
//   // the max can be stored in a constant or fetched once and stored in state

//   // https://api.npms.io/v2/search?q=quality:high&size=1
//   // const api = "https://api.npms.io/v2/search?size=1&from=<random number below max>&q=quality:high";
// };

export const usePackages = () => {
  const [currentPackages, setCurrentPackages] = useState<Package[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("savedPackages");
    const savedPkgs = saved ? JSON.parse(saved) : [];
    setSavedPackages(savedPkgs);

    // const savedPackageNames = new Set(
    //   savedPkgs.map((pkg: Package) => pkg.name),
    // );

    // const availablePackages = SAMPLE_PACKAGES.filter(
    //   (pkg) => !savedPackageNames.has(pkg.name),
    // );

    // const shuffled = [...availablePackages].sort(() => Math.random() - 0.5);
    // setCurrentPackages(shuffled);

    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const packages = await Promise.all(
          Array.from({ length: 10 }, getRandomPackage),
        );
        setCurrentPackages(packages.filter(Boolean) as Package[]);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setCurrentPackages(SAMPLE_PACKAGES);
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

  const resetPackages = () => {
    const savedPackageNames = new Set(savedPackages.map((pkg) => pkg.name));
    const availablePackages = SAMPLE_PACKAGES.filter(
      (pkg) => !savedPackageNames.has(pkg.name),
    );

    const shuffled = [...availablePackages].sort(() => Math.random() - 0.5);
    setCurrentPackages(shuffled);
    setCurrentIndex(0);
  };

  const hasMorePackages = currentIndex < currentPackages.length;

  return {
    currentPackage: getCurrentPackage(),
    savedPackages,
    likePackage,
    dislikePackage,
    resetPackages,
    hasMorePackages,
    remainingCount: Math.max(0, currentPackages.length - currentIndex),
    isLoading,
  };
};
