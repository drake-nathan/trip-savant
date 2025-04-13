"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, PlaneTakeoff, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", path: "/" },
    { name: "My Trips", path: "/trips" },
    { name: "Create Trip", path: "/trips/new" },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link className="flex items-center gap-2" href="/">
            <PlaneTakeoff className="h-6 w-6" />
            <span className="hidden text-xl font-bold sm:inline-block">
              Travel Savant
            </span>
          </Link>
          <nav className="ml-6 hidden items-center gap-6 md:flex">
            {routes.map((route) => (
              <Link
                className={cn(
                  "hover:text-primary text-sm font-medium transition-colors",
                  pathname === route.path ?
                    "text-primary"
                  : "text-muted-foreground",
                )}
                href={route.path}
                key={route.path}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" variant="outline">
            Login
          </Button>
          <Button
            className="md:hidden"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            size="icon"
            variant="ghost"
          >
            {isMenuOpen ?
              <X className="h-5 w-5" />
            : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isMenuOpen ?
        <div className="container py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                className={cn(
                  "hover:text-primary p-2 text-sm font-medium transition-colors",
                  pathname === route.path ?
                    "text-primary bg-muted rounded-md"
                  : "text-muted-foreground",
                )}
                href={route.path}
                key={route.path}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      : null}
    </header>
  );
};
