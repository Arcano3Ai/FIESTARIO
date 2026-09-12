"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  Map as MapIcon,
  Grid,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { VendorCard } from "@/components/shared/vendor-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { useFiestario } from "@/lib/store";
import { EventStyle } from "@/types";
import { formatMXN } from "@/lib/utils";

function ExplorarContent() {
  const searchParams = useSearchParams();
  const { allVendors } = useFiestario();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("ciudad") || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedPinVendor, setSelectedPinVendor] = useState<string | null>(null);

  const priceRanges = [
    { label: "Todos", value: "" },
    { label: "< $5,000 MXN", value: "under5k", max: 5000 },
    { label: "$5,000 - $15,000 MXN", value: "5to15k", min: 5000, max: 15000 },
    { label: "$15,000 - $35,000 MXN", value: "15to35k", min: 15000, max: 35000 },
    { label: "$35,000+ MXN", value: "over35k", min: 35000 },
  ];

  const styles: EventStyle[] = [
    "Elegante",
    "Minimalista",
    "Boho Chic",
    "Mexicano Contemporáneo",
    "Moderno",
    "Lujo & Editorial",
    "Rústico Campestre",
  ];

  // Filtering Logic
  const filteredVendors = useMemo(() => {
    return allVendors.filter((vendor) => {
      // Free text search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = vendor.businessName.toLowerCase().includes(q);
        const matchCat = vendor.categoryName.toLowerCase().includes(q);
        const matchTag = vendor.tagline.toLowerCase().includes(q);
        const matchCity = vendor.city.toLowerCase().includes(q);
        const matchSub = vendor.subcategories.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchTag && !matchCity && !matchSub) return false;
      }

      // Category
      if (selectedCategory && vendor.categoryId !== selectedCategory) {
        return false;
      }

      // City
      if (selectedCity && !vendor.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Rating
      if (minRating > 0 && vendor.rating < minRating) {
        return false;
      }

      // Verified
      if (onlyVerified && !vendor.verified) {
        return false;
      }

      // Style
      if (selectedStyle && !vendor.styles.includes(selectedStyle as EventStyle)) {
        return false;
      }

      // Price
      if (selectedPriceRange === "under5k" && vendor.startingPrice >= 5000) return false;
      if (selectedPriceRange === "5to15k" && (vendor.startingPrice < 5000 || vendor.startingPrice > 15000)) return false;
      if (selectedPriceRange === "15to35k" && (vendor.startingPrice < 15000 || vendor.startingPrice > 35000)) return false;
      if (selectedPriceRange === "over35k" && vendor.startingPrice < 35000) return false;

      return true;
    });
  }, [allVendors, searchQuery, selectedCategory, selectedCity, minRating, onlyVerified, selectedStyle, selectedPriceRange]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedCity ? 1 : 0) +
    (selectedPriceRange ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyVerified ? 1 : 0) +
    (selectedStyle ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCity("");
    setSelectedPriceRange("");
    setMinRating(0);
    setOnlyVerified(false);
    setSelectedStyle("");
  };

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Search Bar & View Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon">
            Explorar Proveedores
          </h1>
          <p className="text-xs sm:text-sm text-fiestario-stone mt-1">
            {filteredVendors.length} {filteredVendors.length === 1 ? "proveedor encontrado" : "proveedores encontrados"}
            {selectedCity && ` en ${selectedCity}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filters Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-fiestario-gold" />
            <span>Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </Button>

          {/* Grid vs Map Toggle */}
          <div className="flex items-center bg-white border border-fiestario-stoneMuted/40 rounded-full p-1 shadow-subtle">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-fiestario-carbon text-white shadow-sm"
                  : "text-fiestario-stone hover:text-fiestario-carbon"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cuadrícula</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "map"
                  ? "bg-fiestario-carbon text-white shadow-sm"
                  : "text-fiestario-stone hover:text-fiestario-carbon"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-fiestario-stoneMuted/30">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fiestario-carbon">
              Filtros
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-rose-600 hover:underline font-medium"
              >
                Limpiar todo ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Búsqueda Libre
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-fiestario-stone absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nombre, servicio o estilo..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold cursor-pointer bg-white"
            >
              <option value="">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.vendorCount})
                </option>
              ))}
            </select>
          </div>

          {/* City Selector */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Ciudad
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold cursor-pointer bg-white"
            >
              <option value="">Todas las ciudades</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-fiestario-carbon cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-fiestario-gold focus:ring-fiestario-gold/50"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Solo Proveedores Verificados
              </span>
            </label>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Rango de Precio
            </label>
            <div className="space-y-1 text-xs">
              {priceRanges.map((pr) => (
                <label key={pr.value} className="flex items-center gap-2 cursor-pointer text-fiestario-stone hover:text-fiestario-carbon">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === pr.value}
                    onChange={() => setSelectedPriceRange(pr.value)}
                    className="text-fiestario-gold focus:ring-fiestario-gold"
                  />
                  <span>{pr.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Calificación Mínima
            </label>
            <div className="flex items-center gap-1.5">
              {[4.0, 4.5, 4.9].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    minRating === rate
                      ? "bg-fiestario-carbon text-white border-fiestario-carbon"
                      : "border-fiestario-stoneMuted/40 text-fiestario-stone hover:bg-fiestario-cream/40"
                  }`}
                >
                  {rate}+ ★
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1.5">
              Estilo Visual
            </label>
            <div className="flex flex-wrap gap-1.5">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedStyle(selectedStyle === s ? "" : s)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    selectedStyle === s
                      ? "bg-fiestario-champagne/40 text-fiestario-carbon font-semibold border-fiestario-gold/50"
                      : "border-fiestario-stoneMuted/40 text-fiestario-stone hover:bg-fiestario-cream"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {viewMode === "grid" ? (
            filteredVendors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              /* Empty State (as required in Section 66) */
              <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-12 text-center space-y-4 shadow-subtle">
                <div className="w-14 h-14 rounded-full bg-fiestario-cream text-fiestario-stone flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6 text-fiestario-gold" />
                </div>
                <h3 className="font-serif text-2xl text-fiestario-carbon">
                  No encontramos proveedores con estos filtros.
                </h3>
                <p className="text-xs sm:text-sm text-fiestario-stone max-w-sm mx-auto">
                  Prueba ampliando el rango de presupuesto, seleccionando otra categoría o limpiando la búsqueda.
                </p>
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Restablecer todos los filtros
                </Button>
              </div>
            )
          ) : (
            /* Map View Section (as required in Section 32) */
            <div className="relative w-full h-[650px] rounded-3xl overflow-hidden border border-fiestario-stoneMuted/50 shadow-card bg-fiestario-cream/60 flex flex-col justify-between p-4">
              {/* Interactive Stylized Map Canvas Simulation */}
              <div className="absolute inset-0 bg-[#E8ECE9] opacity-70" />

              {/* Decorative Map Grids and River/Topography Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* Header inside Map */}
              <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-fiestario-stoneMuted/30 w-fit shadow-subtle">
                <span className="text-xs font-semibold text-fiestario-carbon">
                  Vista Satélite & Mapa de Ubicaciones · {filteredVendors.length} proveedores
                </span>
              </div>

              {/* Map Pins */}
              <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-center gap-12 p-8">
                {filteredVendors.slice(0, 8).map((vendor, idx) => (
                  <div key={vendor.id} className="relative group">
                    <button
                      onClick={() =>
                        setSelectedPinVendor(selectedPinVendor === vendor.id ? null : vendor.id)
                      }
                      className={`p-2.5 rounded-full shadow-dropdown transition-transform transform hover:scale-125 flex items-center justify-center ${
                        selectedPinVendor === vendor.id
                          ? "bg-fiestario-gold text-white ring-4 ring-fiestario-gold/30 scale-110"
                          : "bg-fiestario-carbon text-white"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </button>

                    {/* Tooltip on pin */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded text-[10px] font-medium shadow-sm whitespace-nowrap text-fiestario-carbon border border-gray-200">
                      {vendor.businessName}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini Card for Selected Pin */}
              {selectedPinVendor && (
                <div className="relative z-20 max-w-sm bg-white border border-fiestario-stoneMuted/50 rounded-2xl p-4 shadow-dropdown animate-slide-up flex items-center justify-between gap-4">
                  {(() => {
                    const vend = allVendors.find((v) => v.id === selectedPinVendor);
                    if (!vend) return null;
                    return (
                      <>
                        <img
                          src={vend.coverImage}
                          alt={vend.businessName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-fiestario-carbon truncate">
                            {vend.businessName}
                          </h4>
                          <p className="text-xs text-fiestario-stone">{vend.city}</p>
                          <p className="text-xs font-serif font-bold text-fiestario-gold">
                            Desde {formatMXN(vend.startingPrice)}
                          </p>
                        </div>
                        <a
                          href={`/proveedores/${vend.slug}`}
                          className="text-xs bg-fiestario-carbon text-white px-3 py-1.5 rounded-full font-medium"
                        >
                          Ver
                        </a>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorarPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Cargando proveedores...</div>}>
      <ExplorarContent />
    </Suspense>
  );
}
