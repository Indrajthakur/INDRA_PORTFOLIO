import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Shenanigans | Indraraj Singh Thakur",
};

export default function ShenanigansPage() {
  const experiments = projects.filter(
    (project) =>
      project.title.includes("Portfolio")
  );

  return (
    <main className="mx-auto min-h-screen max-w-[680px] px-5 py-12">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-head"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="mb-10 mt-10">
        <p className="eyebrow mb-3">The Playground</p>

        <h1 className="text-4xl font-bold text-head">
          Shenanigans{" "}
          <Sparkles
            size={24}
            className="inline text-accent"
          />
        </h1>

        <p className="mt-4 text-sm leading-7 text-body">
          A little corner of the internet for experiments,
          creative interfaces and things I build just because
          they seem fun.
        </p>
      </div>

      <div className="space-y-4">
        {experiments.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent/40"
          >
            <h2 className="text-lg font-semibold text-head">
              {project.title}
            </h2>

            <p className="mt-2 text-sm text-muted">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent"
                >
                  Explore
                  <ArrowUpRight size={14} />
                </a>
              )}

              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-body hover:text-head"
                >
                  Source Code ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-12 text-center font-mono text-xs text-muted">
        More experiments coming soon...
      </p>
    </main>
  );
}