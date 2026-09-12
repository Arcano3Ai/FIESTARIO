"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  Heart,
  Scale,
  Share2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  Instagram,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/rating-stars";
import { QuoteModal } from "@/components/shared/quote-modal";
import { vendors } from "@/data/vendors";
import { services } from "@/data/services";
import { packages } from "@/data/packages";
import { reviews as allReviews } from "@/data/reviews";
import { useFiestario } from "@/lib/store";
import { formatMXN, cn } from "@/lib/utils";
import { Service, Package } from "@/types";

export default function VendorProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { isFavorite, toggleFavorite, compareList, toggleCompare } = useFiestario();

  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) {
    notFound();
  }

  const vendorServices = services.filter((s) => s.vendorId === vendor.id);
  const vendorPackages = packages.filter((p) => p.vendorId === vendor.id);
  const vendorReviews = allReviews.filter((r) => r.vendorId === vendor.id);

  const [activeTab, setActiveTab] = useState<
    "resumen" | "servicios" | "paquetes" | "galeria" | "resenas" | "disponibilidad" | "faqs"
  >("resumen");

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<Service | undefined>(undefined);

  const favorited = isFavorite(vendor.id);
  const isCompared = compareList.includes(vendor.id);

  const openQuoteWithService = (srv?: Service) => {
    setSelectedServiceForQuote(srv);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-fiestario-warmWhite pb-24">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-fiestario-stoneMuted/30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs text-fiestario-stone gap-2">
          <Link href="/" className="hover:text-fiestario-carbon transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/explorar" className="hover:text-fiestario-carbon transition-colors">
            Proveedores
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-fiestario-carbon font-medium">{vendor.businessName}</span>
        </div>
      </div>

      {/* Hero Gallery (Section 18 of Spec) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-subtle bg-fiestario-carbon max-h-[480px]">
          {/* Main Large Image */}
          <div className="lg:col-span-2 relative aspect-[16/10] lg:aspect-auto h-full overflow-hidden">
            <img
              src={vendor.coverImage}
              alt={vendor.businessName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Grid of secondary images */}
          <div className="hidden lg:grid col-span-2 grid-cols-2 gap-3">
            {vendor.gallery.slice(0, 4).map((imgUrl, i) => (
              <div key={i} className="relative aspect-video lg:aspect-auto h-[235px] overflow-hidden">
                <img
                  src={imgUrl}
                  alt={`${vendor.businessName} fotografía ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Quote Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details & Tabs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {vendor.verified && (
                    <Badge variant="verified">
                      ✓ PROVEEDOR VERIFICADO
                    </Badge>
                  )}
                  {vendor.badges.map((b, i) => (
                    <Badge key={i} variant="gold">
                      {b}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCompare(vendor.id)}
                    className={cn(
                      "p-2 rounded-full border text-xs transition-colors",
                      isCompared
                        ? "bg-fiestario-gold text-white border-fiestario-gold"
                        : "border-fiestario-stoneMuted/50 text-fiestario-stone hover:text-fiestario-carbon"
                    )}
                    title="Comparar"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(vendor.id)}
                    className={cn(
                      "p-2 rounded-full border text-xs transition-colors",
                      favorited
                        ? "bg-rose-50 text-rose-600 border-rose-200"
                        : "border-fiestario-stoneMuted/50 text-fiestario-stone hover:text-fiestario-carbon"
                    )}
                    title="Favorito"
                  >
                    <Heart className={cn("w-4 h-4", favorited && "fill-rose-600")} />
                  </button>
                </div>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon font-medium">
                  {vendor.businessName}
                </h1>
                <p className="text-sm text-fiestario-stone mt-1">
                  {vendor.tagline}
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-fiestario-stoneMuted/30 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Calificación</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <RatingStars rating={vendor.rating} size="sm" showValue={false} />
                    <span className="font-bold text-fiestario-carbon">{vendor.rating}</span>
                  </div>
                  <span className="text-[10px] text-fiestario-stone">({vendor.reviewCount} reseñas)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Experiencia</span>
                  <span className="font-semibold text-fiestario-carbon mt-0.5 block">
                    {vendor.yearsExperience} años
                  </span>
                  <span className="text-[10px] text-fiestario-stone">en eventos sociales</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Tiempo Respuesta</span>
                  <span className="font-semibold text-emerald-700 mt-0.5 block">
                    {vendor.responseTime}
                  </span>
                  <span className="text-[10px] text-fiestario-stone">vía chat FIESTARIO</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Ubicación</span>
                  <span className="font-semibold text-fiestario-carbon mt-0.5 block truncate">
                    {vendor.city}
                  </span>
                  <span className="text-[10px] text-fiestario-stone truncate block">
                    {vendor.zone || vendor.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-fiestario-stoneMuted/40">
              {[
                { id: "resumen", label: "Resumen" },
                { id: "servicios", label: `Servicios (${vendorServices.length})` },
                { id: "paquetes", label: `Paquetes (${vendorPackages.length})` },
                { id: "galeria", label: "Galería" },
                { id: "resenas", label: `Reseñas (${vendorReviews.length})` },
                { id: "disponibilidad", label: "Disponibilidad" },
                { id: "faqs", label: "Preguntas" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-fiestario-carbon text-white shadow-subtle"
                      : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: RESUMEN */}
            {activeTab === "resumen" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon mb-3">
                    Acerca de {vendor.businessName}
                  </h3>
                  <p className="text-sm text-fiestario-carbon leading-relaxed font-light">
                    {vendor.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-fiestario-stoneMuted/30">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-fiestario-stone mb-3">
                    Especialidades & Tipos de Evento
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.eventTypes.map((et, i) => (
                      <Badge key={i} variant="subtle">
                        {et}
                      </Badge>
                    ))}
                    {vendor.styles.map((st, i) => (
                      <Badge key={i} variant="gold">
                        Estilo {st}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-fiestario-stoneMuted/30">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-fiestario-stone mb-2">
                    Área de Cobertura y Servicio
                  </h4>
                  <p className="text-xs text-fiestario-stone flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-fiestario-gold" />
                    <span>{vendor.serviceRadius}</span>
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SERVICIOS */}
            {activeTab === "servicios" && (
              <div className="space-y-4 animate-fade-in">
                {vendorServices.length > 0 ? (
                  vendorServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white p-6 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle flex flex-col sm:flex-row gap-6 justify-between items-start"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="subtle">{srv.duration || "Servicio por evento"}</Badge>
                          {srv.capacityMax && (
                            <span className="text-[11px] text-fiestario-stone">
                              Hasta {srv.capacityMax} personas
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-xl text-fiestario-carbon font-medium">
                          {srv.name}
                        </h4>
                        <p className="text-xs text-fiestario-stone leading-relaxed">
                          {srv.description}
                        </p>

                        <div className="pt-2">
                          <span className="text-[11px] font-semibold text-fiestario-carbon block mb-1">
                            Incluye:
                          </span>
                          <ul className="space-y-1">
                            {srv.inclusions.map((inc, i) => (
                              <li key={i} className="text-xs text-fiestario-stone flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-fiestario-stoneMuted/30 flex flex-row sm:flex-col justify-between items-center sm:items-end gap-3">
                        <div>
                          <span className="text-[10px] text-fiestario-stone block uppercase">Desde</span>
                          <span className="font-serif text-xl font-bold text-fiestario-carbon">
                            {formatMXN(srv.priceFrom)}
                          </span>
                          {srv.pricingType === "PER_PERSON" && (
                            <span className="text-[10px] text-fiestario-stone block">por persona</span>
                          )}
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openQuoteWithService(srv)}
                        >
                          Cotizar Servicio
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-fiestario-stoneMuted/40 text-center text-sm text-fiestario-stone">
                    Este proveedor cotiza a la medida de tu celebración. Solicita una cotización general.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: PAQUETES */}
            {activeTab === "paquetes" && (
              <div className="space-y-4 animate-fade-in">
                {vendorPackages.length > 0 ? (
                  vendorPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white p-6 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle flex flex-col sm:flex-row gap-6 justify-between items-start"
                    >
                      <div className="space-y-2 flex-1">
                        <Badge variant="gold">{pkg.eventType}</Badge>
                        <h4 className="font-serif text-xl text-fiestario-carbon font-medium">
                          {pkg.name}
                        </h4>
                        <p className="text-xs text-fiestario-stone">
                          {pkg.description}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {pkg.inclusions.map((inc, i) => (
                            <li key={i} className="text-xs text-fiestario-stone flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:text-right shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-fiestario-stoneMuted/30 flex flex-row sm:flex-col justify-between items-center sm:items-end gap-3">
                        <div>
                          <span className="text-[10px] text-fiestario-stone block uppercase">Paquete Cerrado</span>
                          <span className="font-serif text-2xl font-bold text-fiestario-carbon">
                            {formatMXN(pkg.price)}
                          </span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openQuoteWithService()}
                        >
                          Elegir Paquete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-fiestario-stoneMuted/40 text-center text-sm text-fiestario-stone">
                    No hay paquetes estandarizados. Todos los presupuestos se personalizan según tus requerimientos.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: GALERÍA */}
            {activeTab === "galeria" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {vendor.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-fiestario-cream shadow-subtle">
                    <img src={img} alt={`Galería ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: RESEÑAS */}
            {activeTab === "resenas" && (
              <div className="space-y-4 animate-fade-in">
                {vendorReviews.length > 0 ? (
                  vendorReviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-6 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.customerAvatar}
                            alt={rev.customerName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h5 className="text-xs font-semibold text-fiestario-carbon">{rev.customerName}</h5>
                            <span className="text-[10px] text-fiestario-stone">{rev.eventType} · {rev.date}</span>
                          </div>
                        </div>
                        <RatingStars rating={rev.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-xs sm:text-sm text-fiestario-carbon italic leading-relaxed">
                        "{rev.comment}"
                      </p>
                      {rev.vendorReply && (
                        <div className="p-3 bg-fiestario-cream/50 rounded-xl text-xs text-fiestario-stone border-l-2 border-fiestario-gold">
                          <span className="font-semibold text-fiestario-carbon block mb-0.5">Respuesta del proveedor:</span>
                          {rev.vendorReply}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-fiestario-stoneMuted/40 text-center text-sm text-fiestario-stone">
                    Este proveedor cuenta con calificación global de {vendor.rating} ★ verificada por auditoría de eventos.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: DISPONIBILIDAD */}
            {activeTab === "disponibilidad" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle space-y-4 animate-fade-in">
                <h3 className="font-serif text-2xl text-fiestario-carbon">
                  Calendario & Temporadas
                </h3>
                <p className="text-xs text-fiestario-stone leading-relaxed">
                  Este proveedor acepta reservas con hasta 18 meses de anticipación. Para fechas de alta demanda (fines de semana de octubre a diciembre y mayo a junio), recomendamos solicitar cotización con al menos 6 meses de anticipación.
                </p>
                <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Actualmente recibiendo solicitudes para 2025 y 2026.</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PREGUNTAS FRECUENTES */}
            {activeTab === "faqs" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-fiestario-stoneMuted/40 shadow-subtle space-y-4 animate-fade-in">
                <h3 className="font-serif text-2xl text-fiestario-carbon mb-2">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-3">
                  {(vendor.faqs || [
                    { question: "¿Cómo es el esquema de pagos y anticipos?", answer: "Normalmente se solicita un 30% al firmar contrato para apartar la fecha y el saldo restante una semana previa al evento." },
                    { question: "¿Qué pasa en caso de cambio de fecha?", answer: "Las reprogramaciones están sujetas a disponibilidad del calendario sin penalización avisando con al menos 30 días de anticipación." },
                  ]).map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-fiestario-cream/30 border border-fiestario-stoneMuted/30">
                      <h5 className="text-xs font-semibold text-fiestario-carbon mb-1">{faq.question}</h5>
                      <p className="text-xs text-fiestario-stone leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Quote Card (Section 18 & 65) */}
          <div className="space-y-6">
            <div className="sticky top-28 bg-white border border-fiestario-stoneMuted/50 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
                <div>
                  <span className="text-[10px] text-fiestario-stone uppercase tracking-wider block">
                    Tarifa Base Desde
                  </span>
                  <span className="font-serif text-3xl font-bold text-fiestario-carbon">
                    {formatMXN(vendor.startingPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Disponible
                  </span>
                </div>
              </div>

              {/* Guarantees list */}
              <div className="space-y-2.5 text-xs text-fiestario-carbon">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-fiestario-gold shrink-0" />
                  <span>Proveedor Verificado por FIESTARIO</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-fiestario-gold shrink-0" />
                  <span>Responde en promedio {vendor.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-fiestario-gold shrink-0" />
                  <span>Garantía de cotización formal en 24h</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => openQuoteWithService()}
                className="w-full bg-fiestario-carbon hover:bg-black font-semibold text-sm shadow-card"
              >
                Solicitar Cotización Formal
              </Button>

              <p className="text-[11px] text-fiestario-stone text-center">
                Sin compromiso. Contacto directo y protegido por la plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Modal for Quote */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        vendor={vendor}
        service={selectedServiceForQuote}
      />
    </div>
  );
}
