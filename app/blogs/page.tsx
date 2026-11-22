import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Blogs | Indraraj Singh Thakur",
};

const articles = [
  {
    title: "Building Better Web Interfaces",
    category: "Frontend Development",
    description:
      "Why small design details can make a big difference in the user experience.",
    content:
      "A good interface is more than its appearance. Loading states, empty states, keyboard navigation and responsive layouts all contribute to how enjoyable a website feels. Building projects is an opportunity to practice these details.",
  },
  {
    title: "Learning Through Personal Projects",
    category: "Developer Journey",
    description:
      "Exploring web development through projects like Cravora and TaskStatus.",
    content:
      "Personal projects provide a space to experiment with technologies, practice problem solving and explore different design approaches. Each project presents a new opportunity to improve both technical knowledge and design skills.",
  },
];

export default function BlogsPage() {
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
        <p className="eyebrow mb-3">Thoughts & Learning</p>

        <h1 className="text-4xl font-bold text-head">
          Blogs
        </h1>

        <p className="mt-4 text-sm leading-7 text-body">
          Notes on engineering, design, web development
          and things I learn along the way.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <details
            key={article.title}
            className="group rounded-2xl border border-line bg-card transition-colors hover:border-accent/40"
          >
            <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">

              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <BookOpen size={19} />
              </div>

              <div className="flex-1">
                <p className="text-xs text-accent">
                  {article.category}
                </p>

                <h2 className="mt-1 text-base font-semibold text-head">
                  {article.title}
                </h2>

                <p className="mt-2 text-sm text-muted">
                  {article.description}
                </p>
              </div>

              <ChevronDown
                size={17}
                className="text-muted transition-transform group-open:rotate-180"
              />
            </summary>

            <div className="border-t border-line p-5 text-sm leading-7 text-body">
              {article.content}
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}