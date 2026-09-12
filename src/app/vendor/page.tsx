"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function VendorDashboardPage() {
  const { quotes, conversations, allVendors } = useFiestario();

  const myVendor = allVendors[0]; // Quinta Monte Real for demo
  const [availabilityDates, setAvailabilityDates] = useState<Record<string, "DISPONIBLE" | "RESERVADO">>({
    "2025-11-15": "RESERVADO",
    "2025-11-22": "DISPONIBLE",
    "2025-11-29": "DISPONIBLE",
    "2025-12-06": "RESERVADO",
    "2025-12-13": "DISPONIBLE",
  });

  const toggleDateStatus = (dateStr: string) => {
    setAvailabilityDates((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr] === "DISPONIBLE" ? "RESERVADO" : "DISPONIBLE",
    }));
  };

  const incomingQuotes = quotes.filter((q) => q.vendorId === myVendor.id);

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Top Banner */}
      <div className="bg-fiestario-carbon text-white rounded-3xl p-8 sm:p-10 border border-fiestario-border shadow-dropdown flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={myVendor.logo}
            alt={myVendor.businessName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-fiestario-gold/50"
          />
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="verified">
                ✓ Proveedor Verificado
              </Badge>
              <span className="text-xs text-fiestario-champagne font-light">
                Plan Pro Empresarial
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
              {myVendor.businessName}
            </h1>
            <p className="text-xs text-gray-300 font-light">
              {myVendor.categoryName} · {myVendor.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/proveedores/${myVendor.slug}`}>
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 text-xs">
              Ver perfil público
            </Button>
          </Link>
          <Link href="/dashboard/mensajes">
            <Button variant="gold" size="sm" className="text-xs gap-1.5 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Bandeja de Mensajes ({conversations.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Vistas al Perfil", val: "1,420", change: "+18% este mes", icon: Users },
          { label: "Leads Generados", val: "48", change: "+24% vs mes anterior", icon: TrendingUp },
          { label: "Cotizaciones Enviadas", val: "32", change: "92% tasa de respuesta", icon: FileText },
          { label: "Tasa de Cierre", val: "68%", change: "Top 5% de la categoría", icon: CheckCircle2 },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 shadow-subtle flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-fiestario-stone mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
                <Icon className="w-4 h-4 text-fiestario-gold" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-fiestario-carbon block">
                  {kpi.val}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column: Incoming Quotes + Availability Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Solicitudes de Cotización Entrantes */}
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
            <div>
              <h2 className="font-serif text-2xl text-fiestario-carbon">
                Solicitudes de Cotización Recientes
              </h2>
              <p className="text-xs text-fiestario-stone mt-0.5">
                Responde rápidamente para mantener el badge de Respuesta Rápida.
              </p>
            </div>
            <span className="text-xs font-bold text-fiestario-gold bg-fiestario-champagne/30 px-2.5 py-1 rounded-full">
              {incomingQuotes.length} activas
            </span>
          </div>

          <div className="divide-y divide-fiestario-stoneMuted/20 space-y-3">
            {incomingQuotes.map((q) => (
              <div key={q.id} className="pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-fiestario-carbon text-sm">
                    {q.customerName}
                  </span>
                  <Badge variant={q.status === "ACCEPTED" ? "success" : "warning"}>
                    {q.status === "ACCEPTED" ? "Aceptada" : "Negociando"}
                  </Badge>
                </div>
                <p className="text-fiestario-stone">
                  {q.serviceName} · Fecha: {q.eventDate} ({q.guestCount} pax)
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif font-bold text-sm text-fiestario-carbon">
                    {formatMXN(q.total)}
                  </span>
                  <Link href="/dashboard/mensajes">
                    <Button variant="outline" size="sm" className="text-xs">
                      Abrir conversación
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario de Disponibilidad */}
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
            <div>
              <h2 className="font-serif text-2xl text-fiestario-carbon">
                Control de Calendario & Fechas
              </h2>
              <p className="text-xs text-fiestario-stone mt-0.5">
                Haz clic en cualquier fecha para alternar entre Disponible y Reservado.
              </p>
            </div>
            <Calendar className="w-5 h-5 text-fiestario-gold" />
          </div>

          <div className="space-y-2.5">
            {Object.entries(availabilityDates).map(([dateStr, status]) => (
              <div
                key={dateStr}
                onClick={() => toggleDateStatus(dateStr)}
                className="p-3.5 rounded-2xl border border-fiestario-stoneMuted/40 hover:border-fiestario-gold transition-all cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-fiestario-stone" />
                  <span className="font-medium text-fiestario-carbon">
                    {dateStr} (Sábado)
                  </span>
                </div>

                <Badge variant={status === "DISPONIBLE" ? "success" : "warning"}>
                  {status === "DISPONIBLE" ? "✓ DISPONIBLE" : "🔒 RESERVADO"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
