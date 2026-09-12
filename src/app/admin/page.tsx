"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Store,
  DollarSign,
  Calendar,
  AlertTriangle,
  Check,
  X,
  Search,
  Filter,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { allVendors, updateVendorStatus, quotes, events } = useFiestario();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const verifiedVendorsCount = allVendors.filter((v) => v.verified).length;
  const pendingVendorsCount = allVendors.filter((v) => v.status === "PENDING" || v.status === "UNDER_REVIEW").length;

  const filteredVendors = allVendors.filter((v) => {
    if (searchTerm) {
      const match =
        v.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    if (filterStatus !== "ALL" && v.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Top Banner */}
      <div className="bg-fiestario-carbon text-white rounded-3xl p-8 sm:p-10 border border-fiestario-border shadow-dropdown flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span className="text-xs uppercase font-semibold tracking-wider text-purple-300">
              Centro de Operaciones & Moderación FIESTARIO
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Panel de Control Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
            Supervisión de calidad, auditoría de proveedores, cotizaciones y cumplimiento de estándares de lujo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="verified">
            Sistema Operativo 100% Activo
          </Badge>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Proveedores Registrados", val: allVendors.length.toString(), sub: `${verifiedVendorsCount} verificados`, icon: Store },
          { label: "Eventos en Planeación", val: events.length.toString(), sub: "Alta actividad en Monterrey", icon: Calendar },
          { label: "Cotizaciones Generadas", val: quotes.length.toString(), sub: "Valor transaccional activo", icon: DollarSign },
          { label: "En Cola de Verificación", val: pendingVendorsCount.toString(), sub: "Requieren revisión documental", icon: AlertTriangle },
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
                <span className="text-[11px] text-fiestario-stone block mt-1">
                  {kpi.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vendors Verification & Audit Table */}
      <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fiestario-stoneMuted/30">
          <div>
            <h2 className="font-serif text-2xl text-fiestario-carbon">
              Auditoría y Verificación de Proveedores
            </h2>
            <p className="text-xs text-fiestario-stone mt-0.5">
              Gestiona el otorgamiento del badge <strong>✓ Proveedor Verificado</strong>.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-fiestario-stone absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar proveedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs pl-8 pr-3 py-2 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-fiestario-cream/20"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs p-2 rounded-xl border border-fiestario-stoneMuted/50 focus:outline-none focus:border-fiestario-gold bg-white cursor-pointer"
            >
              <option value="ALL">Todos los estados</option>
              <option value="VERIFIED">Verificados</option>
              <option value="PENDING">Pendientes</option>
            </select>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-fiestario-stoneMuted/30 text-fiestario-stone uppercase text-[10px]">
                <th className="py-3 px-4 font-semibold">Proveedor</th>
                <th className="py-3 px-4 font-semibold">Categoría & Ciudad</th>
                <th className="py-3 px-4 font-semibold">Tarifa Base</th>
                <th className="py-3 px-4 font-semibold">Calificación</th>
                <th className="py-3 px-4 font-semibold">Estado Actual</th>
                <th className="py-3 px-4 font-semibold text-right">Acción de Moderación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fiestario-stoneMuted/20 text-fiestario-carbon">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-fiestario-cream/20 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={vendor.logo}
                      alt={vendor.businessName}
                      className="w-9 h-9 rounded-xl object-cover border"
                    />
                    <div className="min-w-0">
                      <span className="font-medium text-fiestario-carbon block truncate">
                        {vendor.businessName}
                      </span>
                      <span className="text-[10px] text-fiestario-stone block">
                        {vendor.email}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-xs">
                    <span className="block font-medium">{vendor.categoryName}</span>
                    <span className="text-[10px] text-fiestario-stone">{vendor.city}</span>
                  </td>

                  <td className="py-3 px-4 font-serif font-bold text-xs">
                    {formatMXN(vendor.startingPrice)}
                  </td>

                  <td className="py-3 px-4 text-xs font-semibold">
                    {vendor.rating} ★ ({vendor.reviewCount})
                  </td>

                  <td className="py-3 px-4">
                    {vendor.status === "VERIFIED" ? (
                      <Badge variant="verified">✓ Verificado</Badge>
                    ) : (
                      <Badge variant="warning">En Revisión</Badge>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {vendor.status !== "VERIFIED" ? (
                        <button
                          onClick={() => updateVendorStatus(vendor.id, "VERIFIED")}
                          className="px-2.5 py-1 rounded-lg text-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-colors font-medium flex items-center gap-1"
                          title="Aprobar Verificación"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Verificar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => updateVendorStatus(vendor.id, "UNDER_REVIEW")}
                          className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors text-[11px]"
                          title="Suspender Verificación"
                        >
                          Revocar
                        </button>
                      )}

                      <Link href={`/proveedores/${vendor.slug}`}>
                        <button
                          className="p-1.5 rounded-lg text-fiestario-stone hover:text-fiestario-carbon hover:bg-fiestario-cream transition-colors"
                          title="Inspeccionar Perfil"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
