"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Heart,
  Store,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { SearchOmnibox } from "@/components/shared/search-omnibox";
import { VendorCard } from "@/components/shared/vendor-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";
import { packages } from "@/data/packages";
import { inspirationItems } from "@/data/inspiration";
import { reviews } from "@/data/reviews";
import { cities } from "@/data/cities";
import { formatMXN } from "@/lib/utils";

export default function HomePage() {
  const [selectedCityTab, setSelectedCityTab] = useState("Monterrey");

  const featuredVendors = vendors.filter((v) => v.featured).slice(0, 6);
  const nearbyVendors = vendors.filter((v) => v.city.includes(selectedCityTab)).slice(0, 4);

  const eventTypesList = [
    { title: "Bodas de Ensueño", type: "Boda", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", count: "120+ proveedores" },
    { title: "Cumpleaños Boutique", type: "Cumpleaños", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80", count: "95+ proveedores" },
    { title: "XV Años Inolvidables", type: "XV Años", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80", count: "80+ proveedores" },
    { title: "Baby Shower & Gender Reveal", type: "Baby Shower", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80", count: "65+ proveedores" },
    { title: "Galas & Corporativos", type: "Corporativo", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80", count: "50+ proveedores" },
    { title: "Bautizos & Primeras Comuniones", type: "Bautizo", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80", count: "40+ proveedores" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ============================================================ */}
      {/* 1. HERO SECTION & 2. SEARCH                                  */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-fiestario-carbon text-white">
        {/* Cinematic Backdrop with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
            alt="Celebración exclusiva de Fiestario"
            className="w-full h-full object-cover opacity-35 scale-105 transform animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fiestario-carbon via-fiestario-carbon/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-8 pb-10">
          {/* Editorial pill tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-fiestario-champagne text-xs uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
            <span>The Premium Event Marketplace for Mexico</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
            TODO PARA CELEBRAR.
            <br />
            <span className="font-normal italic text-fiestario-champagne">
              EN UN SOLO LUGAR.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Encuentra lugares de ensueño, banquetes de autor, decoración y experiencias para hacer de tu evento algo inolvidable.
          </p>

          {/* SECTION 2: SEARCH OMNIBOX */}
          <div className="pt-6 max-w-4xl mx-auto">
            <SearchOmnibox />
          </div>

          {/* Social Proof Stats */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-gray-300 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Proveedores Verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9 Calificación Promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-fiestario-champagne" />
              <span>Cotizaciones en Menos de 2 Horas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. POPULAR CATEGORIES                                        */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
              Catálogo Curado
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
              Categorías Esenciales
            </h2>
          </div>
          <Link
            href="/categorias"
            className="group flex items-center gap-1 text-sm font-medium text-fiestario-carbon hover:text-fiestario-gold transition-colors mt-3 md:mt-0"
          >
            <span>Ver las 18 categorías</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="group relative flex flex-col bg-white border border-fiestario-stoneMuted/40 rounded-2xl sm:rounded-3xl overflow-hidden p-4 shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 bg-fiestario-cream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-xs sm:text-sm text-fiestario-carbon group-hover:text-fiestario-gold transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-fiestario-stone mt-0.5">
                {cat.vendorCount} proveedores
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURED VENDORS ("Los favoritos de FIESTARIO")           */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-fiestario-cream/30 border-y border-fiestario-stoneMuted/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-fiestario-gold" />
              <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
                Selección de Excelencia
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon">
              Los favoritos de FIESTARIO
            </h2>
            <p className="text-sm text-fiestario-stone mt-1 max-w-xl">
              Proveedores con reputación intachable, verificados por nuestro equipo con inspección de servicio y altas calificaciones.
            </p>
          </div>
          <Link
            href="/explorar"
            className="group flex items-center gap-1 text-sm font-medium text-fiestario-carbon hover:text-fiestario-gold transition-colors mt-4 md:mt-0"
          >
            <span>Explorar todos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BROWSE BY EVENT                                           */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
            ¿Qué vas a celebrar?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
            Explora por Tipo de Evento
          </h2>
          <p className="text-sm text-fiestario-stone mt-2">
            Cada ocasión requiere requerimientos distintos. Filtra locaciones y servicios adaptados a tu celebración.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypesList.map((item) => (
            <Link
              key={item.type}
              href={`/explorar?tipo=${encodeURIComponent(item.type)}`}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-fiestario-champagne/90 mt-1">{item.count}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-fiestario-gold transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. INSPIRATION SECTION                                       */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white border-y border-fiestario-stoneMuted/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
              Muro Visual
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
              Inspiración Real de Eventos
            </h2>
            <p className="text-sm text-fiestario-stone mt-1 max-w-xl">
              Fotografías de eventos reales celebrados en México. Haz clic en cualquier imagen para ver los proveedores participantes.
            </p>
          </div>
          <Link
            href="/inspiracion"
            className="group flex items-center gap-1 text-sm font-medium text-fiestario-carbon hover:text-fiestario-gold transition-colors mt-3 md:mt-0"
          >
            <span>Ver galería completa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inspirationItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href="/inspiracion"
              className="group relative rounded-2xl overflow-hidden bg-fiestario-cream aspect-[4/5] shadow-subtle hover:shadow-card transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{item.likesCount}</span>
              </div>
              <div className="absolute bottom-4 inset-x-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-fiestario-champagne block">
                  {item.style} · {item.city}
                </span>
                <h4 className="font-serif text-sm font-medium text-white line-clamp-2 mt-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-300 mt-1 truncate">
                  Por {item.vendorNames.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PACKAGES ("Hazlo fácil")                                  */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
              Soluciones Integrales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
              Hazlo fácil: Paquetes Llave en Mano
            </h2>
            <p className="text-sm text-fiestario-stone mt-1 max-w-xl">
              Ahorra tiempo y presupuesto con paquetes coordinados por los mejores proveedores para cada tipo de fiesta.
            </p>
          </div>
          <Link
            href="/paquetes"
            className="group flex items-center gap-1 text-sm font-medium text-fiestario-carbon hover:text-fiestario-gold transition-colors mt-3 md:mt-0"
          >
            <span>Ver todos los paquetes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {packages.slice(0, 3).map((pkg) => (
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
                    Ahorro de {formatMXN(pkg.originalPrice - pkg.price)}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
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

                  <ul className="mt-4 space-y-1.5 border-t border-fiestario-stoneMuted/30 pt-3">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <li key={i} className="text-xs text-fiestario-carbon flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-fiestario-stoneMuted/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-fiestario-stone block">
                      Precio cerrado
                    </span>
                    <span className="text-xl font-serif font-bold text-fiestario-carbon">
                      {formatMXN(pkg.price)}
                    </span>
                  </div>

                  <Link href={`/proveedores/${pkg.vendorSlug}`}>
                    <Button variant="primary" size="sm">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. BUILD YOUR EVENT (Banner interactivo central)             */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-fiestario-carbon text-white p-8 sm:p-14 shadow-dropdown border border-fiestario-border">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-fiestario-champagne/20 text-fiestario-champagne text-xs font-semibold px-3 py-1 rounded-full border border-fiestario-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>Herramienta Central de FIESTARIO</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              ¿QUÉ VAS A CELEBRAR?
              <br />
              <span className="font-normal italic text-fiestario-champagne">
                Arma tu evento paso a paso.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Dinos tu número de invitados, ciudad, presupuesto y estilo. FIESTARIO generará automáticamente tu checklist cronológico, desglose financiero recomendado y te conectará con los proveedores que hacen match perfecto.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link href="/arma-tu-evento">
                <Button variant="gold" size="lg" className="gap-2 font-medium">
                  <span>Comenzar ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/ia-planner">
                <Button variant="secondary" size="lg" className="text-white border-white/30 hover:bg-white/10 gap-2">
                  <Sparkles className="w-4 h-4 text-fiestario-gold" />
                  <span>Usar Planeador IA</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 lg:opacity-40 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1519225429949-34b223c28df0?auto=format&fit=crop&w=1200&q=80"
              alt="Arma tu evento con Fiestario"
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-fiestario-carbon via-fiestario-carbon/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. NEARBY VENDORS (Proveedores Cercanos)                     */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-fiestario-cream/30 border-y border-fiestario-stoneMuted/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
              Geolocalización
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
              Proveedores Destacados en tu Región
            </h2>
          </div>

          {/* City switcher pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-2 mt-4 md:mt-0">
            {["Monterrey", "San Pedro Garza García", "Ciudad de México", "San Miguel de Allende"].map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSelectedCityTab(cityName)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCityTab === cityName
                    ? "bg-fiestario-carbon text-white shadow-subtle"
                    : "bg-white text-fiestario-stone border border-fiestario-stoneMuted/40 hover:bg-fiestario-cream"
                }`}
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. HOW FIESTARIO WORKS                                      */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
            Metodología
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
            Cómo Funciona FIESTARIO
          </h2>
          <p className="text-sm text-fiestario-stone mt-2">
            La forma moderna de organizar cualquier celebración sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "EXPLORA", desc: "Descubre quintas, fotógrafos, taquizas y servicios especializados en tu ciudad con precios claros." },
            { step: "02", title: "COMPARA", desc: "Revisa calificaciones verificadas, tiempos de respuesta y compara cotizaciones lado a lado." },
            { step: "03", title: "COTIZA", desc: "Chatea directamente con proveedores dentro de la plataforma y asegura la fecha de tu evento." },
            { step: "04", title: "CELEBRA", desc: "Disfruta de tu celebración con la tranquilidad de contar con los mejores profesionales de México." },
          ].map((item) => (
            <div
              key={item.step}
              className="relative p-6 sm:p-8 bg-white border border-fiestario-stoneMuted/40 rounded-3xl shadow-subtle flex flex-col justify-between"
            >
              <span className="font-serif text-5xl font-light text-fiestario-champagne/80 block mb-4">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-fiestario-carbon mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-fiestario-stone leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. TESTIMONIALS                                             */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-fiestario-cream/20 border-t border-fiestario-stoneMuted/40">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-fiestario-gold uppercase">
            Experiencias Reales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon mt-1">
            Lo que dicen nuestros anfitriones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-8 bg-white border border-fiestario-stoneMuted/40 rounded-3xl shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-fiestario-carbon italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-fiestario-stoneMuted/30 flex items-center gap-3">
                <img
                  src={review.customerAvatar}
                  alt={review.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-fiestario-gold/30"
                />
                <div>
                  <h4 className="text-xs font-semibold text-fiestario-carbon">
                    {review.customerName}
                  </h4>
                  <p className="text-[11px] text-fiestario-stone">
                    Celebró: {review.eventType} · {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. VENDOR CTA                                               */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-fiestario-carbon to-fiestario-dark text-white rounded-3xl p-8 sm:p-14 border border-fiestario-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-fiestario-gold font-semibold tracking-wider uppercase">
              <Store className="w-4 h-4" />
              <span>Para Profesionales & Negocios de Eventos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Haz que más personas encuentren tu negocio.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Únete a FIESTARIO y recibe solicitudes de cotización de clientes que ya están listos para contratar lo que tú haces. Perfil editorial, métricas y mensajería en una sola plataforma.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/publicar-negocio">
              <Button variant="gold" size="lg" className="font-medium shadow-card">
                Registrar mi negocio
              </Button>
            </Link>
            <Link href="/planes">
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                Ver planes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. NEWSLETTER                                               */}
      {/* ============================================================ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-fiestario-carbon font-normal">
            Inspírate para tu próxima celebración
          </h2>
          <p className="text-xs sm:text-sm text-fiestario-stone max-w-md mx-auto">
            Recibe semanalmente tendencias editoriales, nuevos venues campestres y promociones exclusivas en tu correo.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("¡Gracias por suscribirte a FIESTARIO Editorial!");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              className="flex-1 text-xs px-4 py-3 rounded-full border border-fiestario-stoneMuted/60 bg-white focus:outline-none focus:border-fiestario-gold shadow-subtle"
            />
            <Button type="submit" variant="primary" size="md">
              Suscribirme
            </Button>
          </form>
          <p className="text-[10px] text-fiestario-stone">
            Cero spam. Cancela en cualquier momento con un clic.
          </p>
        </div>
      </section>
    </div>
  );
}
