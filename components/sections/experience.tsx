"use client";

import * as A from "@radix-ui/react-accordion";
import {
  ChevronDown,
  GraduationCap,
  Code2,
  Layers,
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { Card, Section } from "../layout-bits";
import { Item } from "../reveal";

const experience = [
  {
    dates: "2024 — Present",
    tag: "Education",
    role: "Computer Science Student",
    company: "University",
    subtitle: "Software Engineering & Development",
    hue: 210,
    bullets: [
      "Studying computer science fundamentals and software engineering practices.",
      "Building projects across frontend, backend, and full-stack development.",
    ],
  },
];

const icons = [
  GraduationCap,
  Code2,
  Layers,
  Terminal,
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="THE JOURNEY SO FAR"
      title="Experience & Impact"
    >
      <Item>
        <p className="mb-8 text-sm leading-6 text-muted">
          Learning, building and evolving — one project at a time.
        </p>

        <A.Root
          type="single"
          collapsible
          defaultValue="e0"
          className="relative space-y-5"
        >
          {/* Timeline line */}
          <div
            aria-hidden
            className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-accent via-line to-transparent"
          />

          {experience.map((e, i) => {
            const Icon = icons[i] ?? Code2;

            return (
              <A.Item
                key={i}
                value={`e${i}`}
                className="group/item relative pl-14"
              >
                {/* Timeline icon */}
                <div
                  className="absolute left-0 top-5 grid size-10 place-items-center rounded-xl border border-white/10 text-white transition-all duration-300 group-data-[state=open]/item:scale-110"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      hsl(${e.hue} 55% 32%),
                      hsl(${e.hue + 40} 40% 12%)
                    )`,
                  }}
                >
                  <Icon size={18} />
                </div>

                {/* Experience card */}
                <Card className="overflow-hidden transition-all duration-300 hover:border-accent/30 group-data-[state=open]/item:border-accent/40">
                  <A.Header>
                    <A.Trigger
                      id={`experience-trigger-${i}`}
                      aria-controls={`experience-content-${i}`}
                      className="group flex w-full items-start gap-4 p-5 text-left transition-colors duration-300 hover:bg-accent/[0.02]"
                    >
                      <div className="min-w-0 flex-1 space-y-2">

                        {/* Date and category */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] text-accent">
                            {e.dates}
                          </span>

                          <span className="rounded-full border border-line bg-bg px-2.5 py-1 text-[10px] font-medium text-muted">
                            {e.tag}
                          </span>
                        </div>

                        {/* Role */}
                        <h3 className="text-base font-semibold leading-snug text-head">
                          {e.role}
                        </h3>

                        {/* Organization */}
                        <p className="flex items-center gap-1 text-[13px] leading-5 text-body">
                          {e.company}
                          <ArrowUpRight
                            size={13}
                            className="shrink-0 text-muted"
                            aria-hidden
                          />
                        </p>

                        {/* Technologies and subtitle */}
                        <p className="text-[12px] leading-5 text-muted">
                          {e.subtitle}
                        </p>
                      </div>

                      {/* Expand button */}
                      <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-bg transition-colors group-hover:border-accent/40">
                        <ChevronDown
                          size={16}
                          className="text-muted transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent"
                          aria-hidden
                        />
                      </span>
                    </A.Trigger>
                  </A.Header>

                  {/* Expanded details */}
                  <A.Content
                    id={`experience-content-${i}`}
                    aria-labelledby={`experience-trigger-${i}`}
                    className="acc overflow-hidden"
                  >
                    <div className="mx-5 border-t border-line pb-5 pt-4">
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-accent">
                        Focus & Contributions
                      </p>

                      <ul className="space-y-3">
                        {e.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-[13px] leading-6 text-body"
                          >
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />

                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </A.Content>
                </Card>
              </A.Item>
            );
          })}
        </A.Root>
      </Item>
    </Section>
  );
}