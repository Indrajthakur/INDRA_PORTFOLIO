"use client";

import { useEffect, useState } from "react";
import { Menu, Sun, Moon, X } from "lucide-react";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  SheetContent,
} from "./ui/dialog";

type Theme = "dark" | "light";

export function Avatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar.jpg"
      alt=""
      width={size}
      height={size}
      className={cn(
        "shrink-0 bg-card object-cover",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  // RESTORE SAVED THEME

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    const initialTheme =
      savedTheme === "light" ? "light" : "dark";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  // SWITCH THEME

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  // HEADER SCROLL BEHAVIOR

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);

    on();

    window.addEventListener("scroll", on, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[680px] items-center justify-between gap-3 px-5 min-[1100px]:px-6">

        {/* AVATAR */}

        <a
          href="/#hero"
          aria-label="Home"
          className="shrink-0 rounded-xl"
        >
          <Avatar className="rounded-xl ring-2 ring-accent ring-offset-2 ring-offset-bg" />
        </a>

        {/* DESKTOP NAVIGATION */}

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              target={
                n.label === "Resume" ? "_blank" : undefined
              }
              rel={
                n.label === "Resume" ? "noreferrer" : undefined
              }
              className="whitespace-nowrap rounded-md px-2.5 py-2.5 text-sm font-medium text-body transition-colors duration-200 hover:text-head"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">

          {/* THEME SWITCH */}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              theme === "dark"
                ? "Light mode"
                : "Dark mode"
            }
            className="rounded-full transition-all duration-300 hover:rotate-12 hover:text-accent"
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </Button>

          {/* MOBILE MENU */}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="md:hidden"
              >
                <Menu size={20} />
              </Button>
            </DialogTrigger>

            <SheetContent>
              <div className="mb-6 flex items-center justify-between">
                <DialogTitle className="eyebrow">
                  Menu
                </DialogTitle>

                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </Button>
                </DialogClose>
              </div>

              <nav className="flex flex-col">
                {nav.map((n) => (
                  <a
                    key={n.label}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    target={
                      n.label === "Resume" ? "_blank" : undefined
                    }
                    rel={
                      n.label === "Resume" ? "noreferrer" : undefined
                    }
                    className="flex min-h-12 items-center border-b border-line text-base text-head transition-colors hover:text-accent"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Dialog>

        </div>
      </div>
    </header>
  );
}