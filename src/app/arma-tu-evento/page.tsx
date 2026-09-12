"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Palette,
  Check,
  Building2,
  UtensilsCrossed,
  Music,
  Camera,
  PartyPopper,
  Flame,
  Wine,
  Flower2,
  Cake,
  Armchair,
  Car,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VendorCard } from "@/components/shared/vendor-card";
import { useFiestario } from "@/lib/store";
import { EventType, EventStyle } from "@/types";
import { cities } from "@/data/cities";
import { formatMXN, cn } from "@/lib/utils";

export default function ArmaTuEventoPage() {
  const router = useRouter();
  const { createEvent, allVendors } = useFiestario();

  const [step, setStep] = useState(1);

  // Form State
  const [eventType, setEventType] = useState<EventType>("Cumpleaños");
  const [date, setDate] = useState("2025-11-20");
  const [city, setCity] = useState("Monterrey");
  const [guestCount, setGuestCount] = useState(80);
  const [budget, setBudget] = useState(45000);
  const [style, setStyle] = useState<EventStyle>("Elegante");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    "Lugar / Locación",
    "Banquete / Taquiza",
    "Música / DJ",
    "Decoración / Globos",
    "Fotografía",
  ]);

  const [isGenerated, setIsGenerated] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);

  const eventTypes: { type: EventType; title: string; desc: string; icon: string }[] = [
    { type: "Cumpleaños", title: "Cumpleaños", desc: "Celebraciones boutique, terrazas, asados y fiestas de día o noche.", icon: "🎂" },
    { type: "Boda", title: "Boda", desc: "Ceremonias civiles, religiosas, recepciones en haciendas o quintas.", icon: "💍" },
    { type: "XV Años", title: "XV Años", desc: "Fiestas de etiqueta, concepto de festival, pistas iluminadas y vals.", icon: "👑" },
    { type: "Baby Shower", title: "Baby Shower & Reveal", desc: "Backdrops florales, pastelería fina y detalles sensoriales.", icon: "🍼" },
    { type: "Corporativo", title: "Corporativo & Gala", desc: "Lanzamientos, cenas de fin de año, aniversarios empresariales.", icon: "🥂" },
    { type: "Bautizo", title: "Bautizo & Comunión", desc: "Cenas o desayunos familiares íntimos con mantelería delicada.", icon: "🕊️" },
  ];

  const styles: { style: EventStyle; desc: string }[] = [
    { style: "Elegante", desc: "Atemporal, sobrio, mantelería impecable y luces tenues." },
    { style: "Minimalista", desc: "Líneas puras, espacio negativo y paleta monocromática." },
    { style: "Mexicano Contemporáneo", desc: "Sabor local con alta sofisticación, textiles y barro pulido." },
    { style: "Lujo & Editorial", desc: "Estética de revista, detalles dorados, flores importadas y vajilla fina." },
    { style: "Boho Chic", desc: "Fibras naturales, flores secas, pampas y atmósfera relajada." },
    { style: "Rústico Campestre", desc: "Madera maciza, naturaleza abierta y asadores de leña." },
    { style: "Moderno", desc: "Iluminación robótica, acrílico, neones y beats vanguardistas." },
  ];

  const needsList = [
    { id: "Lugar / Locación", label: "Quinta, Hacienda o Salón", icon: Building2 },
    { id: "Banquete / Taquiza", label: "Catering, Taquiza o Parrillada", icon: UtensilsCrossed },
    { id: "Bebidas / Mixología", label: "Barra Libre o Coctelería Móvil", icon: Wine },
    { id: "Música / DJ", label: "DJ, Orquesta, Norteño o Mariachi", icon: Music },
    { id: "Autos / Transportación", label: "Autos Clásicos, Sprinter VIP o Carruajes", icon: Car },
    { id: "Animación / Shows", label: "Circo Contemporáneo, Fuego o Performance", icon: Sparkles },
    { id: "Wedding Planner", label: "Coordinación Integral & Concierge VIP", icon: Award },
    { id: "Decoración / Globos", label: "Escenografía, Globos o Letras Neón", icon: Sparkles },
    { id: "Flores", label: "Diseño Floral & Centros de Mesa", icon: Flower2 },
    { id: "Fotografía", label: "Fotógrafo Editorial de Evento", icon: Camera },
    { id: "Pastel & Dulces", label: "Wedding Cake o Mesa de Postres", icon: Cake },
    { id: "Mobiliario", label: "Sillas Crossback, Salas Lounge", icon: Armchair },
    { id: "Entretenimiento", label: "Cabina 360 o Glambot", icon: PartyPopper },
  ];

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Generate event when finished
  const handleGenerate = () => {
    const newEvt = createEvent({
      name: `${eventType} de ${style} en ${city}`,
      type: eventType,
      date,
      city,
      guestCount,
      totalBudget: budget,
      style,
      description: `Evento planeado con FIESTARIO para ${guestCount} personas con estilo ${style}.`,
    });

    setCreatedEventId(newEvt.id);
    setIsGenerated(true);
  };

  // Filter matched providers
  const matchedVendors = allVendors
    .filter((v) => v.eventTypes.includes(eventType) || v.styles.includes(style))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-fiestario-champagne/30 text-fiestario-goldDark text-xs font-semibold px-3 py-1 rounded-full border border-fiestario-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
            <span>Generador Inteligente de Eventos</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
            Arma tu Evento
          </h1>
          <p className="text-sm sm:text-base text-fiestario-stone mt-2 max-w-lg mx-auto">
            Configura tus preferencias en 4 sencillos pasos. FIESTARIO creará tu presupuesto, checklist y te conectará con proveedores ideales.
          </p>
        </div>

        {!isGenerated ? (
          <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-10 shadow-card">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-fiestario-stoneMuted/30">
              {[
                { s: 1, label: "¿Qué celebras?" },
                { s: 2, label: "Fecha & Ciudad" },
                { s: 3, label: "Invitados & Presupuesto" },
                { s: 4, label: "Estilo & Servicios" },
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors",
                      step >= item.s
                        ? "bg-fiestario-carbon text-white"
                        : "bg-fiestario-cream text-fiestario-stone border border-fiestario-stoneMuted/40"
                    )}
                  >
                    {item.s}
                  </div>
                  <span className="text-xs font-medium text-fiestario-carbon hidden sm:inline">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: ¿QUÉ VAS A CELEBRAR? */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon font-normal">
                    ¿Qué vas a celebrar?
                  </h3>
                  <p className="text-xs text-fiestario-stone mt-1">
                    Selecciona el tipo de evento para adaptar las partidas de presupuesto y cronograma.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eventTypes.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setEventType(item.type)}
                      className={cn(
                        "p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-36",
                        eventType === item.type
                          ? "border-fiestario-carbon bg-fiestario-cream/60 shadow-subtle ring-1 ring-fiestario-carbon"
                          : "border-fiestario-stoneMuted/40 hover:border-fiestario-stoneMuted hover:bg-fiestario-cream/20"
                      )}
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-medium text-sm text-fiestario-carbon">{item.title}</h4>
                        <p className="text-[11px] text-fiestario-stone mt-1 line-clamp-2">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-6 flex justify-end">
                  <Button variant="primary" size="lg" onClick={() => setStep(2)} className="gap-2">
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: ¿CUÁNDO Y DÓNDE? */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon font-normal">
                    ¿Cuándo y dónde será la celebración?
                  </h3>
                  <p className="text-xs text-fiestario-stone mt-1">
                    Buscamos proveedores con cobertura y disponibilidad en tu zona.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Fecha */}
                  <div className="p-5 rounded-2xl bg-fiestario-cream/30 border border-fiestario-stoneMuted/40 space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-fiestario-carbon">
                      <Calendar className="w-4 h-4 text-fiestario-gold" />
                      <span>Fecha Tentativa</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold"
                    />
                    <span className="text-[10px] text-fiestario-stone block">
                      Podrás ajustarla más adelante con los proveedores.
                    </span>
                  </div>

                  {/* Ciudad */}
                  <div className="p-5 rounded-2xl bg-fiestario-cream/30 border border-fiestario-stoneMuted/40 space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-fiestario-carbon">
                      <MapPin className="w-4 h-4 text-fiestario-gold" />
                      <span>Ciudad / Zona Principal</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold cursor-pointer"
                    >
                      {cities.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] text-fiestario-stone block">
                      FIESTARIO te mostrará proveedores locales sin viáticos excesivos.
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)} className="gap-2">
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: INVITADOS & PRESUPUESTO */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon font-normal">
                    Invitados y Presupuesto Objetivo
                  </h3>
                  <p className="text-xs text-fiestario-stone mt-1">
                    Esto nos permite calibrar la escala de proveedores y cotizaciones reales.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Invitados */}
                  <div className="p-5 rounded-2xl bg-fiestario-cream/30 border border-fiestario-stoneMuted/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs font-semibold text-fiestario-carbon">
                        <Users className="w-4 h-4 text-fiestario-gold" />
                        <span>Número de Invitados</span>
                      </label>
                      <span className="text-base font-serif font-bold text-fiestario-carbon">
                        {guestCount} pax
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="400"
                      step="10"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-fiestario-gold cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-fiestario-stone">
                      <span>20 personas</span>
                      <span>150 personas</span>
                      <span>400+ personas</span>
                    </div>
                  </div>

                  {/* Presupuesto */}
                  <div className="p-5 rounded-2xl bg-fiestario-cream/30 border border-fiestario-stoneMuted/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs font-semibold text-fiestario-carbon">
                        <DollarSign className="w-4 h-4 text-fiestario-gold" />
                        <span>Presupuesto Estimado</span>
                      </label>
                      <span className="text-base font-serif font-bold text-fiestario-gold">
                        {formatMXN(budget)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15000"
                      max="350000"
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-fiestario-gold cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-fiestario-stone">
                      <span>$15,000 MXN</span>
                      <span>$150,000 MXN</span>
                      <span>$350,000+ MXN</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(4)} className="gap-2">
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: ESTILO & SERVICIOS */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon font-normal">
                    Estilo Visual y Necesidades
                  </h3>
                  <p className="text-xs text-fiestario-stone mt-1">
                    Selecciona la atmósfera que buscas y marca los servicios que necesitas contratar.
                  </p>
                </div>

                {/* Estilos */}
                <div>
                  <label className="block text-xs font-semibold text-fiestario-carbon mb-2">
                    Estilo de Decoración & Ambiente
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {styles.map((s) => (
                      <button
                        key={s.style}
                        type="button"
                        onClick={() => setStyle(s.style)}
                        className={cn(
                          "p-3 rounded-xl border text-left text-xs transition-all",
                          style === s.style
                            ? "border-fiestario-carbon bg-fiestario-cream font-medium shadow-sm"
                            : "border-fiestario-stoneMuted/40 text-fiestario-stone hover:bg-fiestario-cream/30"
                        )}
                      >
                        <span className="block font-medium text-fiestario-carbon">{s.style}</span>
                        <span className="text-[10px] text-fiestario-stone line-clamp-1">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Necesidades / Servicios */}
                <div>
                  <label className="block text-xs font-semibold text-fiestario-carbon mb-2">
                    ¿Qué necesitas para este evento? (Selecciona todos los que apliquen)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {needsList.map((need) => {
                      const Icon = need.icon;
                      const isSelected = selectedNeeds.includes(need.id);
                      return (
                        <button
                          key={need.id}
                          type="button"
                          onClick={() => toggleNeed(need.id)}
                          className={cn(
                            "flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all",
                            isSelected
                              ? "border-fiestario-gold bg-fiestario-champagne/20 text-fiestario-carbon font-medium shadow-sm"
                              : "border-fiestario-stoneMuted/40 text-fiestario-stone hover:bg-fiestario-cream/20"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={cn("w-4 h-4", isSelected ? "text-fiestario-gold" : "text-gray-400")} />
                            <span>{need.label}</span>
                          </div>
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border flex items-center justify-center text-[10px]",
                              isSelected ? "bg-fiestario-gold text-white border-fiestario-gold" : "border-gray-300"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setStep(3)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </Button>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleGenerate}
                    className="gap-2 font-medium shadow-card"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generar mi Plan de Evento</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* RESULT SCREEN: "ESTO ES LO QUE NECESITAS" */
          <div className="space-y-8 animate-slide-up">
            <div className="bg-fiestario-carbon text-white p-8 sm:p-10 rounded-3xl border border-fiestario-border shadow-dropdown">
              <div className="flex items-center gap-2 text-fiestario-gold text-xs font-semibold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Plan Generado Exitosamente</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                Tu Evento: {eventType} en {city}
              </h2>
              <p className="text-sm text-gray-300 mt-1 max-w-xl font-light">
                {guestCount} invitados · Estilo {style} · Presupuesto de {formatMXN(budget)}
              </p>

              {/* Budget Quick Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-fiestario-border text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Locación (35%)</span>
                  <span className="text-base font-serif font-bold text-fiestario-champagne">
                    {formatMXN(budget * 0.35)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Banquete (30%)</span>
                  <span className="text-base font-serif font-bold text-fiestario-champagne">
                    {formatMXN(budget * 0.30)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Música & Audio (15%)</span>
                  <span className="text-base font-serif font-bold text-fiestario-champagne">
                    {formatMXN(budget * 0.15)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Decoración & Foto (20%)</span>
                  <span className="text-base font-serif font-bold text-fiestario-champagne">
                    {formatMXN(budget * 0.20)}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard">
                  <Button variant="gold" size="md" className="gap-2">
                    <span>Gestionar en Mi Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => setIsGenerated(false)}
                >
                  Modificar parámetros
                </Button>
              </div>
            </div>

            {/* Matched Providers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon">
                    Proveedores que Hacen Match con tu Evento
                  </h3>
                  <p className="text-xs text-fiestario-stone">
                    Seleccionados automáticamente por fecha, estilo {style} y rango presupuestario.
                  </p>
                </div>
                <Badge variant="gold" className="hidden sm:inline-flex">
                  98% de compatibilidad
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
