"use client";
import { GitHubHeatmap } from "../github-heatmap";
import { useState } from "react";
import { ChevronRight, GitPullRequest } from "lucide-react";
import { Card, Section } from "../layout-bits";
import { Item } from "../reveal";
import { Button } from "../ui/button";
import * as portfolioData from "@/lib/data";
import { cn } from "@/lib/utils";

type GitHubData = {
  profile: string;
  counts: { merged: number; open: number };
  orgs: string[];
  prs: Record<Tab, Array<{ title: string; repo: string; date: string; href: string }>>;
};

const data = portfolioData as unknown as { github?: GitHubData; githubData?: GitHubData };
const github: GitHubData = data.github ?? data.githubData ?? {
  profile: "https://github.com",
  counts: { merged: 0, open: 0 },
  orgs: [],
  prs: { merged: [], open: [], closed: [] },
};

type Tab = "merged" | "open" | "closed";

export function OpenSource() {
  const [tab, setTab] = useState<Tab>("merged");
  const [all, setAll] = useState(false);
  const rows = github.prs[tab];
  const shown = all ? rows : rows.slice(0, 4);
  const tabs: { id: Tab; label: string }[] = [
    { id: "merged", label: `Merged ${github.counts.merged}` },
    { id: "open", label: `Open ${github.counts.open}` },
    { id: "closed", label: "Closed" },
  ];

  return (
    <Section id="open-source" eyebrow="OPEN SOURCE" title="GitHub Activity">
      <div className="space-y-4">
        <Item>
          <Card className="p-5">
            
            <GitHubHeatmap />
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span className="text-[13px] text-muted">Top organizations:</span>
              <ul className="flex -space-x-1.5">
                {github.orgs.map((o, i) => (
                  <li key={i} title={o} className="grid size-7 place-items-center rounded-full border-2 border-card font-mono text-[10px] text-white/80" style={{ background: `linear-gradient(135deg, hsl(${i * 70 + 20} 45% 32%), hsl(${i * 70 + 60} 40% 14%))` }}>
                    {o.replace(/[\[\]]/g, "").slice(0, 1)}
                  </li>
                ))}
              </ul>
              <ChevronRight size={16} className="text-muted" aria-hidden />
            </div>
          </Card>
        </Item>

        <Item>
          <Card className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div role="tablist" aria-label="Pull requests" className="flex gap-1 rounded-full border border-line p-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => { setTab(t.id); setAll(false); }}
                    className={cn("min-h-9 rounded-full px-3.5 text-[13px] transition-colors duration-150", tab === t.id ? "bg-white/10 text-head" : "text-muted hover:text-body")}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <Button asChild variant="pill" size="sm"><a href={github.profile} target="_blank" rel="noreferrer">View Profile</a></Button>
            </div>
            <ul className="divide-y divide-line" role="tabpanel">
              {shown.length === 0 && <li className="py-6 text-center text-sm text-muted">Nothing here yet.</li>}
              {shown.map((r, i) => (
                <li key={i} className="flex min-h-12 items-center gap-3 py-2"><a href={r.href} target="_blank" rel="noreferrer" className="flex min-w-0 flex-1 items-center gap-3">
                  <GitPullRequest size={16} className="shrink-0 text-red-500" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-sm text-head">{r.title}</span>
                  <span className="hidden shrink-0 font-mono text-[12px] text-muted sm:block">{r.repo}</span>
                  <span className="shrink-0 font-mono text-[12px] text-label">{r.date}</span></a>
                </li>
              ))}
            </ul>
            {rows.length > 4 && !all && (
              <button onClick={() => setAll(true)} className="mt-2 min-h-11 text-[13px] text-body transition-colors duration-150 hover:text-accent">
                Show all ({rows.length - 4} more)
              </button>
            )}
          </Card>
        </Item>
      </div>
    </Section>
  );
}
