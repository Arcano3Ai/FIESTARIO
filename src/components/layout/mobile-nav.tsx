"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Heart, Calendar } from "lucide-react";
import { useFiestario } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { favorites } = useFiestario();

  const items = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/explorar", label: "Explorar", icon: Compass },
    { href: "/arma-tu-evento", label: "Armar", icon: Sparkles, highlight: true },
    { href: "/dashboard/favoritos", label: "Favoritos", icon: Heart, badge: favorites.length },
    { href: "/dashboard", label: "Mi Evento", icon: Calendar },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-fiestario-warmWhite/95 backdrop-blur-md border-t border-fiestario-stoneMuted/40 py-2 px-3 safe-area-bottom">
      <nav className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center p-1.5 min-w-[56px] text-center transition-colors",
                isActive ? "text-fiestario-carbon font-semibold" : "text-fiestario-stone hover:text-fiestario-carbon"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-full transition-transform",
                  item.highlight && "bg-fiestario-carbon text-fiestario-champagne -mt-2 p-2 shadow-subtle",
                  isActive && !item.highlight && "text-fiestario-gold"
                )}
              >
                <Icon className={cn("w-5 h-5", item.highlight && "text-fiestario-champagne")} />
              </div>
              <span className={cn("text-[10px] mt-0.5 tracking-tight", item.highlight && "font-medium text-fiestario-carbon")}>
                {item.label}
              </span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-0 right-3 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
