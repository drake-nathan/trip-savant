"use client";

import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle the dark class on the document
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-sans text-2xl font-bold text-slate-800">
              Trip Savant
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              className="border-b-2 border-amber-600 pb-1 font-medium text-amber-600"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="font-medium text-slate-600 transition-colors hover:text-amber-600"
              href="/trips"
            >
              My Trips
            </a>
            <a
              className="font-medium text-slate-600 transition-colors hover:text-amber-600"
              href="/profile"
            >
              Profile
            </a>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              className="text-slate-600 hover:text-slate-800"
              onClick={toggleDarkMode}
              size="sm"
              variant="ghost"
            >
              {isDarkMode ?
                <Sun className="h-5 w-5" />
              : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative h-10 w-10 rounded-full"
                  variant="ghost"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="User" src="/professional-headshot.png" />
                    <AvatarFallback className="bg-amber-100 text-amber-800">
                      JS
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">John Smith</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
