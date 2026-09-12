"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Sparkles, Building2 } from "lucide-react";
import { VendorCard } from "@/components/shared/vendor-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { vendors } from "@/data/vendors";

export default function CiudadSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const city = cities.find((c) => c.slug === slug || c.id === slug);
  if (!city) {
    notFound();
  }

  const cityVendors = vendors.filter(
    (v) =>
      v.city.toLowerCase().includes(city.name.toLowerCase()) ||
      city.name.toLowerCase().includes(v.city.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-fiestario-warmWhite pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-fiestario-stoneMuted/30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs text-fiestario-stone gap-2">
          <Link href="/" className="hover:text-fiestario-carbon transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Ciudades</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-fiestario-carbon font-medium">{city.name}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-fiestario-carbon text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge variant="gold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Guía Oficial de Eventos · {city.state}</span>
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light">
            Eventos en {city.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed">
            Descubre las mejores quintas campestres, haciendas, banqueteros de autor y producciones audiovisuales en {city.name} y sus zonas más exclusivas.
          </p>

          {/* Zones */}
          <div className="pt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-400 font-medium">Zonas populares:</span>
            {city.popularZones.map((z, i) => (
              <span
                key={i}
                className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-fiestario-champagne border border-white/15"
              >
                {z}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vendors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-fiestario-carbon">
            Proveedores destacados en {city.name} ({cityVendors.length})
          </h2>
          <Link href={`/explorar?ciudad=${encodeURIComponent(city.name)}`}>
            <Button variant="outline" size="sm" className="text-xs">
              Filtrar en {city.name}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}
