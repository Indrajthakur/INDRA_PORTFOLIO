"use client";
import * as D from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;
export const DialogTitle = D.Title;

export function DialogContent({ className, children, ...props }: React.ComponentProps<typeof D.Content>) {
  return (
    <D.Portal>
      <D.Overlay className="ov fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm" />
      <D.Content
        aria-describedby={undefined}
        className={cn(
          "pop fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-card shadow-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </D.Content>
    </D.Portal>
  );
}

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof D.Content>) {
  return (
    <D.Portal>
      <D.Overlay className="ov fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" />
      <D.Content
        aria-describedby={undefined}
        className={cn("sheet fixed inset-y-0 right-0 z-[61] w-[min(320px,85vw)] border-l border-white/10 bg-card p-6", className)}
        {...props}
      >
        {children}
      </D.Content>
    </D.Portal>
  );
}
