"use client";

import React from "react";
import Link from "next/link";
import { Heart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VendorCard } from "@/components/shared/vendor-card";
import { useFiestario } from "@/lib/store";

export default function FavoritosPage() {
  const { favorites, allVendors } = useFiestario();

  const favoritedVendors = allVendors.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="text-xs uppercase font-semibold tracking-wider text-fiestario-stone">
              Colección Personal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon">
            Proveedores Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-fiestario-stone mt-1">
            {favoritedVendors.length} profesionales guardados para tu evento.
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            <span>Volver a Mi Evento</span>
          </Button>
        </Link>
      </div>

      {favoritedVendors.length === 0 ? (
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-12 text-center space-y-4 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl text-fiestario-carbon">
            No has guardado proveedores todavía.
          </h3>
          <p className="text-xs sm:text-sm text-fiestario-stone max-w-sm mx-auto">
            Explora nuestro catálogo y haz clic en el corazón para tener a la mano tus opciones preferidas.
          </p>
          <Link href="/explorar">
            <Button variant="primary">Explorar Proveedores</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritedVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
}
