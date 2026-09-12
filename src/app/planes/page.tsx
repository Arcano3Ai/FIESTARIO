import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Store, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlanesPage() {
  const plans = [
    {
      name: "Esencial",
      desc: "Para negocios locales emergentes que quieren visibilidad inmediata en el marketplace de FIESTARIO.",
      price: "$200",
      period: "MXN / mes",
      features: [
        "Perfil comercial verificado",
        "Hasta 8 fotografías en alta definición",
        "Recepción de solicitudes y cotizaciones directas",
        "Aparición en búsquedas por ciudad y categoría",
        "Enlace directo a WhatsApp e Instagram",
        "Soporte estándar por correo",
      ],
      popular: false,
      cta: "Elegir Plan Esencial",
    },
    {
      name: "Destacado (Pro)",
      desc: "Para proveedores consolidados que buscan multiplicar sus cotizaciones y destacar sobre la competencia.",
      price: "$400",
      period: "MXN / mes",
      features: [
        "Insignia oficial ✓ Proveedor Verificado",
        "Galería ilimitada de fotos y videos",
        "Posicionamiento prioritario en su categoría",
        "Panel avanzado de analítica (visitas y conversiones)",
        "Chat en vivo y recepción de cotizaciones sin límites",
        "Hasta 10 servicios con precios y cotizador express",
        "Recomendaciones en el Planeador Fiestario IA",
      ],
      popular: true,
      cta: "Elegir Plan Destacado",
    },
    {
      name: "Elite Exclusivo",
      desc: "Para marcas de lujo, quintas de gala, autos exclusivos y grandes banquetes con presencia estelar.",
      price: "$600",
      period: "MXN / mes",
      features: [
        "Máxima prioridad en Fiestario Match IA",
        "Aparición destacada en Homepage ('Favoritos de Fiestario')",
        "Insignia dorada ★ Proveedor Elite",
        "Difusión editorial en el Muro de Inspiración",
        "Atención prioritaria y ejecutivo de soporte 24/7",
        "Garantía de leads calificados por mes",
        "0% comisiones por intermediación",
      ],
      popular: false,
      cta: "Elegir Plan Elite",
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
