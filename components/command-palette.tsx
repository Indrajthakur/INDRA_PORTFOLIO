"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { indexItems } from "@/lib/data";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export const OPEN_PALETTE = "open-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const evt = () => setOpen(true);
    window.addEventListener("keydown", key);
    window.addEventListener(OPEN_PALETTE, evt);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener(OPEN_PALETTE, evt);
    };
  }, []);

  const items = indexItems.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  const go = (id: string) => {
    setOpen(false);
    setQ("");
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md overflow-hidden">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="text-muted" aria-hidden />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && items[0] && go(items[0].id)}
            placeholder="Jump to section…"
            aria-label="Jump to section"
            className="h-12 flex-1 bg-transparent text-sm text-head outline-none placeholder:text-dim"
          />
        </div>
        <ul className="max-h-72 overflow-auto p-2">
          {items.map((i) => (
            <li key={i.id}>
              <button onClick={() => go(i.id)} className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm text-body hover:bg-white/5 hover:text-white">
                {i.label}
              </button>
            </li>
          ))}
          {items.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
