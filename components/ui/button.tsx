import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-head text-bg hover:bg-white",
        outline: "border border-white/10 bg-transparent text-head hover:border-white/25 hover:bg-white/5",
        ghost: "text-body hover:bg-white/5 hover:text-white",
        pill: "rounded-full border border-white/10 bg-card px-5 text-head hover:border-white/25",
      },
      size: { default: "", icon: "size-11 px-0", sm: "min-h-9 px-3 text-xs" },
    },
    defaultVariants: { variant: "outline", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";
