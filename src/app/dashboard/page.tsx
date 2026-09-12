"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Heart,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Users,
  PieChart,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function CustomerDashboardPage() {
  const {
    currentUser,
    activeEvent,
    events,
    quotes,
    toggleTaskCompleted,
    conversations,
    favorites,
    allVendors,
  } = useFiestario();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("General");

  if (!activeEvent) {
    return (
      <div className="min-h-screen bg-fiestario-warmWhite py-16 px-4 max-w-3xl mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl text-fiestario-carbon">
          No tienes eventos activos todavía.
        </h2>
        <p className="text-sm text-fiestario-stone">
          Comienza creando tu primera celebración con nuestro generador inteligente.
        </p>
        <Link href="/arma-tu-evento">
          <Button variant="primary">Crear mi primer evento</Button>
        </Link>
      </div>
    );
  }

  // Budget calculations
  const totalBudget = activeEvent.totalBudget;
  const committedBudget = activeEvent.budgetItems
    .filter((b) => b.status === "COMMITTED" || b.status === "PAID")
    .reduce((acc, curr) => acc + (curr.actual || curr.estimated), 0);
  const paidBudget = activeEvent.budgetItems
    .filter((b) => b.status === "PAID")
    .reduce((acc, curr) => acc + (curr.actual || curr.estimated), 0);
  const remainingBudget = Math.max(0, totalBudget - committedBudget);

  // Checklist stats
  const totalTasks = activeEvent.tasks.length;
  const completedTasks = activeEvent.tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Active quotes
  const eventQuotes = quotes.filter((q) => q.eventId === activeEvent.id || !q.eventId);

  const favoritedVendors = allVendors.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Welcome Banner */}
      <div className="bg-fiestario-carbon text-white rounded-3xl p-8 sm:p-10 border border-fiestario-border shadow-dropdown flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-wider text-fiestario-champagne font-medium">
              Panel de Control · My Fiestario
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            {activeEvent.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 font-light pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>{activeEvent.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>{activeEvent.city} ({activeEvent.zone})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>{activeEvent.guestCount} invitados</span>
            </span>
            <Badge variant="gold">Estilo {activeEvent.style}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/mensajes">
            <Button variant="secondary" size="sm" className="gap-2 text-white border-white/20 hover:bg-white/10">
              <MessageSquare className="w-4 h-4" />
              <span>Mensajes ({conversations.length})</span>
            </Button>
          </Link>
          <Link href="/arma-tu-evento">
            <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10 gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Nuevo Evento</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main 2-Column Grid: Budget Tracker & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ============================================================ */}
        {/* BUDGET TRACKER (Section 26)                                  */}
        {/* ============================================================ */}
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
            <div>
              <h2 className="font-serif text-2xl text-fiestario-carbon">
                Control de Presupuesto
              </h2>
              <p className="text-xs text-fiestario-stone mt-0.5">
                Seguimiento en tiempo real de gastos y cotizaciones comprometidas.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-fiestario-stone block">Total Presupuesto</span>
              <span className="font-serif text-xl font-bold text-fiestario-carbon">
                {formatMXN(totalBudget)}
              </span>
            </div>
          </div>

          {/* Progress Visual Bar */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-fiestario-cream rounded-full overflow-hidden flex">
              <div
                style={{ width: `${Math.min(100, (paidBudget / totalBudget) * 100)}%` }}
                className="bg-emerald-600 transition-all duration-500"
                title="Pagado"
              />
              <div
                style={{
                  width: `${Math.min(
                    100 - (paidBudget / totalBudget) * 100,
                    ((committedBudget - paidBudget) / totalBudget) * 100
                  )}%`,
                }}
                className="bg-amber-400 transition-all duration-500"
                title="Comprometido"
              />
            </div>
            <div className="flex justify-between text-[11px] text-fiestario-stone pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Pagado: {formatMXN(paidBudget)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Comprometido: {formatMXN(committedBudget - paidBudget)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-fiestario-stoneMuted" />
                <span>Disponible: {formatMXN(remainingBudget)}</span>
              </div>
            </div>
          </div>

          {/* Budget items list */}
          <div className="divide-y divide-fiestario-stoneMuted/20 max-h-[340px] overflow-y-auto pr-1">
            {activeEvent.budgetItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-fiestario-carbon block">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-fiestario-stone">
                    <span>{item.category}</span>
                    {item.vendorName && (
                      <>
                        <span>·</span>
                        <span className="text-fiestario-gold font-medium">{item.vendorName}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-fiestario-carbon block">
                    {formatMXN(item.actual || item.estimated)}
                  </span>
                  <Badge
                    variant={
                      item.status === "PAID"
                        ? "success"
                        : item.status === "COMMITTED"
                        ? "warning"
                        : "subtle"
                    }
                    className="text-[9px] py-0 px-2 mt-0.5"
                  >
                    {item.status === "PAID"
                      ? "Pagado"
                      : item.status === "COMMITTED"
                      ? "Comprometido"
                      : "Estimado"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CHECKLIST DE TAREAS & TIMELINE (Section 25 & 27)             */}
        {/* ============================================================ */}
        <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
            <div>
              <h2 className="font-serif text-2xl text-fiestario-carbon">
                Checklist Inteligente
              </h2>
              <p className="text-xs text-fiestario-stone mt-0.5">
                {completedTasks} de {totalTasks} tareas completadas ({completionPercentage}%)
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-fiestario-cream border-t-fiestario-gold flex items-center justify-center font-bold text-xs text-fiestario-carbon">
              {completionPercentage}%
            </div>
          </div>

          {/* Task list with checkboxes */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {activeEvent.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskCompleted(activeEvent.id, task.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                  task.completed
                    ? "bg-emerald-50/40 border-emerald-200/50 text-emerald-950"
                    : "bg-fiestario-cream/20 border-fiestario-stoneMuted/40 hover:bg-fiestario-cream/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className={`block font-medium ${task.completed ? "line-through opacity-70" : ""}`}>
                      {task.title}
                    </span>
                    <span className="text-[10px] text-fiestario-stone block mt-0.5">
                      {task.phaseLabel} · {task.category}
                      {task.assignedVendorName && ` (${task.assignedVendorName})`}
                    </span>
                  </div>
                </div>

                <Badge variant={task.priority === "HIGH" ? "warning" : "subtle"} className="text-[10px]">
                  {task.priority === "HIGH" ? "Prioridad Alta" : "Media"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* COTIZACIONES RECIBIDAS (Section 21)                          */}
      {/* ============================================================ */}
      <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
          <div>
            <h2 className="font-serif text-2xl text-fiestario-carbon">
              Cotizaciones de Proveedores ({eventQuotes.length})
            </h2>
            <p className="text-xs text-fiestario-stone mt-0.5">
              Revisa, compara o acepta cotizaciones formales para tu evento.
            </p>
          </div>
          <Link href="/comparar">
            <Button variant="outline" size="sm">
              Comparar Cotizaciones
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-5 rounded-2xl border border-fiestario-stoneMuted/40 bg-fiestario-cream/20 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
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
                      ? "✓ Aceptada"
                      : quote.status === "NEGOTIATING"
                      ? "En Negociación"
                      : "Enviada"}
                  </Badge>
                  <span className="text-[10px] text-fiestario-stone">
                    Respuesta {quote.responseTime}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-medium text-fiestario-carbon">
                  {quote.vendorName}
                </h4>
                <p className="text-xs text-fiestario-stone mt-0.5">{quote.serviceName}</p>

                <div className="mt-4 pt-3 border-t border-fiestario-stoneMuted/30 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-fiestario-stone">Invitados:</span>
                    <span className="font-medium text-fiestario-carbon">{quote.guestCount} pax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fiestario-stone">Total Cotizado:</span>
                    <span className="font-serif font-bold text-fiestario-carbon text-sm">
                      {formatMXN(quote.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-fiestario-stoneMuted/30 flex items-center gap-2">
                <Link href="/dashboard/mensajes" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-fiestario-gold" />
                    <span>Ver Chat</span>
                  </Button>
                </Link>
                <Link href={`/proveedores/${quote.vendorId}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full text-xs">
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* FAVORITOS GUARDADOS (Section 39)                             */}
      {/* ============================================================ */}
      <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-fiestario-stoneMuted/30">
          <div>
            <h2 className="font-serif text-2xl text-fiestario-carbon">
              Proveedores Guardados ({favoritedVendors.length})
            </h2>
            <p className="text-xs text-fiestario-stone mt-0.5">
              Acceso rápido a los profesionales que has marcado como favoritos.
            </p>
          </div>
          <Link href="/explorar">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <span>Explorar más</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritedVendors.slice(0, 4).map((vendor) => (
            <Link
              key={vendor.id}
              href={`/proveedores/${vendor.slug}`}
              className="group p-4 rounded-2xl border border-fiestario-stoneMuted/40 bg-white hover:shadow-card transition-all"
            >
              <img
                src={vendor.coverImage}
                alt={vendor.businessName}
                className="w-full aspect-video rounded-xl object-cover mb-3"
              />
              <h4 className="font-serif text-sm font-medium text-fiestario-carbon group-hover:text-fiestario-gold transition-colors truncate">
                {vendor.businessName}
              </h4>
              <p className="text-[11px] text-fiestario-stone mt-0.5 truncate">
                {vendor.categoryName} · {vendor.city}
              </p>
              <span className="text-xs font-serif font-bold text-fiestario-carbon mt-2 block">
                Desde {formatMXN(vendor.startingPrice)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
