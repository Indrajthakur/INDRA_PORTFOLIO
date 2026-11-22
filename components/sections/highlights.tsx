"use client";
import { Play } from "lucide-react";
import { Section } from "../layout-bits";
import { Item } from "../reveal";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { featured } from "@/lib/data";

function Thumb({ big }: { big?: boolean }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-[linear-gradient(135deg,#1c0f10,#0d0a0a_60%,#150b0b)]">
      <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 4px)" }} />
      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded bg-red-600 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-white">
        <span className="size-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none" />LIVE
      </span>
      <p aria-hidden className="absolute inset-x-0 top-[22%] text-center font-mono text-[clamp(22px,6vw,44px)] font-black tracking-[0.2em] text-white/10">LIVE STREAM</p>
      {!big && (
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-black shadow-xl transition-transform duration-150 group-hover:scale-105">
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
        <div>
          <p className="text-sm font-semibold text-head">{featured.channel}</p>
          <p className="text-[12px] text-muted">{featured.title}</p>
        </div>
      </div>
    </div>
  );
}

export function Highlights() {
  return (
    <Section id="highlights" eyebrow="Social Proof" title="Featured On">
      <Item className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -inset-y-6 -z-10 sm:-inset-x-6 rounded-[40px] bg-red-600/10 blur-3xl" />
        <Dialog>
          <DialogTrigger asChild>
            <button aria-label={`Play ${featured.title}`} className="group block w-full text-left"><Thumb /></button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-3">
            <DialogTitle className="sr-only">{featured.title}</DialogTitle>
            <div className="grid aspect-video place-items-center rounded-xl bg-black text-sm text-muted">[Video player placeholder]</div>
            <DialogClose className="mt-3 min-h-11 w-full rounded-xl border border-white/10 text-sm text-head hover:bg-white/5">Close</DialogClose>
          </DialogContent>
        </Dialog>
      </Item>
    </Section>
  );
}
