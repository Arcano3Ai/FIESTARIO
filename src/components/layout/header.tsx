"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Scale,
  Sparkles,
  Calendar,
  User,
  Menu,
  X,
  Store,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { favorites, compareList, quotes, currentUser, setCurrentUserRole, conversations } = useFiestario();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navLinks = [
    { href: "/explorar", label: "Explorar" },
    { href: "/categorias", label: "Categorías" },
    { href: "/inspiracion", label: "Inspiración" },
    { href: "/paquetes", label: "Paquetes" },
    { href: "/arma-tu-evento", label: "Arma tu Evento", highlight: true },
    { href: "/ia-planner", label: "Planeador IA", ai: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-fiestario-warmWhite/90 backdrop-blur-md border-b border-fiestario-stoneMuted/40 transition-all">
      {/* Top Banner (Mexican announcement / Role switcher demo helper) */}
      <div className="bg-fiestario-carbon text-fiestario-warmWhite text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-light tracking-wider uppercase text-[11px] text-fiestario-champagne">
              FIESTARIO MÉXICO
            </span>
            <span className="text-fiestario-stoneLight hidden sm:inline">|</span>
            <span className="text-gray-300 hidden sm:inline">
              Proveedores de eventos verificados en Monterrey, CDMX, Guadalajara y más
            </span>
          </p>

          {/* Persona switcher (Senior demo feature) */}
          <div className="relative flex items-center gap-2">
            <span className="text-[11px] text-gray-400 hidden md:inline">Modo demo:</span>
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-fiestario-surface px-2.5 py-0.5 rounded-full text-fiestario-champagne border border-fiestario-border hover:border-fiestario-gold transition-colors"
            >
              <span>
                {currentUser.role === "CUSTOMER" && "👤 Cliente"}
                {currentUser.role === "VENDOR" && "🏪 Proveedor"}
                {currentUser.role === "ADMIN" && "🛡️ Admin"}
              </span>
              <ChevronDown className="w-3 h-3 text-fiestario-gold" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-fiestario-carbon border border-fiestario-border rounded-xl shadow-dropdown py-2 z-50 animate-slide-up text-left">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-fiestario-gold tracking-wider border-b border-fiestario-border">
                  Cambiar Rol de Prueba
                </div>
                <button
                  onClick={() => {
                    setCurrentUserRole("CUSTOMER");
                    setIsRoleMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs hover:bg-fiestario-surface flex items-center justify-between text-gray-200",
                    currentUser.role === "CUSTOMER" && "text-fiestario-gold font-semibold"
                  )}
                >
                  <span>👤 Cliente (Valeria)</span>
                  {currentUser.role === "CUSTOMER" && <span className="text-xs">✓</span>}
                </button>
                <button
                  onClick={() => {
                    setCurrentUserRole("VENDOR");
                    setIsRoleMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs hover:bg-fiestario-surface flex items-center justify-between text-gray-200",
                    currentUser.role === "VENDOR" && "text-fiestario-gold font-semibold"
                  )}
                >
                  <span>🏪 Proveedor (Quinta Monte Real)</span>
                  {currentUser.role === "VENDOR" && <span className="text-xs">✓</span>}
                </button>
                <button
                  onClick={() => {
                    setCurrentUserRole("ADMIN");
                    setIsRoleMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs hover:bg-fiestario-surface flex items-center justify-between text-gray-200",
                    currentUser.role === "ADMIN" && "text-fiestario-gold font-semibold"
                  )}
                >
                  <span>🛡️ Administrador del Sistema</span>
                  {currentUser.role === "ADMIN" && <span className="text-xs">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group focus:outline-none">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-fiestario-carbon font-semibold group-hover:text-fiestario-gold transition-colors">
            FIESTARIO
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-fiestario-stone font-medium -mt-1">
            Todo para celebrar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 tracking-wide",
                  isActive
                    ? "text-fiestario-carbon bg-fiestario-cream font-semibold"
                    : "text-fiestario-stone hover:text-fiestario-carbon hover:bg-white/80",
                  link.highlight &&
                    "text-fiestario-carbon bg-fiestario-champagne/30 border border-fiestario-gold/30 hover:bg-fiestario-champagne/50",
                  link.ai &&
                    "text-amber-900 bg-amber-50/80 border border-amber-200/70 hover:bg-amber-100 flex items-center gap-1.5"
                )}
              >
                {link.ai && <Sparkles className="w-3.5 h-3.5 text-fiestario-gold animate-pulse-subtle" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Compare Pill (if any) */}
          {compareList.length > 0 && (
            <Link
              href="/comparar"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium bg-fiestario-champagne/30 border border-fiestario-gold/40 px-3 py-1.5 rounded-full text-fiestario-carbon hover:bg-fiestario-champagne/60 transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-fiestario-gold" />
              <span>Comparar</span>
              <span className="w-4 h-4 rounded-full bg-fiestario-carbon text-white text-[10px] flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            </Link>
          )}

          {/* Favorites */}
          <Link
            href="/dashboard/favoritos"
            aria-label="Favoritos"
            className="relative p-2 rounded-full text-fiestario-stone hover:text-fiestario-carbon hover:bg-fiestario-cream transition-colors"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Messages */}
          <Link
            href="/dashboard/mensajes"
            aria-label="Mensajes"
            className="relative p-2 rounded-full text-fiestario-stone hover:text-fiestario-carbon hover:bg-fiestario-cream transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-fiestario-gold text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </Link>

          {/* User Dashboard Hub */}
          {currentUser.role === "CUSTOMER" && (
            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4 text-fiestario-gold" />
                <span>Mi Evento</span>
              </Button>
            </Link>
          )}

          {currentUser.role === "VENDOR" && (
            <Link href="/vendor" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-2 border-fiestario-gold/50 bg-fiestario-champagne/10">
                <Store className="w-4 h-4 text-fiestario-gold" />
                <span>Portal Proveedor</span>
              </Button>
            </Link>
          )}

          {currentUser.role === "ADMIN" && (
            <Link href="/admin" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-2 border-purple-300 bg-purple-50 text-purple-900">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Panel Admin</span>
              </Button>
            </Link>
          )}

          {/* Vendor Registration CTA */}
          <Link href="/publicar-negocio" className="hidden md:inline-flex">
            <Button variant="primary" size="sm" className="shadow-subtle">
              Publicar mi negocio
            </Button>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-fiestario-carbon hover:bg-fiestario-cream rounded-full transition-colors"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bg-fiestario-warmWhite border-b border-fiestario-stoneMuted/40 shadow-dropdown p-6 max-h-[85vh] overflow-y-auto animate-slide-up z-50">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium py-2.5 px-4 rounded-xl hover:bg-fiestario-cream text-fiestario-carbon border-b border-fiestario-stoneMuted/20"
              >
                <span className="flex items-center gap-2">
                  {link.ai && <Sparkles className="w-4 h-4 text-fiestario-gold" />}
                  {link.label}
                </span>
                <span className="text-xs text-fiestario-stone">→</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-fiestario-stoneMuted/30 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 bg-fiestario-cream/80 rounded-xl text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-fiestario-gold" />
                  Panel de Mi Evento
                </span>
                <span className="text-xs text-fiestario-stone">Ver</span>
              </Link>

              <Link
                href="/publicar-negocio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" className="w-full">
                  Publicar mi negocio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
