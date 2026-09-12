import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-fiestario-carbon text-fiestario-warmWhite pt-16 pb-12 border-t border-fiestario-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-fiestario-border/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.18em] text-fiestario-warmWhite font-semibold hover:text-fiestario-gold transition-colors">
                FIESTARIO
              </span>
            </Link>
            <p className="font-serif italic text-lg text-fiestario-champagne/90">
              “Todo para celebrar. En un solo lugar.”
            </p>
            <p className="text-sm text-fiestario-stoneLight max-w-md leading-relaxed">
              El marketplace premium de eventos de México. Conectamos a los anfitriones más exigentes con los mejores espacios, banqueteros, decoradores, DJs y artistas del país.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-fiestario-champagne/80 bg-fiestario-surface px-3 py-1.5 rounded-full border border-fiestario-border">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Proveedores 100% Verificados
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-fiestario-gold font-semibold mb-4">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/explorar" className="hover:text-fiestario-champagne transition-colors">
                  Todos los Proveedores
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-fiestario-champagne transition-colors">
                  Categorías de Eventos
                </Link>
              </li>
              <li>
                <Link href="/paquetes" className="hover:text-fiestario-champagne transition-colors">
                  Paquetes Integrales
                </Link>
              </li>
              <li>
                <Link href="/inspiracion" className="hover:text-fiestario-champagne transition-colors">
                  Galería de Inspiración
                </Link>
              </li>
              <li>
                <Link href="/arma-tu-evento" className="hover:text-fiestario-champagne transition-colors">
                  Arma tu Evento
                </Link>
              </li>
              <li>
                <Link href="/ia-planner" className="hover:text-fiestario-champagne transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-fiestario-gold" />
                  Planeador con IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendors Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-fiestario-gold font-semibold mb-4">
              Para Proveedores
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/publicar-negocio" className="hover:text-fiestario-champagne transition-colors">
                  Registrar mi Negocio
                </Link>
              </li>
              <li>
                <Link href="/vendor" className="hover:text-fiestario-champagne transition-colors">
                  Portal de Proveedores
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-fiestario-champagne transition-colors">
                  Membresías & Planes
                </Link>
              </li>
              <li>
                <Link href="/estandares-calidad" className="hover:text-fiestario-champagne transition-colors">
                  Estándares de Verificación
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-fiestario-champagne transition-colors text-xs text-gray-500">
                  Acceso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Ciudades de México */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-fiestario-gold font-semibold mb-4">
              Ciudades
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/ciudades/monterrey" className="hover:text-fiestario-champagne transition-colors">
                  Monterrey & San Pedro
                </Link>
              </li>
              <li>
                <Link href="/ciudades/cdmx" className="hover:text-fiestario-champagne transition-colors">
                  Ciudad de México
                </Link>
              </li>
              <li>
                <Link href="/ciudades/guadalajara" className="hover:text-fiestario-champagne transition-colors">
                  Guadalajara & Zapopan
                </Link>
              </li>
              <li>
                <Link href="/ciudades/san-miguel-de-allende" className="hover:text-fiestario-champagne transition-colors">
                  San Miguel de Allende
                </Link>
              </li>
              <li>
                <Link href="/ciudades/queretaro" className="hover:text-fiestario-champagne transition-colors">
                  Querétaro
                </Link>
              </li>
              <li>
                <Link href="/ciudades/cancun-riviera-maya" className="hover:text-fiestario-champagne transition-colors">
                  Cancún & Riviera Maya
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-fiestario-stoneLight gap-4">
          <p>© {new Date().getFullYear()} FIESTARIO Technologies S.A.P.I. de C.V. Hecho con orgullo en México.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacidad" className="hover:text-fiestario-champagne transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-fiestario-champagne transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/contacto" className="hover:text-fiestario-champagne transition-colors">
              Soporte & Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
