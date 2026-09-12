"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, DollarSign, MapPin, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { Vendor, Service } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
  service?: Service;
}

export function QuoteModal({ isOpen, onClose, vendor, service }: QuoteModalProps) {
  const router = useRouter();
  const { requestQuote, events } = useFiestario();

  const [date, setDate] = useState("2025-11-20");
  const [guestCount, setGuestCount] = useState(80);
  const [budget, setBudget] = useState(vendor.startingPrice || 25000);
  const [location, setLocation] = useState(vendor.city || "Monterrey, N.L.");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    requestQuote({
      vendorId: vendor.id,
      vendorName: vendor.businessName,
      serviceId: service?.id,
      serviceName: service?.name || `Cotización para ${vendor.categoryName}`,
      eventDate: date,
      guestCount,
      budget,
      location,
      customerNotes: notes || `Solicitud formal de cotización y disponibilidad para evento con ${guestCount} invitados en ${location}.`,
      eventId: events[0]?.id,
    });

    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
    router.push("/dashboard/cotizaciones");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSuccess ? undefined : "Solicitar Cotización Formal"}
      subtitle={isSuccess ? undefined : `Directo con ${vendor.businessName} · Sin intermediarios`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="text-center py-6 px-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl text-fiestario-carbon mb-2">
            ¡Cotización Enviada con Éxito!
          </h3>
          <p className="text-sm text-fiestario-stone mb-6 max-w-sm mx-auto leading-relaxed">
            Hemos notificado a <strong>{vendor.businessName}</strong>. Su tiempo promedio de respuesta es de <strong>{vendor.responseTime}</strong>.
          </p>

          <div className="bg-fiestario-cream/60 border border-fiestario-stoneMuted/40 rounded-2xl p-4 mb-6 text-left text-xs space-y-2 text-fiestario-stone">
            <div className="flex justify-between">
              <span>Fecha solicitada:</span>
              <span className="font-medium text-fiestario-carbon">{date}</span>
            </div>
            <div className="flex justify-between">
              <span>Invitados:</span>
              <span className="font-medium text-fiestario-carbon">{guestCount} personas</span>
            </div>
            <div className="flex justify-between">
              <span>Presupuesto objetivo:</span>
              <span className="font-medium text-fiestario-carbon">{formatMXN(budget)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => { setIsSuccess(false); onClose(); }}>
              Seguir explorando
            </Button>
            <Button variant="primary" onClick={handleFinish} className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Ver en mis cotizaciones
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vendor Preview mini banner */}
          <div className="flex items-center gap-3 p-3 bg-fiestario-cream/50 border border-fiestario-stoneMuted/30 rounded-2xl">
            <img
              src={vendor.logo}
              alt={vendor.businessName}
              className="w-12 h-12 rounded-xl object-cover border border-white"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-fiestario-carbon truncate">
                {vendor.businessName}
              </h4>
              <p className="text-xs text-fiestario-stone truncate">
                {service ? service.name : vendor.tagline}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-fiestario-stone block">Base desde</span>
              <span className="text-xs font-serif font-bold text-fiestario-gold">
                {formatMXN(service ? service.priceFrom : vendor.startingPrice)}
              </span>
            </div>
          </div>

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-fiestario-carbon mb-1">
                Fecha del Evento
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-fiestario-carbon mb-1">
                Número de Invitados
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="1500"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  required
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold"
                />
              </div>
            </div>
          </div>

          {/* Location & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-fiestario-carbon mb-1">
                Ubicación / Ciudad
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Ej. Santiago, N.L."
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-fiestario-carbon mb-1">
                Presupuesto Estimado (MXN)
              </label>
              <input
                type="number"
                step="500"
                min="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                required
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-fiestario-carbon mb-1">
              Detalles o Requerimientos Especiales
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cuéntale al proveedor sobre el estilo que imaginas, horarios tentativos o cualquier duda particular..."
              className="w-full text-xs p-3 rounded-xl border border-fiestario-stoneMuted/50 bg-white focus:outline-none focus:border-fiestario-gold resize-none"
            />
          </div>

          {/* Protection note */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/50 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Tus datos de contacto están protegidos. El proveedor responderá dentro del chat seguro de FIESTARIO.
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-fiestario-carbon hover:bg-black font-medium">
              Enviar Solicitud
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
