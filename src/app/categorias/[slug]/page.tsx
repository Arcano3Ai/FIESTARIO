"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles, Filter } from "lucide-react";
import { VendorCard } from "@/components/shared/vendor-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";

export default function CategoriaSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = categories.find((c) => c.slug === slug || c.id === slug);
  if (!category) {
    notFound();
  }

  const categoryVendors = vendors.filter((v) => v.categoryId === category.id);

  return (
    <div className="min-h-screen bg-fiestario-warmWhite pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-fiestario-stoneMuted/30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs text-fiestario-stone gap-2">
          <Link href="/" className="hover:text-fiestario-carbon transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categorias" className="hover:text-fiestario-carbon transition-colors">
            Categorías
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-fiestario-carbon font-medium">{category.name}</span>
        </div>
      </div>

      {/* Hero Category Banner */}
      <div className="relative bg-fiestario-carbon text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge variant="gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Categoría Verificada FIESTARIO</span>
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed">
            {category.description}
          </p>

          {/* Subcategories pills */}
          <div className="pt-4 flex flex-wrap gap-2">
            {category.subcategories.map((sub, i) => (
              <span
                key={i}
                className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-fiestario-champagne border border-white/15"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vendors in this Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-fiestario-carbon">
            Proveedores en esta categoría ({categoryVendors.length})
          </h2>
          <Link href="/explorar">
            <Button variant="outline" size="sm" className="text-xs">
              Ver con filtros avanzados
            </Button>
          </Link>
        </div>

        {categoryVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-fiestario-stoneMuted/40 text-center space-y-3">
            <h3 className="font-serif text-xl text-fiestario-carbon">
              Estamos integrando más proveedores en esta categoría.
            </h3>
            <p className="text-xs text-fiestario-stone">
              ¿Ofreces este servicio? Puedes registrar tu negocio hoy mismo.
            </p>
            <Link href="/publicar-negocio">
              <Button variant="primary" size="sm">
                Registrar mi negocio
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
