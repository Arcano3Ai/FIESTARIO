"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, FileText, CheckCircle2, Clock, MessageSquare, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function CotizacionesPage() {
  const { quotes, updateQuoteStatus } = useFiestario();

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-fiestario-carbon">
            Mis Cotizaciones
          </h1>
          <p className="text-xs sm:text-sm text-fiestario-stone mt-1">
            Historial de propuestas recibidas y negociaciones activas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/comparar">
            <Button variant="outline" size="sm" className="gap-2">
              <Scale className="w-4 h-4 text-fiestario-gold" />
              <span>Comparar Cotizaciones</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ChevronLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    quote.status === "ACCEPTED"
                      ? "success"
                      : quote.status === "NEGOTIATING"
                      ? "warning"
                      : "subtle"
                  }
                >
                  {quote.status === "ACCEPTED"
                    ? "✓ Cotización Aceptada"
                    : quote.status === "NEGOTIATING"
                    ? "En Negociación"
                    : "Enviada al Proveedor"}
                </Badge>
                <span className="text-xs text-fiestario-stone flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Respuesta {quote.responseTime}</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-fiestario-carbon font-medium">
                  {quote.vendorName}
                </h3>
                <p className="text-sm text-fiestario-stone">
                  {quote.serviceName} · Fecha: {quote.eventDate} ({quote.guestCount} invitados)
                </p>
              </div>

              {quote.customerNotes && (
                <p className="text-xs text-fiestario-stone italic bg-fiestario-cream/40 p-3 rounded-xl border border-fiestario-stoneMuted/20 max-w-xl">
                  "{quote.customerNotes}"
                </p>
              )}
            </div>

            <div className="md:text-right shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-fiestario-stoneMuted/30 flex flex-row md:flex-col justify-between items-center md:items-end gap-3">
              <div>
                <span className="text-[10px] text-fiestario-stone block uppercase">Monto Total</span>
                <span className="font-serif text-2xl font-bold text-fiestario-carbon">
                  {formatMXN(quote.total)}
                </span>
                <span className="text-[10px] text-gray-400 block">Válida hasta {quote.validUntil}</span>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/dashboard/mensajes">
                  <Button variant="outline" size="sm" className="text-xs gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-fiestario-gold" />
                    <span>Chat</span>
                  </Button>
                </Link>
                {quote.status !== "ACCEPTED" ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                    onClick={() => updateQuoteStatus(quote.id, "ACCEPTED")}
                  >
                    Aceptar Cotización
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" className="text-xs" disabled>
                    ✓ Aceptada
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
