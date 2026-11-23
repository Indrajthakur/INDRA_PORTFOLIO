
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Mail } from "lucide-react";
import { Section } from "../layout-bits";
import { Item } from "../reveal";
import { Avatar } from "../header";
import { BrandIcon } from "../brand-icon";
import { Button } from "../ui/button";
import { LiveBanner } from "../live-banner";
import { OPEN_PALETTE } from "../command-palette";
import { heroChips, profile } from "@/lib/data";

function Chip({ label, brand }: (typeof heroChips)[number]) {
  return (
    <span className="mx-0.5 inline-flex h-6 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 align-middle text-[13px] text-head">
      <BrandIcon name={brand} size={12} />
      {label}
    </span>
  );
}

export function SocialRow() {
  return (
    <div className="flex items-center">
      {profile.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-150 hover:text-white sm:size-11"
        >
          {s.brand ? (
            <BrandIcon name={s.brand} size={18} mono />
          ) : (
            <Mail size={18} />
          )}
        </a>
      ))}
    </div>
  );
}

export function Hero() {
  const [spin, setSpin] = useState(0);

  return (
    <Section id="hero" first>
      <div>
        {/* BANNER */}

        <Item>
          <LiveBanner />
        </Item>

        {/* AVATAR */}

        <Item className="relative -mt-10 px-4 sm:-mt-14 sm:px-6">
          <div className="relative w-fit">
            <span
              aria-hidden
              className="pointer-events-none absolute right-full top-8 mr-3 hidden w-36 -rotate-6 select-none items-center gap-1 text-right text-[15px] text-dim min-[1100px]:flex"
              style={{
                fontFamily:
                  "'Bradley Hand','Segoe Script','Comic Sans MS',cursive",
              }}
            >
              psst, click me

              <svg
                width="38"
                height="22"
                viewBox="0 0 38 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 16c10-14 22-14 32-4M34 12l-6-1M34 12l-2 6" />
              </svg>
            </span>

            <motion.button
              onClick={() => setSpin((s) => s + 360)}
              animate={{ rotate: spin }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              aria-label="Say hi"
              className="block rounded-full"
            >
              {/* Mobile Avatar */}

              <span className="block sm:hidden">
                <Avatar
                  size={80}
                  className="rounded-full border-4 border-bg text-xl"
                />
              </span>

              {/* Desktop Avatar */}

              <span className="hidden sm:block">
                <Avatar
                  size={112}
                  className="rounded-full border-4 border-bg text-3xl"
                />
              </span>
            </motion.button>
          </div>
        </Item>

        {/* NAME AND ROLE */}

        <Item className="mt-6 px-1">
          <h1 className="text-[26px] font-semibold leading-[1.2] tracking-tight text-head sm:text-[40px]">
            Hi, I&apos;m{" "}
            <span className="underline decoration-accent decoration-[3px] underline-offset-[6px]">
              {profile.name}
            </span>
          </h1>

          <p className="text-[26px] font-semibold leading-[1.2] tracking-tight text-muted sm:text-[40px]">
            {profile.role}
          </p>
        </Item>

        {/* DESCRIPTION */}

        <Item className="mt-6 px-1">
          <p className="text-[15px] leading-8 text-body">
            I build modern, interactive web applications using{" "}
            {heroChips.slice(0, 4).map((c) => (
              <Chip key={c.label} {...c} />
            ))}{" "}
            and <Chip {...heroChips[4]} />, with a strong
            emphasis on clean UI, performance and user
            experience.
          </p>
        </Item>

        {/* RESUME AND CONTACT BUTTONS */}

        <Item className="mt-8 flex flex-row flex-wrap items-center gap-3 px-1">
          <Button asChild variant="default">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={16} />
              Resume / CV
            </a>
          </Button>

          <Button asChild variant="outline">
            <a href="mailto:indrajthakur08@gmail.com">
              <Send size={16} />
              Get in touch
            </a>
          </Button>
        </Item>

        {/* SOCIAL ICONS AND COMMAND PALETTE */}

        <Item className="mt-6 flex items-center justify-between gap-2 px-1">
          <SocialRow />

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event(OPEN_PALETTE))
            }
            aria-label="Open command palette"
            className="flex min-h-9 shrink-0 items-center rounded-md px-1"
          >
            <kbd className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-label">
              Ctrl K
            </kbd>
          </button>
        </Item>
      </div>
    </Section>
  );
}
