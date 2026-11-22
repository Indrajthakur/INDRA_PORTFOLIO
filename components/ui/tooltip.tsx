"use client";
import * as T from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <T.Provider delayDuration={100}>{children}</T.Provider>
);

export function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <T.Root>
      <T.Trigger asChild>{children}</T.Trigger>
      <T.Portal>
        <T.Content
          sideOffset={8}
          className={cn("z-[70] rounded-md border border-white/10 bg-[#171717] px-2.5 py-1.5 text-xs font-medium text-head shadow-xl")}
        >
          {label}
        </T.Content>
      </T.Portal>
    </T.Root>
  );
}
