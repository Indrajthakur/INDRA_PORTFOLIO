"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type IndexItem = { id: string; label: string };

export function IndexRail() {
  const [indexItems, setIndexItems] = useState<IndexItem[]>([]);
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout: number;
    let frame: number | null = null;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    ).map((element) => ({
      id: element.id,
      label:
        element.querySelector("h1, h2, h3")?.textContent?.trim() ||
        element.id,
    }));

    setIndexItems(items);

    const updateActive = () => {
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const element = document.getElementById(item.id);

        if (
          element &&
          element.getBoundingClientRect().top <=
            window.innerHeight * 0.35
        ) {
          current = item.id;
        }
      }

      setActive(current);
    };

    const showIndex = () => {
      setVisible(true);

      window.clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        setVisible(false);
      }, 2000);
    };

    const onScroll = () => {
      showIndex();

      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        updateActive();
        frame = null;
      });
    };

    updateActive();
    showIndex();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
      window.clearTimeout(timeout);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <aside
      aria-label="Page index"
      className="pointer-events-none fixed right-0 top-1/2 z-40 hidden w-[calc((100%-680px)/2)] -translate-y-1/2 min-[1100px]:block"
    >
      <nav
        className={cn(
          "pointer-events-auto ml-8 w-36 border-r border-line pr-4",
          "transition-all duration-500 ease-out",
          "hover:translate-x-0 hover:opacity-100",
          "focus-within:translate-x-0 focus-within:opacity-100",
          "motion-reduce:transition-none",
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-3 opacity-0"
        )}
      >
        {/* Index heading */}
        <p className="eyebrow mb-5 text-right tracking-[0.2em]">
          Index
        </p>

        {/* Navigation items */}
        <ul className="space-y-1">
          {indexItems.map((item) => {
            const isActive = item.id === active;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  className={cn(
                    "group flex min-h-9 items-center justify-end gap-3 text-sm",
                    "transition-all duration-300 ease-out",
                    "motion-reduce:transition-none",
                    isActive
                      ? "font-semibold text-head"
                      : "text-dim hover:text-head"
                  )}
                >
                  <span>{item.label}</span>

                  {/* Animated active indicator */}
                  <span
                    aria-hidden
                    className={cn(
                      "h-[2px] origin-right rounded-full bg-accent",
                      "transition-all duration-300 ease-out",
                      isActive
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}