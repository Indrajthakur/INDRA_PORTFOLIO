
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
import BookCallButton from "@/components/BookCallButton";

const rail =
  "pointer-events-none absolute inset-y-0 hidden border-l border-dashed border-rail min-[1100px]:block";

export default function Page() {
  return (
    <TooltipProvider>
      {/* Skip to Content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-head focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      {/* Header Navigation */}
      <Header />

      {/* Main Portfolio Container */}
      <div className="relative mx-auto max-w-[1120px]">
        {/* Decorative Vertical Rails */}
        <div
          aria-hidden
          className={rail}
          style={{ left: "calc((100% - 680px) / 2)" }}
        />

        <div
          aria-hidden
          className={rail}
          style={{ left: "calc((100% + 680px) / 2)" }}
        />

        {/* Section Navigation */}
        <IndexRail />

        {/* Portfolio Sections */}
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

          {/* Cal.com Booking Section */}
          <section
            id="book-a-call"
            aria-label="Schedule a meeting"
            className="mx-auto flex max-w-[680px] flex-col items-center gap-5 border-t border-dashed border-rail px-6 py-14"
          >
            {/* Section Heading */}
            <div className="space-y-3 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                LET'S CONNECT
              </span>

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Got a project in mind?
              </h2>

              <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-400">
                Have an exciting idea, freelance opportunity, or
                collaboration in mind? Let's discuss it.
              </p>
            </div>

            {/* Cal.com Popup Button */}
            <BookCallButton />

            {/* Meeting Information */}
            <p className="text-center text-xs text-neutral-500">
              30-minute meeting · Online · Asia/Kolkata
            </p>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </TooltipProvider>
  );
}
