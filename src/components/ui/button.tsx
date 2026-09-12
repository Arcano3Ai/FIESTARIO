import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fiestario-gold/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide";

    const variants = {
      primary:
        "bg-fiestario-carbon text-fiestario-warmWhite hover:bg-black active:scale-[0.99] shadow-subtle border border-fiestario-border",
      secondary:
        "bg-fiestario-champagne/20 text-fiestario-carbon hover:bg-fiestario-champagne/40 border border-fiestario-champagne/40",
      gold:
        "bg-gradient-to-r from-fiestario-gold to-fiestario-goldDark text-white hover:brightness-105 active:scale-[0.99] shadow-subtle",
      outline:
        "bg-transparent text-fiestario-carbon border border-fiestario-stoneMuted hover:border-fiestario-carbon hover:bg-fiestario-cream/50",
      ghost:
        "bg-transparent text-fiestario-carbon hover:bg-fiestario-cream/60",
      link:
        "bg-transparent text-fiestario-carbon underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-full",
      md: "text-sm px-5 py-2.5 rounded-full",
      lg: "text-base px-7 py-3.5 rounded-full font-medium",
      xl: "text-lg px-8 py-4 rounded-full font-serif",
      icon: "h-10 w-10 rounded-full p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
