"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/rating-stars";
import { QuoteModal } from "@/components/shared/quote-modal";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";
import { Vendor } from "@/types";

export default function CompararPage() {
  const { compareList, removeFromCompare, clearCompare, allVendors } = useFiestario();
  const [selectedVendorForQuote, setSelectedVendorForQuote] = useState<Vendor | null>(null);

  const comparedVendors = allVendors.filter((v) => compareList.includes(v.id));

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-fiestario-stoneMuted/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-fiestario-gold" />
            <span className="text-xs uppercase font-semibold tracking-wider text-fiestario-gold">
              Herramienta de Decisión
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon">
            Comparador de Proveedores
          </h1>
          <p className="text-xs sm:text-sm text-fiestario-stone mt-1">
            Evalúa hasta 3 opciones frente a frente en términos de precio, reputación y tiempo de respuesta.
          </p>
        </div>

        {comparedVendors.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearCompare} className="text-xs">
            Limpiar lista
          </Button>
        )}
      </div>

      {comparedVendors.length === 0 ? (
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-12 text-center space-y-4 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-fiestario-cream text-fiestario-stone flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8 text-fiestario-gold" />
          </div>
          <h3 className="font-serif text-2xl text-fiestario-carbon">
            Aún no has agregado proveedores para comparar.
          </h3>
          <p className="text-xs sm:text-sm text-fiestario-stone max-w-md mx-auto leading-relaxed">
            Navega por nuestro catálogo y haz clic en el ícono de la báscula en las tarjetas para contrastar opciones.
          </p>
          <Link href="/explorar">
            <Button variant="primary" size="md">
              Explorar Proveedores
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-fiestario-stoneMuted/30 bg-fiestario-cream/30">
                  <th className="p-5 font-semibold text-fiestario-stone uppercase text-[10px] w-1/4">
                    Criterio de Evaluación
                  </th>
                  {comparedVendors.map((vendor) => (
                    <th key={vendor.id} className="p-5 w-1/4 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={vendor.logo}
                            alt={vendor.businessName}
                            className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm"
                          />
                          <div>
                            <h4 className="font-serif text-base text-fiestario-carbon font-medium truncate max-w-[150px]">
                              {vendor.businessName}
                            </h4>
                            <span className="text-[11px] text-fiestario-stone block">
                              {vendor.categoryName}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCompare(vendor.id)}
                          className="p-1 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Quitar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-fiestario-stoneMuted/20 text-fiestario-carbon">
                {/* Precio Base */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Tarifa Base Desde</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5 font-serif text-lg font-bold text-fiestario-carbon">
                      {formatMXN(vendor.startingPrice)}
                    </td>
                  ))}
                </tr>

                {/* Calificación & Reseñas */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Reputación</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5">
                      <RatingStars rating={vendor.rating} size="sm" reviewCount={vendor.reviewCount} />
                    </td>
                  ))}
                </tr>

                {/* Verificación */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Estado FIESTARIO</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5">
                      {vendor.verified ? (
                        <Badge variant="verified">✓ Verificado</Badge>
                      ) : (
                        <Badge variant="subtle">Pendiente</Badge>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Tiempo de Respuesta */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Tiempo de Respuesta</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5 flex items-center gap-1.5 text-emerald-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{vendor.responseTime}</span>
                    </td>
                  ))}
                </tr>

                {/* Ubicación & Cobertura */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Ubicación</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5 text-fiestario-stone">
                      <div className="flex items-center gap-1 text-fiestario-carbon">
                        <MapPin className="w-3.5 h-3.5 text-fiestario-gold" />
                        <span>{vendor.city} ({vendor.zone || vendor.state})</span>
                      </div>
                      <span className="text-[10px] text-fiestario-stone block mt-0.5">
                        {vendor.serviceRadius}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Años de Trayectoria */}
                <tr>
                  <td className="p-5 font-semibold text-fiestario-stone">Experiencia</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5 font-medium">
                      {vendor.yearsExperience} años en eventos
                    </td>
                  ))}
                </tr>

                {/* Acción Directa */}
                <tr className="bg-fiestario-cream/20">
                  <td className="p-5 font-semibold text-fiestario-stone">Decisión</td>
                  {comparedVendors.map((vendor) => (
                    <td key={vendor.id} className="p-5 space-y-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => setSelectedVendorForQuote(vendor)}
                      >
                        Solicitar Cotización
                      </Button>
                      <Link href={`/proveedores/${vendor.slug}`} className="block">
                        <Button variant="ghost" size="sm" className="w-full text-xs">
                          Ver Perfil Completo
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedVendorForQuote && (
        <QuoteModal
          isOpen={true}
          onClose={() => setSelectedVendorForQuote(null)}
          vendor={selectedVendorForQuote}
        />
      )}
    </div>
  );
}
