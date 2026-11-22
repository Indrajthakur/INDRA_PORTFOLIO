"use client";

import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

const overlayCls =
  "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0";

const closeCls =
  "absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-xl text-body transition-colors duration-150 hover:bg-white/[0.06] hover:text-white";

/** Centered modal (lightbox, command palette). */
export function DialogContent({
  title,
  className,
  children,
  hideClose,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  hideClose?: boolean;
}) {
  return (
    <D.Portal>
      <D.Overlay className={overlayCls} />
      <D.Content
        aria-describedby={undefined}
        className={cn(
          "fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className,
        )}
      >
        <D.Title className="sr-only">{title}</D.Title>
        {children}
        {!hideClose && (
          <D.Close aria-label="Close" className={closeCls}>
            <X className="h-4 w-4" />
          </D.Close>
        )}
      </D.Content>
    </D.Portal>
  );
}

/** Right-hand sheet (mobile menu). */
export function SheetContent({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <D.Portal>
      <D.Overlay className={overlayCls} />
      <D.Content
        aria-describedby={undefined}
        className={cn(
          "fixed inset-y-0 right-0 z-[61] w-[min(320px,85vw)] border-l border-hairline bg-card p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
          className,
        )}
      >
        <D.Title className="sr-only">{title}</D.Title>
        {children}
        <D.Close aria-label="Close menu" className={closeCls}>
          <X className="h-4 w-4" />
        </D.Close>
      </D.Content>
    </D.Portal>
  );
}
