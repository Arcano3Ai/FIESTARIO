import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Store, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlanesPage() {
  const plans = [
    {
      name: "Básico",
      desc: "Para negocios locales emergentes que desean presencia en el marketplace.",
      price: "$0",
      period: "para siempre",
      features: [
        "Perfil comercial básico",
        "Hasta 5 fotos de galería",
        "Recepción de solicitudes directas",
        "Aparición en búsquedas generales",
        "Soporte por correo",
      ],
      popular: false,
      cta: "Comenzar Gratis",
    },
    {
      name: "Profesional (Pro)",
      desc: "Para proveedores consolidados que buscan un flujo continuo de cotizaciones calificadas.",
      price: "$1,490",
      period: "MXN / mes",
      features: [
        "Insignia ✓ Proveedor Verificado",
        "Galería ilimitada de alta resolución",
        "Panel de analítica y métricas de conversión",
        "Posicionamiento destacado en su categoría",
        "Chat prioritario con clientes",
        "Hasta 10 servicios y 5 paquetes integrales",
      ],
      popular: true,
      cta: "Elegir Plan Pro",
    },
    {
      name: "Elite Premium",
      desc: "Para marcas de lujo, quintas de gala y banqueteros con exclusividad de zona.",
      price: "$3,890",
      period: "MXN / mes",
      features: [
        "Máxima prioridad en Fiestario Match IA",
        "Presencia en Homepage ('Los favoritos de Fiestario')",
        "Reportes mensuales de tendencias de mercado",
        "Ejecutivo de cuenta dedicado 24/7",
        "Destacado en redes sociales y newsletters",
        "Garantía de leads calificados",
      ],
      popular: false,
      cta: "Solicitar Plan Elite",
    },
  ];

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="gold">
          <Store className="w-3.5 h-3.5" />
          <span>Membresías Comerciales</span>
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
          Planes para Proveedores de Eventos
        </h1>
        <p className="text-sm text-fiestario-stone">
          Haz crecer tu negocio conectando con anfitriones de alto poder adquisitivo que buscan la mejor calidad en México.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
              plan.popular
                ? "bg-fiestario-carbon text-white border-2 border-fiestario-gold shadow-dropdown relative scale-105"
                : "bg-white text-fiestario-carbon border border-fiestario-stoneMuted/40 shadow-subtle"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fiestario-gold to-fiestario-goldDark text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                Más Elegido
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-normal">{plan.name}</h3>
                <p className={`text-xs mt-1 ${plan.popular ? "text-gray-300" : "text-fiestario-stone"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="pt-2">
                <span className="font-serif text-4xl font-bold">{plan.price}</span>
                <span className={`text-xs ml-1 ${plan.popular ? "text-gray-400" : "text-fiestario-stone"}`}>
                  {plan.period}
                </span>
              </div>

              <div className={`pt-6 border-t ${plan.popular ? "border-white/10" : "border-fiestario-stoneMuted/30"}`}>
                <span className="text-[11px] font-semibold uppercase tracking-wider block mb-3 opacity-80">
                  Beneficios incluidos:
                </span>
                <ul className="space-y-2.5 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.popular ? "text-fiestario-gold" : "text-emerald-600"
                        }`}
                      />
                      <span className={plan.popular ? "text-gray-200" : "text-fiestario-carbon"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/publicar-negocio" className="block">
                <Button
                  variant={plan.popular ? "gold" : "primary"}
                  size="lg"
                  className="w-full font-medium"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
