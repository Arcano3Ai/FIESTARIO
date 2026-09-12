"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { packages } from "@/data/packages";
import { EventType } from "@/types";
import { formatMXN } from "@/lib/utils";

export default function PaquetesPage() {
  const [selectedType, setSelectedType] = useState<string>("");

  const eventTypes: EventType[] = ["Boda", "Cumpleaños", "XV Años", "Baby Shower", "Corporativo"];

  const filteredPackages = selectedType
    ? packages.filter((p) => p.eventType === selectedType)
    : packages;

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="gold">
          <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
          <span>Hazlo fácil · Todo Incluido</span>
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
          Paquetes para Eventos
        </h1>
        <p className="text-sm text-fiestario-stone">
          Soluciones prediseñadas por los proveedores más solicitados. Ahorra tiempo en cotizaciones y asegura una experiencia armónica con precio cerrado.
        </p>
      </div>

      {/* Type Filter */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        <button
          onClick={() => setSelectedType("")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            selectedType === ""
              ? "bg-fiestario-carbon text-white shadow-subtle"
              : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
          }`}
        >
          Todos los paquetes
        </button>
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedType === type
                ? "bg-fiestario-carbon text-white shadow-subtle"
                : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group flex flex-col bg-white border border-fiestario-stoneMuted/40 rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-fiestario-cream">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="gold" className="backdrop-blur-md">
                  {pkg.eventType}
                </Badge>
              </div>
              {pkg.originalPrice && (
                <div className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  Ahorro {formatMXN(pkg.originalPrice - pkg.price)}
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-fiestario-stone mb-2">
                  <MapPin className="w-3.5 h-3.5 text-fiestario-gold" />
                  <span>{pkg.vendorCity}</span>
                  <span>·</span>
                  <span>Para {pkg.guestCount} personas</span>
                </div>

                <h3 className="font-serif text-xl text-fiestario-carbon font-medium group-hover:text-fiestario-gold transition-colors">
                  {pkg.name}
                </h3>

                <p className="text-xs text-fiestario-stone mt-2 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="mt-4 pt-4 border-t border-fiestario-stoneMuted/30">
                  <span className="text-[11px] font-semibold text-fiestario-carbon block mb-2">
                    Qué incluye este paquete:
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="text-xs text-fiestario-carbon flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-fiestario-stoneMuted/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-fiestario-stone block">
                    Precio Llave en Mano
                  </span>
                  <span className="text-2xl font-serif font-bold text-fiestario-carbon">
                    {formatMXN(pkg.price)}
                  </span>
                </div>

                <Link href={`/proveedores/${pkg.vendorSlug}`}>
                  <Button variant="primary" size="sm">
                    Ver Detalles
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
