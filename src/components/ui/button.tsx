import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* shadcn-style variants, retuned to the forge palette. Shared by <Button> and <CtaLink>. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-mono font-medium tracking-wide select-none transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.2,0.65,0.2,1)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      kind: {
        primary:
          "bg-forge text-forge-ink font-semibold hover:bg-heat-amber hover:-translate-y-px hover:shadow-[0_6px_30px_rgba(255,90,31,0.40)] active:translate-y-0",
        secondary:
          "border border-line text-ink hover:border-forge hover:text-white-hot",
        ghost: "text-ink-dim hover:text-ink",
      },
      size: {
        sm: "text-xs px-3.5 py-2",
        md: "text-sm px-5 py-3",
        lg: "text-[0.95rem] px-6 py-3.5",
      },
    },
    defaultVariants: { kind: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, kind, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ kind, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
