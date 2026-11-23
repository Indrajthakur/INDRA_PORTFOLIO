import { cn } from "@/lib/utils";
import { Item, Stagger } from "./reveal";

const COL = "680px";

function Cross({ side }: { side: "l" | "r" }) {
  return (
    <svg
      aria-hidden
      width="13" height="13" viewBox="0 0 13 13"
      className={cn("absolute top-0 hidden -translate-x-1/2 -translate-y-1/2 text-[#3f3f46] min-[1100px]:block")}
      style={{ left: side === "l" ? `calc((100% - ${COL}) / 2)` : `calc((100% + ${COL}) / 2)` }}
    >
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Horizontal dashed section rule with crosshair ticks on the rail intersections. */
export function Divider() {
  return (
    <div aria-hidden className="relative h-0 w-full border-t border-dashed border-rail">
      <Cross side="l" />
      <Cross side="r" />
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function Section({
  id, eyebrow, title, right, first, children,
}: {
  id?: string; eyebrow?: string; title?: string; right?: React.ReactNode; first?: boolean; children: React.ReactNode;
}) {
  return (
    <>
      {!first && <Divider />}
      <section id={id} aria-labelledby={title ? `${id}-title` : undefined} className="scroll-mt-20">
        
<Stagger className="mx-auto w-full max-w-[680px] px-4 py-10 md:px-5 md:py-14 min-[1100px]:px-6">

          {title && (
            <Item className="mb-6 flex items-end justify-between gap-4 md:mb-8">
              <div className="space-y-3">
                {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                
<h2
  id={`${id}-title`}
  className="text-[24px] font-semibold leading-tight tracking-tight text-head sm:text-[28px]"
>

                  {title}
                </h2>
              </div>
              {right}
            </Item>
          )}
          {children}
        </Stagger>
      </section>
    </>
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-line bg-card", className)} {...props} />;
}

/** Local gradient + grid placeholder, no external assets. */
export function Placeholder({ hue = 24, className, children }: { hue?: number; className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 120% at 20% 0%, hsl(${hue} 55% 22% / .9), transparent 55%), linear-gradient(135deg, hsl(${hue + 30} 30% 12%), hsl(${hue + 70} 35% 6%))`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {children}
    </div>
  );
}
