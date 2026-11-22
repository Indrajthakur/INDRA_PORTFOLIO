"use client";
import { banner } from "@/lib/data";

// Deterministic so server and client markup match.
const rnd = (() => { let s = 7; return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296; })();
const stars = Array.from({ length: 42 }, () => ({ x: rnd() * 100, y: rnd() * 60, s: 1 + rnd() * 1.5, d: 2 + rnd() * 4, o: rnd() * 5 }));
const motes = Array.from({ length: 14 }, () => ({ x: rnd() * 100, d: 5 + rnd() * 6, o: rnd() * 8 }));

const ridge = (a: string, b: string) => (
  <svg viewBox="0 0 1600 250" preserveAspectRatio="none" className="h-full w-[200%]" aria-hidden>
    <path d={`M0 250V${a}l100-50 80 40 120-80 110 70 90-40 130 70 100-55 120 60 100-70 110 60 120-45 90 50 130-60 100 40 90-35 110 55 100-40 90 45 80-30 110 50V250z`} fill={b} />
  </svg>
);

export function LiveBanner() {
  return (
    <div className="relative aspect-[16/5] overflow-hidden rounded-2xl border border-line bg-[linear-gradient(180deg,#171021_0%,#0e0c16_60%,#0a0a0a_100%)]">
      {banner.video ? (
        <video className="absolute inset-0 size-full object-cover" src={banner.video} poster={banner.poster} autoPlay muted loop playsInline aria-hidden />
      ) : (
        <>
          <div aria-hidden className="live-anim absolute -top-1/2 left-1/4 h-[140%] w-1/2 rounded-full bg-orange-500/25 blur-3xl" style={{ animation: "aurora 14s ease-in-out infinite" }} />
          <div aria-hidden className="live-anim absolute -top-1/3 right-[10%] h-[120%] w-2/5 rounded-full bg-violet-600/25 blur-3xl" style={{ animation: "aurora 18s ease-in-out infinite reverse" }} />
          {stars.map((s, i) => (
            <span key={i} aria-hidden className="live-anim absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animation: `twinkle ${s.d}s ease-in-out ${s.o}s infinite` }} />
          ))}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%] overflow-hidden opacity-90">
            <div className="live-anim flex h-full w-[200%]" style={{ animation: "ridge 90s linear infinite" }}>{ridge("150", "#130f1d")}</div>
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden">
            <div className="live-anim flex h-full w-[200%]" style={{ animation: "ridge 55s linear infinite" }}>{ridge("120", "#0b0a10")}</div>
          </div>
          {motes.map((m, i) => (
            <span key={i} aria-hidden className="live-anim absolute bottom-2 size-1 rounded-full bg-orange-400/80" style={{ left: `${m.x}%`, opacity: 0, animation: `rise ${m.d}s ease-out ${m.o}s infinite` }} />
          ))}
        </>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
    </div>
  );
}
