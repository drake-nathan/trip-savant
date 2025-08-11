import { Menu, Mountain } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <div className="mr-4 hidden md:flex">
        <Link className="mr-6 flex items-center space-x-2" href="/">
          <Mountain className="h-6 w-6" />
          <span className="font-bold">Trip Savant</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="ghost">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Mountain className="h-6 w-6" />
            <span className="font-bold">Trip Savant</span>
          </Link>
          <div className="mt-6 flex flex-col gap-4">
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <ModeToggle />
        <Button asChild variant="secondary">
          <Link href="/dashboard">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Sign Up</Link>
        </Button>
      </div>
    </div>
  </header>
);
