"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Store,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Camera,
  MapPin,
  DollarSign,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

export default function PublicarNegocioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [businessName, setBusinessName] = useState("");
  const [categoryId, setCategoryId] = useState("lugares");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("Monterrey");
  const [startingPrice, setStartingPrice] = useState("25000");
  const [yearsExperience, setYearsExperience] = useState("5");
  const [phone, setPhone] = useState("+52 81 ");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"200" | "400" | "600">("400");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-10 space-y-2">
          <Badge variant="gold">
            <Store className="w-3.5 h-3.5" />
            <span>Afiliación de Proveedores FIESTARIO</span>
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
            Publica tu Negocio de Eventos
          </h1>
          <p className="text-sm text-fiestario-stone max-w-md mx-auto">
            Únete a la red más exclusiva de proveedores en México y conecta con anfitriones listos para contratar.
          </p>
        </div>

        {!isSubmitted ? (
          <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-10 shadow-card">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-fiestario-stoneMuted/30 text-xs">
              <span className="font-semibold text-fiestario-carbon">
                Paso {step} de 3 · {step === 1 ? "Datos Comerciales" : step === 2 ? "Ubicación & Tarifas" : "Verificación"}
              </span>
              <span className="text-fiestario-stone">{Math.round((step / 3) * 100)}% completado</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                      Nombre Comercial del Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ej. Hacienda Bella Vista / DJ Alex Beats"
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                      Categoría Principal *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-white cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                      Eslogan o Descripción Corta *
                    </label>
                    <input
                      type="text"
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Ej. El escenario campestre más distinguido de Nuevo León."
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => setStep(2)}
                      disabled={!businessName || !tagline}
                      className="gap-2"
                    >
                      <span>Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                        Ciudad Base *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-white cursor-pointer"
                      >
                        {cities.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name} ({c.state})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                        Años de Experiencia en Eventos
                      </label>
                      <input
                        type="number"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                      Precio Base "Desde" (MXN) *
                    </label>
                    <input
                      type="number"
                      required
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                      placeholder="25000"
                      className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                    />
                    <span className="text-[10px] text-fiestario-stone mt-1 block">
                      Los clientes usan este valor como filtro para encontrar servicios en su presupuesto.
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </Button>
                    <Button type="button" variant="primary" onClick={() => setStep(3)} className="gap-2">
                      <span>Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                        Teléfono / WhatsApp de Contacto *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fiestario-carbon mb-1">
                        Correo Electrónico de Negocio *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contacto@tunegocio.com"
                        className="w-full text-sm p-3 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
                      />
                    </div>
                  </div>

                  {/* Plan Selection ($200, $400, $600 MXN) */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-fiestario-carbon mb-2">
                      Selecciona tu Plan de Afiliación Mensual *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "200",
                          name: "Esencial",
                          price: "$200",
                          period: "MXN / mes",
                          badge: "Económico",
                          desc: "Perfil básico, 8 fotos, cotizaciones directas.",
                        },
                        {
                          id: "400",
                          name: "Destacado Pro",
                          price: "$400",
                          period: "MXN / mes",
                          badge: "Recomendado",
                          desc: "Insignia ✓ Verificado, fotos ilimitadas, analíticas.",
                        },
                        {
                          id: "600",
                          name: "Elite Exclusivo",
                          price: "$600",
                          period: "MXN / mes",
                          badge: "Máximo Alcance",
                          desc: "Prioridad en Fiestario Match IA y portada.",
                        },
                      ].map((p) => {
                        const isSelected = selectedPlan === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedPlan(p.id as any)}
                            className={cn(
                              "p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between text-left relative",
                              isSelected
                                ? "border-fiestario-gold bg-fiestario-champagne/15 shadow-sm ring-2 ring-fiestario-gold/30"
                                : "border-fiestario-stoneMuted/40 bg-white hover:border-fiestario-gold/50"
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-fiestario-carbon">{p.name}</span>
                                <span className="text-[10px] bg-fiestario-cream px-2 py-0.5 rounded-full text-fiestario-goldDark font-semibold">
                                  {p.badge}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1 my-1">
                                <span className="font-serif text-xl font-bold text-fiestario-carbon">{p.price}</span>
                                <span className="text-[10px] text-fiestario-stone">{p.period}</span>
                              </div>
                              <p className="text-[11px] text-fiestario-stone leading-tight mt-1">
                                {p.desc}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-end text-fiestario-gold">
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-fiestario-gold fill-fiestario-gold/20" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-gray-300" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Verification Notice */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs text-emerald-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">
                        Proceso de Verificación FIESTARIO
                      </span>
                      <p className="leading-relaxed">
                        Para otorgar el badge de <strong>✓ Proveedor Verificado</strong>, nuestro equipo revisará tu información comercial y te contactará en menos de 24 horas para activar tu perfil oficial.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="ghost" onClick={() => setStep(2)} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </Button>
                    <Button type="submit" variant="gold" size="lg" className="font-medium shadow-card gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Enviar Solicitud de Registro</span>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-10 text-center space-y-6 shadow-dropdown animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl text-fiestario-carbon">
              ¡Solicitud de Afiliación Recibida!
            </h2>
            <p className="text-sm text-fiestario-stone max-w-md mx-auto leading-relaxed">
              Bienvenido a FIESTARIO. Hemos registrado <strong>{businessName}</strong>. Te hemos enviado un correo de bienvenida a <strong>{email || "tu correo"}</strong> con los detalles para acceder a tu panel de control de proveedor.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <Link href="/vendor">
                <Button variant="primary" size="lg">
                  Ir al Portal de Proveedores
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
