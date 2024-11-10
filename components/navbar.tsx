"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react"


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold">
              Logo
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/problems">Problems</NavLink>
                <NavLink href="/courses">Courses</NavLink>
                <NavLink href="/interviews">Interviews</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block ml-auto">
            <div className="ml-auto flex  md:ml-6">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="-mr-2 flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && <MobilNav />}
    </nav>
  );
}

function MobilNav() {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink href="/problems" mobile>
          Problems
        </NavLink>
        <NavLink href="/courses" mobile>
          Courses
        </NavLink>
        <NavLink href="/interviews" mobile>
          Interviews
        </NavLink>
      </div>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <UserMenu mobile />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  const baseClasses =
    "text-gray-600 dark:text-gray-200 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium";
  const desktopClasses = "px-3 py-2";
  const mobileClasses = "block px-3 py-2";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="mx-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const { data: session } = useSession(); 
  console.log(session); 

  if (!session) {
    return (
      <Link href="/login" className="block">
        <Button
          variant={mobile ? "ghost" : "default"}
          className={mobile ? "w-full justify-start" : ""}
        >
          Login
        </Button>
      </Link>
    );
  }

  return (
    <div className="mx-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={mobile ? "w-full  justify-start" : ""}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Open user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
