"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { Divider } from "../layout-bits";
import { BrandIcon } from "../brand-icon";
import { Avatar } from "../header";
import { profile } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";

function PixelEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    const random = (x: number, y: number) => {
      const value =
        Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;

      return value - Math.floor(value);
    };

    // STARS

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const noise = random(x, y);

        if (noise > 0.992) {
          ctx.fillStyle = "rgba(160,190,230,0.45)";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // PIXEL CONTINENTS

    const land = new Path2D(
      "M16 45 L27 33 L38 23 L52 19 L65 26 L58 33 L49 35 L43 44 L53 51 L46 63 L29 62 Z " +
      "M75 29 L88 23 L103 19 L121 24 L133 30 L126 38 L111 35 L102 43 L87 40 Z " +
      "M83 39 L99 43 L104 52 L92 64 L81 55 Z " +
      "M129 49 L145 42 L155 52 L149 62 L135 60 Z"
    );

    // EARTH

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x - 85) / 83;
        const ny = (y - 70) / 58;
        const distance = nx * nx + ny * ny;

        if (distance > 1) continue;

        const noise = random(x, y);
        const fade = Math.max(
          0,
          Math.min(1, (height - y) / 19)
        );

        // Dithered pixel texture.

        if (noise > fade) continue;

        const isLand = ctx.isPointInPath(land, x, y);

        if (isLand) {
          ctx.fillStyle =
            noise > 0.55 ? "#b9dcf5" : "#679cce";
        } else {
          ctx.fillStyle =
            noise > 0.65 ? "#3274cc" : "#16468f";
        }

        // Atmospheric rim.

        if (distance > 0.93) {
          ctx.fillStyle = "#a5d4ff";
        }

        // Small cloud formations.

        const cloud =
          Math.sin(x * 0.15 + y * 0.4) +
          Math.sin(x * 0.08 - y * 0.3);

        if (cloud > 1.65 && y < 48) {
          ctx.fillStyle = "#deefff";
        }

        if ((x + y) % 2 === 0 && noise > 0.55) {
          continue;
        }

        ctx.fillRect(x, y, 1, 1);
      }
    }

    // PIXEL SATELLITE

    ctx.save();
    ctx.translate(56, 16);
    ctx.rotate(-Math.PI / 4);

    ctx.fillStyle = "#abc5df";
    ctx.fillRect(-2, -2, 4, 5);

    ctx.fillStyle = "#427dcd";
    ctx.fillRect(-9, -2, 6, 4);
    ctx.fillRect(3, -2, 6, 4);

    ctx.fillStyle = "#a9d4ff";

    for (let x = -8; x <= 8; x += 2) {
      if (Math.abs(x) > 3) {
        ctx.fillRect(x, -1, 1, 2);
      }
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-1, -4, 2, 2);

    ctx.restore();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={170}
      height={64}
      aria-hidden
      className="w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function recordVisit() {
      const supabase = getSupabase();

      if (!supabase) return;

      try {
        let id = localStorage.getItem("portfolio-visitor-id");

        if (!id) {
          id = crypto.randomUUID();

          localStorage.setItem(
            "portfolio-visitor-id",
            id
          );
        }

        const { data, error } = await supabase.rpc(
          "record_portfolio_visit",
          {
            p_visitor_id: id,
          }
        );

        if (!error && data !== null && active) {
          setCount(Number(data));
        }
      } catch (error) {
        console.error("Visitor counter:", error);
      }
    }

    recordVisit();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[680px] overflow-hidden">
      <PixelEarth />

      <div className="absolute inset-x-0 top-[38%] flex justify-center">
        <a
          href="#guestbook"
          className="group flex items-center gap-3 rounded-full border border-blue-400/20 bg-[#081425]/80 px-5 py-3 font-mono text-xs tracking-wider text-blue-200 shadow-[0_0_30px_rgba(37,99,235,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-400/60 sm:text-sm"
        >
          Say hi, visitor

          {count !== null && (
            <span className="font-bold text-white">
              {count.toLocaleString("en-US")}
            </span>
          )}

          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const email = "indrajthakur08@gmail.com";

  const socialLinks = profile.socials.filter((social) =>
    ["GitHub", "LinkedIn", "Email"].includes(social.label)
  );

  return (
    <>
      <Divider />

      {/* CONTACT SECTION */}

      <section
        id="contact"
        className="mx-auto w-full max-w-[680px] scroll-mt-24 px-5 py-10 min-[1100px]:px-6"
      >
        <div className="mb-8 flex justify-center">
          <a
            href={`mailto:${email}?subject=Let's%20book%20a%20call`}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-xs font-medium text-body transition-all duration-300 hover:border-accent hover:text-head"
          >
            <Avatar size={22} className="rounded-full" />
            Book a call

            <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <p className="text-sm font-medium text-head">
              Open to freelance projects and collaborations.
            </p>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-xs text-body transition-colors hover:text-accent sm:text-sm"
            >
              <Mail size={15} />
              {email}
            </a>
          </div>

          {/* SOCIAL LINKS */}

          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid size-11 place-items-center rounded-xl border border-line bg-card text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-head"
              >
                {social.brand ? (
                  <BrandIcon
                    name={social.brand}
                    size={19}
                    mono
                  />
                ) : (
                  <Mail size={19} />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* COPYRIGHT */}

      <footer className="mx-auto w-full max-w-[680px] px-5 py-12 text-center">
        <p className="text-xs font-medium text-body">
          © {profile.year} Crafted with{" "}
          <span className="text-red-500">♥</span> by{" "}
          <span className="text-head">{profile.name}</span>.
        </p>
      </footer>

      <Divider />

      {/* PIXEL EARTH & VISITOR COUNTER */}

      <VisitorCounter />
    </>
  );
}