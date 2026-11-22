import { Header } from "@/components/header";
import { IndexRail } from "@/components/index-rail";
import { CommandPalette } from "@/components/command-palette";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Hero } from "@/components/sections/hero";
import { Now } from "@/components/sections/now";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { OpenSource } from "@/components/sections/open-source";
import { Highlights } from "@/components/sections/highlights";
import { Guestbook } from "@/components/sections/guestbook";
import { Footer } from "@/components/sections/footer";

const rail = "pointer-events-none absolute inset-y-0 hidden border-l border-dashed border-rail min-[1100px]:block";

export default function Page() {
  return (
    <TooltipProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-head focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <div className="relative mx-auto max-w-[1120px]">
        <div aria-hidden className={rail} style={{ left: "calc((100% - 680px) / 2)" }} />
        <div aria-hidden className={rail} style={{ left: "calc((100% + 680px) / 2)" }} />
        <IndexRail />
        <main id="main">
          <Hero />
          <Now />
          <Skills />
          <Experience />
          <Projects />
          <About />
          <OpenSource />
          <Highlights />
          <Guestbook />
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </TooltipProvider>
  );
}
