"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Scale, ShieldCheck, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Vendor } from "@/types";
import { RatingStars } from "@/components/ui/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFiestario } from "@/lib/store";
import { formatMXN, cn } from "@/lib/utils";
import { QuoteModal } from "./quote-modal";

interface VendorCardProps {
  vendor: Vendor;
  className?: string;
}

export function VendorCard({ vendor, className }: VendorCardProps) {
  const { toggleFavorite, isFavorite, compareList, toggleCompare } = useFiestario();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const favorited = isFavorite(vendor.id);
  const isCompared = compareList.includes(vendor.id);

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col bg-white border border-fiestario-stoneMuted/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1",
          className
        )}
      >
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-fiestario-cream">
          <img
            src={vendor.coverImage}
            alt={vendor.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {vendor.verified && (
              <Badge variant="verified" className="shadow-sm backdrop-blur-md">
                ✓ Verificado
              </Badge>
            )}
            {vendor.badges.includes("Top Proveedor") && (
              <Badge variant="gold" className="shadow-sm backdrop-blur-md">
                Top Proveedor
              </Badge>
            )}
          </div>

          {/* Action Buttons (Heart & Compare) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare(vendor.id);
              }}
              title={isCompared ? "Quitar de comparador" : "Comparar proveedor"}
              className={cn(
                "p-2 rounded-full backdrop-blur-md transition-all",
                isCompared
                  ? "bg-fiestario-gold text-white shadow-subtle"
                  : "bg-white/80 text-fiestario-carbon hover:bg-white"
              )}
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Heart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(vendor.id);
              }}
              title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
              className={cn(
                "p-2 rounded-full backdrop-blur-md transition-all active:scale-125",
                favorited
                  ? "bg-rose-50 text-rose-600"
                  : "bg-white/80 text-fiestario-carbon hover:bg-white"
              )}
            >
              <Heart className={cn("w-4 h-4", favorited && "fill-rose-600 text-rose-600")} />
            </button>
          </div>

          {/* Bottom Overlay Info (Category and Starting Price) */}
          <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-white z-10">
            <span className="text-xs font-medium tracking-wide bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-fiestario-champagne border border-white/10">
              {vendor.categoryName}
            </span>
            <div className="text-right">
              <span className="block text-[10px] text-gray-300 font-light">Desde</span>
              <span className="text-base font-serif font-bold text-white tracking-wide">
                {formatMXN(vendor.startingPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-fiestario-stone mb-2">
            <RatingStars rating={vendor.rating} reviewCount={vendor.reviewCount} size="sm" />
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>
                {vendor.zone ? `${vendor.zone}, ` : ""}
                {vendor.city}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <Link href={`/proveedores/${vendor.slug}`} className="group/title">
            <h3 className="font-serif text-lg text-fiestario-carbon font-medium group-hover/title:text-fiestario-gold transition-colors line-clamp-1">
              {vendor.businessName}
            </h3>
            <p className="text-xs text-fiestario-stone mt-1 line-clamp-2 leading-relaxed">
              {vendor.tagline}
            </p>
          </Link>

          {/* Highlights & Response Time */}
          <div className="mt-3.5 pt-3 border-t border-fiestario-stoneMuted/30 flex items-center justify-between text-[11px] text-fiestario-stone">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>Responde {vendor.responseTime}</span>
            </div>
            <span className="text-fiestario-stoneLight">
              {vendor.yearsExperience} años de exp.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 pt-3 flex items-center gap-2">
            <Link href={`/proveedores/${vendor.slug}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Ver perfil
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsQuoteOpen(true)}
              className="flex-1 text-xs bg-fiestario-carbon hover:bg-black"
            >
              Cotizar
            </Button>
          </div>
        </div>
      </div>

      {/* Quote Drawer / Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        vendor={vendor}
      />
    </>
  );
}
