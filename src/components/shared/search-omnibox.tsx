"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

interface SearchOmniboxProps {
  className?: string;
  variant?: "hero" | "compact";
  initialQuery?: string;
  initialCity?: string;
}

export function SearchOmnibox({
  className,
  variant = "hero",
  initialQuery = "",
  initialCity = "",
}: SearchOmniboxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [guestCount, setGuestCount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCity) params.set("ciudad", selectedCity);
    if (guestCount) params.set("invitados", guestCount);
    if (date) params.set("fecha", date);

    router.push(`/explorar?${params.toString()}`);
  };

  const handlePlanMyEvent = () => {
    router.push("/arma-tu-evento");
  };

  if (variant === "compact") {
    return (
      <form
        onSubmit={handleSearch}
        className={cn(
          "flex items-center bg-white border border-fiestario-stoneMuted/50 rounded-full p-1.5 shadow-subtle max-w-xl w-full",
          className
        )}
      >
        <div className="flex-1 flex items-center px-3 gap-2">
          <Search className="w-4 h-4 text-fiestario-gold shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar quinta, DJ, taquiza, fotógrafo..."
            className="w-full text-xs text-fiestario-carbon bg-transparent focus:outline-none placeholder:text-fiestario-stone"
          />
        </div>
        <Button type="submit" size="sm" variant="primary" className="rounded-full px-4 text-xs">
          Buscar
        </Button>
      </form>
    );
  }

  return (
    <div
      className={cn(
        "w-full bg-white/95 backdrop-blur-xl border border-fiestario-stoneMuted/50 rounded-3xl p-3 sm:p-4 shadow-dropdown transition-all",
        className
      )}
    >
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 divide-y md:divide-y-0 md:divide-x divide-fiestario-stoneMuted/30">
          {/* ¿Qué necesitas? */}
          <div className="p-2 sm:p-3 text-left">
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-fiestario-stone mb-1">
              ¿Qué necesitas?
            </label>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-fiestario-gold shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. quinta, DJ, globos, taquiza..."
                className="w-full text-sm text-fiestario-carbon bg-transparent focus:outline-none placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          {/* ¿Dónde? */}
          <div className="p-2 sm:p-3 text-left">
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-fiestario-stone mb-1">
              ¿Dónde?
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-fiestario-gold shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-sm text-fiestario-carbon bg-transparent focus:outline-none cursor-pointer font-medium"
              >
                <option value="">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name} ({city.state})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ¿Cuándo? */}
          <div className="p-2 sm:p-3 text-left">
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-fiestario-stone mb-1">
              ¿Cuándo?
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-fiestario-gold shrink-0" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm text-fiestario-carbon bg-transparent focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Invitados & CTA */}
          <div className="p-2 sm:p-3 flex items-center justify-between gap-3 text-left">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-fiestario-stone mb-1">
                Invitados
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-fiestario-gold shrink-0" />
                <input
                  type="number"
                  placeholder="Número de personas"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full text-sm text-fiestario-carbon bg-transparent focus:outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-6 py-3 shrink-0 rounded-2xl bg-fiestario-carbon hover:bg-black font-semibold text-sm shadow-card"
            >
              Explorar
            </Button>
          </div>
        </div>

        {/* Bottom Fast Track / Secondary CTA */}
        <div className="mt-3 pt-3 border-t border-fiestario-stoneMuted/20 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs text-fiestario-stone">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium text-gray-500">Popular:</span>
            {["Quintas en Santiago", "Taquizas de trompo", "DJs de boda", "Arcos de globos", "Fotógrafo"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-0.5 rounded-full bg-fiestario-cream/80 hover:bg-fiestario-cream text-fiestario-carbon text-[11px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePlanMyEvent}
            className="group flex items-center gap-1.5 text-xs font-semibold text-fiestario-carbon hover:text-fiestario-gold transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
            <span>¿Prefieres que organicemos todo? Arma tu evento</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
