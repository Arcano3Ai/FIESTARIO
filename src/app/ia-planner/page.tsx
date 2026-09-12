"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PieChart,
  Calendar,
  Send,
  Loader2,
  Lightbulb,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/rating-stars";
import { VendorCard } from "@/components/shared/vendor-card";
import { generateAIEvaluation, AIPlanResult } from "@/features/ai-planner/service";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function IAPlannerPage() {
  const { createEvent } = useFiestario();

  const [prompt, setPrompt] = useState(
    "Quiero organizar una fiesta de cumpleaños para 80 personas en Monterrey, elegante, con presupuesto de $40,000 MXN."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIPlanResult | null>(() =>
    generateAIEvaluation("Quiero organizar una fiesta de cumpleaños para 80 personas en Monterrey, elegante, con presupuesto de $40,000 MXN.")
  );

  const samplePrompts = [
    "Boda íntima para 120 personas en Santiago N.L., estilo rústico campestre, presupuesto $180,000.",
    "Fiesta de XV Años moderna para 150 invitados en San Pedro Garza García con DJ y cabina 360.",
    "Baby Shower en terraza boutique para 50 personas con paleta arena y pastel de autor.",
    "Cena de aniversario de bodas para 30 personas con menú degustación y cuarteto acústico.",
  ];

  const handleEvaluate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const plan = generateAIEvaluation(prompt);
      setResult(plan);
      setIsLoading(false);
    }, 600);
  };

  const handleSaveToDashboard = () => {
    if (!result) return;
    createEvent({
      name: result.concept,
      style: result.suggestedStyle,
      totalBudget: result.totalEstimated,
      description: result.tagline,
      tasks: result.suggestedChecklist.map((c, i) => ({
        id: `t-ai-${i}`,
        eventId: "ai-evt",
        title: c.title,
        category: c.category,
        phase: c.phase,
        phaseLabel: c.phaseLabel,
        completed: false,
        priority: "HIGH",
      })),
      budgetItems: result.budgetBreakdown.map((b, i) => ({
        id: `b-ai-${i}`,
        eventId: "ai-evt",
        category: b.category,
        name: b.description,
        estimated: b.amount,
        actual: 0,
        status: "PENDING",
      })),
    });
    alert("¡Plan de evento guardado en 'Mi Evento'! Puedes consultarlo en tu dashboard.");
  };

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-fiestario-gold animate-pulse" />
            <span>Asistente Inteligente FIESTARIO</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
            Planeador IA de FIESTARIO
          </h1>
          <p className="text-sm text-fiestario-stone">
            Describe tu evento con tus propias palabras. La inteligencia artificial estructurará el concepto, el presupuesto óptimo y los mejores proveedores del catálogo.
          </p>
        </div>

        {/* Prompt Input Box */}
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-card">
          <form onSubmit={handleEvaluate} className="space-y-4">
            <label className="block text-xs font-semibold text-fiestario-carbon uppercase tracking-wider">
              ¿Qué tienes en mente?
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej. Quiero organizar una fiesta de cumpleaños para 80 personas en Monterrey, elegante, con presupuesto de $40,000..."
                className="w-full text-sm p-4 rounded-2xl border border-fiestario-stoneMuted/50 bg-fiestario-cream/20 focus:outline-none focus:border-fiestario-gold resize-none leading-relaxed"
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                size="md"
                className="absolute right-3 bottom-3 gap-2 bg-fiestario-carbon hover:bg-black font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-fiestario-gold" />
                    <span>Planear Evento</span>
                  </>
                )}
              </Button>
            </div>

            {/* Suggestions Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-2 text-xs">
              <span className="text-[11px] font-medium text-fiestario-stone">Prueba con:</span>
              {samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(sp);
                  }}
                  className="text-[11px] px-3 py-1 rounded-full bg-fiestario-cream/70 hover:bg-fiestario-cream border border-fiestario-stoneMuted/30 text-fiestario-carbon transition-colors text-left truncate max-w-xs"
                >
                  {sp}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* AI Output Result */}
        {result && (
          <div className="space-y-8 animate-slide-up">
            {/* Concept Hero Card */}
            <div className="bg-fiestario-carbon text-white rounded-3xl p-8 sm:p-10 border border-fiestario-border shadow-dropdown space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-fiestario-border pb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-fiestario-champagne block mb-1">
                    Concepto Creativo Recomendado
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
                    “{result.concept}”
                  </h2>
                  <p className="text-sm text-gray-300 mt-1 font-light italic">
                    {result.tagline}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-400 block">Estilo Sugerido</span>
                  <Badge variant="gold" className="text-sm px-3 py-1 mt-1">
                    {result.suggestedStyle}
                  </Badge>
                </div>
              </div>

              {/* Palette & Priorities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-semibold text-fiestario-champagne uppercase tracking-wider block">
                    Paleta Cromática & Materiales
                  </span>
                  <div className="flex items-center gap-3">
                    {result.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border border-white/30 shadow-sm"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {result.paletteDescription}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-semibold text-fiestario-champagne uppercase tracking-wider block">
                    Prioridades de Planeación
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                    {result.priorities.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fiestario-gold shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-fiestario-border">
                <Button variant="gold" onClick={handleSaveToDashboard} className="gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Guardar en Mi Evento</span>
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                    Ir al Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Budget Breakdown Table */}
            <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon">
                    Desglose de Presupuesto Inteligente
                  </h3>
                  <p className="text-xs text-fiestario-stone mt-0.5">
                    Calculado en función de las prioridades de la industria de eventos en México.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-fiestario-stone block">Total Estimado</span>
                  <span className="text-xl font-serif font-bold text-fiestario-carbon">
                    {formatMXN(result.totalEstimated)}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-fiestario-stoneMuted/20">
                {result.budgetBreakdown.map((item, i) => (
                  <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-fiestario-carbon block text-sm">
                        {item.category} ({item.percentage}%)
                      </span>
                      <span className="text-fiestario-stone text-xs font-light">
                        {item.description}
                      </span>
                    </div>
                    <span className="font-serif text-sm font-bold text-fiestario-carbon shrink-0">
                      {formatMXN(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIESTARIO MATCH - Recomended Vendors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-fiestario-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-fiestario-gold">
                      Fiestario Match Engine
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-fiestario-carbon">
                    Proveedores Sugeridos con Alto Grado de Coincidencia
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.recommendedVendors.map(({ vendor, matchScore, matchReasons }) => (
                  <div
                    key={vendor.id}
                    className="flex flex-col bg-white border border-fiestario-stoneMuted/40 rounded-3xl overflow-hidden shadow-subtle p-5 justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-fiestario-gold bg-fiestario-champagne/30 px-2.5 py-1 rounded-full border border-fiestario-gold/30">
                          {matchScore}% MATCH
                        </span>
                        <RatingStars rating={vendor.rating} size="sm" reviewCount={vendor.reviewCount} />
                      </div>

                      <div className="flex gap-4 items-start">
                        <img
                          src={vendor.coverImage}
                          alt={vendor.businessName}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg font-medium text-fiestario-carbon truncate">
                            {vendor.businessName}
                          </h4>
                          <p className="text-xs text-fiestario-stone truncate">
                            {vendor.categoryName} · {vendor.city}
                          </p>
                          <p className="text-xs font-serif font-bold text-fiestario-carbon mt-1">
                            Desde {formatMXN(vendor.startingPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Match explanation */}
                      <div className="mt-4 pt-3 border-t border-fiestario-stoneMuted/30 space-y-1 text-[11px] text-fiestario-stone">
                        <span className="text-[10px] font-semibold text-gray-400 block uppercase">
                          ¿Por qué coincide?
                        </span>
                        {matchReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-fiestario-stoneMuted/30 flex items-center gap-2">
                      <Link href={`/proveedores/${vendor.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          Ver Perfil
                        </Button>
                      </Link>
                      <Link href={`/proveedores/${vendor.slug}`} className="flex-1">
                        <Button variant="primary" size="sm" className="w-full text-xs bg-fiestario-carbon">
                          Cotizar
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
