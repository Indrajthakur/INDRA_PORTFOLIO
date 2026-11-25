"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronUp,
  Globe,
} from "lucide-react";
import { Placeholder, Section } from "../layout-bits";
import { BrandIcon } from "../brand-icon";
import type { BrandKey } from "@/lib/brand";
import { projects } from "@/lib/data";

const techIcons: Record<string, BrandKey> = {
  HTML5: "html5",
  CSS: "css",
  CSS3: "css",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  "Express.js": "express",
  PostgreSQL: "postgresql",
  JWT: "jwt",
  MongoDB: "mongodb",
  "Tailwind CSS": "tailwind",
  Supabase: "supabase",
  Vite: "vite",
  "C++": "cplusplus",
  Render: "render",
  Vercel: "vercel",
  Postman: "postman",
  Docker: "docker",
};

export function Projects() {
  const [showAll, setShowAll] = useState(false);

  const orderedProjects = [
    ...projects.filter((p) => p.image),
    ...projects.filter((p) => !p.image),
  ];

  const visibleProjects = showAll
    ? orderedProjects
    : orderedProjects.slice(0, 4);

  return (
    <Section
      id="projects"
      eyebrow="Featured"
      title="Projects"
    >
      <div
        id="project-grid"
        className="grid gap-5 sm:grid-cols-2"
      >
        {visibleProjects.map((p) => (
          <article
            key={p.title}
            className="group flex h-full flex-col rounded-[28px] border border-line bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 motion-reduce:hover:translate-y-0"
          >
            {/* PROJECT IMAGE */}

            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, 340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                />
              ) : (
                <Placeholder
                  hue={p.hue}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-sm font-semibold text-white/60">
                      {p.title}
                    </span>
                  </div>
                </Placeholder>
              )}
            </div>

            {/* PROJECT DETAILS */}

            <div className="mt-4 flex flex-1 flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-head">
                  {p.title}
                </h3>

                {p.live && p.liveUrl && (
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-live">
                    <span className="size-1.5 rounded-full bg-live" />
                    Live
                  </span>
                )}
              </div>

              <p className="mt-1 text-[12px] text-muted">
                {p.subtitle}
              </p>

              {/* DESCRIPTION */}

              <p
                className="mt-3 line-clamp-2 text-[13px] leading-6 text-body"
                title={p.description}
              >
                {p.description}
              </p>

              {/* TECH STACK & LINKS */}

              <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  {p.tech.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2 py-1 text-[10px] text-body"
                    >
                      {techIcons[tech] && (
                        <BrandIcon
                          name={techIcons[tech]}
                          size={11}
                        />
                      )}

                      {tech}
                    </span>
                  ))}

                  {p.tech.length > 2 && (
                    <span
                      title={p.tech.slice(2).join(", ")}
                      className="cursor-help text-[11px] text-muted"
                    >
                      +{p.tech.length - 2}
                    </span>
                  )}
                </div>

                {/* LIVE WEBSITE & GITHUB */}

               <div className="flex shrink-0 items-center gap-1">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Live website"
                      aria-label={`${p.title} live website`}
                     className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-accent"
                    >
                      <Globe size={16} />
                    </a>
                  )}

                  {p.github && p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub repository"
                      aria-label={`${p.title} GitHub repository`}
                      className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-head"
                    >
                      <BrandIcon
                        name="github"
                        size={16}
                        mono
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* VIEW ALL / SHOW LESS BUTTON */}

      {projects.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="project-grid"
            onClick={() =>
              setShowAll((previous) => !previous)
            }
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-[13px] font-medium text-body transition-all duration-300 hover:border-accent/50 hover:text-head"
          >
            {showAll ? "Show Less" : "View All"}

            {showAll ? (
              <ChevronUp size={14} />
            ) : (
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            )}
          </button>
        </div>
      )}
    </Section>
  );
}