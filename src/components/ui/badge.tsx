import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "verified" | "outline" | "subtle" | "success" | "warning";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors";

  const variants = {
    default: "bg-fiestario-carbon text-fiestario-warmWhite",
    gold: "bg-fiestario-champagne/30 text-fiestario-goldDark border border-fiestario-gold/30 font-semibold",
    verified: "bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium",
    outline: "border border-fiestario-stoneMuted text-fiestario-stone bg-white/80",
    subtle: "bg-fiestario-cream text-fiestario-carbon border border-fiestario-stoneMuted/40",
    success: "bg-emerald-100 text-emerald-900",
    warning: "bg-amber-100 text-amber-900",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {variant === "verified" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
      {variant === "gold" && <Sparkles className="w-3 h-3 text-fiestario-gold" />}
      {children}
    </div>
  );
}
