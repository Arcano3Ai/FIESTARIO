"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles, Filter, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inspirationItems } from "@/data/inspiration";
import { EventStyle } from "@/types";

export default function InspiracionPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const styles: EventStyle[] = [
    "Elegante",
    "Minimalista",
    "Boho Chic",
    "Mexicano Contemporáneo",
    "Moderno",
    "Lujo & Editorial",
  ];

  const filteredItems = selectedStyle
    ? inspirationItems.filter((item) => item.style === selectedStyle)
    : inspirationItems;

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="gold">
          <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
          <span>Muro Editorial de FIESTARIO</span>
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
          Galería de Inspiración
        </h1>
        <p className="text-sm text-fiestario-stone">
          Ideas visuales creadas por los mejores fotógrafos, diseñadores florales y escenógrafos de México. Conecta directamente con los proveedores detrás de cada montaje.
        </p>
      </div>

      {/* Style Filter Bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        <button
          onClick={() => setSelectedStyle("")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            selectedStyle === ""
              ? "bg-fiestario-carbon text-white shadow-subtle"
              : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
          }`}
        >
          Todos los estilos
        </button>
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedStyle === style
                ? "bg-fiestario-carbon text-white shadow-subtle"
                : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Pinterest-style Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-fiestario-stoneMuted/40 shadow-subtle hover:shadow-card transition-all duration-300"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-fiestario-cream">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>{item.likesCount}</span>
              </div>

              <div className="absolute bottom-4 inset-x-4 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" className="text-[10px] py-0.5">
                    {item.eventType}
                  </Badge>
                  <span className="text-[11px] text-fiestario-champagne font-light">
                    {item.style} · {item.city}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Participating Vendors CTA */}
            <div className="p-4 bg-white border-t border-fiestario-stoneMuted/20 space-y-2">
              <span className="text-[10px] uppercase font-semibold text-fiestario-stone block">
                Proveedores participantes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.vendorNames.map((name, i) => (
                  <span
                    key={i}
                    className="text-xs bg-fiestario-cream px-2.5 py-1 rounded-full text-fiestario-carbon font-medium border border-fiestario-stoneMuted/30"
                  >
                    {name}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link href={`/proveedores/${item.vendorIds[0]}`} className="w-full block">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                    <span>Ver proveedores de este evento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
