import { Card, Section } from "../layout-bits";
import { Item } from "../reveal";
import { achievement as a } from "@/lib/data";

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Achievements">
      <Item>
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-2 select-none text-[200px] font-black italic leading-none tracking-tighter text-white/[0.03]">{a.rank}</span>
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <p className="eyebrow flex items-center gap-2"><span className="size-1.5 rounded-full bg-blue-500" />{a.label}</p>
              <h3 className="text-3xl font-extrabold italic tracking-tight text-head sm:text-4xl">{a.title}</h3>
              <p className="font-mono text-[11px] tracking-[0.12em] text-muted">{a.subtitle}</p>
            </div>
            <div className="sm:text-right">
              <p className="flex items-baseline gap-2 sm:justify-end">
                <span className="text-6xl font-extrabold leading-none tracking-tighter text-head sm:text-7xl">{a.rank}</span>
                <span className="text-sm text-muted">{a.of}</span>
              </p>
              <span className="mt-3 inline-block rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-body">{a.percentile}</span>
            </div>
          </div>
          <blockquote className="relative mt-8 border-l-2 border-white/15 pl-4 text-[15px] leading-7 text-body">{a.quote}</blockquote>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.12em]">
            <a href="#" className="text-body transition-colors duration-150 hover:text-accent">{a.verify}</a>
            <span className="text-label">{a.ref}</span>
          </div>
        </Card>
      </Item>
    </Section>
  );
}
