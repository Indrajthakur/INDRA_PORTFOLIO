import Image from "next/image";
import { Section } from "../layout-bits";
import { Item } from "../reveal";
import { BrandIcon } from "../brand-icon";
import { Code2, MapPin, GraduationCap } from "lucide-react";

const aboutSkills = [
  { label: "HTML", name: "html5" },
  { label: "CSS", name: "css" },
  { label: "JavaScript", name: "javascript" },
  { label: "TypeScript", name: "typescript" },
  { label: "React", name: "react" },
  { label: "Next.js", name: "nextjs" },
  { label: "Node.js", name: "nodejs" },
  { label: "Git", name: "git" },
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="GET TO KNOW ME"
      title="Behind the Code"
    >
      <Item className="flex flex-col gap-8 sm:flex-row">

        {/* Profile Avatar */}
        <div className="shrink-0">
          <div className="relative w-[180px]">
            <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-lg" />

            <Image
              src="/avatar.jpg"
              alt="Indraraj Singh Thakur's avatar"
              width={180}
              height={180}
              unoptimized
              className="relative size-[180px] rounded-2xl border border-accent/40 object-cover"
            />

            <div className="absolute -bottom-2 -right-2 rounded-lg border border-line bg-card px-3 py-1.5">
              <span className="flex items-center gap-2 font-mono text-[10px] text-head">
                <span className="size-2 animate-pulse rounded-full bg-green-500" />
                BUILDING
              </span>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="min-w-0 flex-1 space-y-5">

          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
              Developer · Creator · Learner
            </p>

            <h3 className="text-[28px] font-semibold leading-tight text-head">
              Indraraj Singh Thakur
              <span className="text-accent">.</span>
            </h3>
          </div>

          {/* Description */}
          <p className="text-[15px] leading-7 text-body">
            I'm a{" "}
            <span className="font-semibold text-head">
              full-stack web developer
            </span>{" "}
            who cares about the{" "}
            <span className="font-semibold text-accent">
              last 10%
            </span>{" "}
            — the loading state, the empty state, the keyboard
            shortcut nobody documents. I like projects where{" "}
            <span className="font-semibold text-head">
              design and engineering
            </span>{" "}
            sit at the same table.
          </p>

          {/* Personal Information */}
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2 text-[13px] text-muted">
              <MapPin size={15} className="text-accent" />
              Rehli, Sagar, Madhya Pradesh
            </div>

            <div className="flex items-center gap-2 text-[13px] text-muted">
              <GraduationCap size={15} className="text-accent" />
              B.Tech CSE · RGPV
            </div>

            <div className="flex items-center gap-2 text-[13px] text-muted">
              <Code2 size={15} className="text-accent" />
              Building meaningful digital experiences
            </div>

          </div>

          {/* Skills */}
          <div className="space-y-3 border-t border-line pt-4">
            <p className="eyebrow">
              My Tech Stack
            </p>

            <ul className="flex flex-wrap gap-2">
              {aboutSkills.map((skill) => (
                <li
                  key={skill.name}
                  title={skill.label}
                  className="grid size-10 place-items-center rounded-lg border border-line bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/10"
                >
                  <BrandIcon name={skill.name} size={18} />
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Item>
    </Section>
  );
}