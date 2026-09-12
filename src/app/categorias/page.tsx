import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Categorías de Eventos · FIESTARIO México",
  description: "Explora las 18 categorías especializadas de proveedores para eventos en México: quintas, banquetes, autos clásicos, animación, DJs, mariachi, fotografía y más.",
};

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="gold">
          <Sparkles className="w-3.5 h-3.5 text-fiestario-gold" />
          <span>Directorio Especializado</span>
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl text-fiestario-carbon font-light">
          Categorías de Proveedores
        </h1>
        <p className="text-sm text-fiestario-stone">
          Todo lo necesario para celebrar con excelencia. Desde locaciones históricas hasta los detalles de repostería más minuciosos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.slug}`}
            className="group flex flex-col bg-white border border-fiestario-stoneMuted/40 rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-fiestario-cream">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                {cat.vendorCount} proveedores
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-xl text-fiestario-carbon font-medium group-hover:text-fiestario-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-fiestario-stone mt-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories tags */}
                <div className="mt-4 pt-3 border-t border-fiestario-stoneMuted/30 flex flex-wrap gap-1.5">
                  {cat.subcategories.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-fiestario-cream px-2 py-0.5 rounded-full text-fiestario-carbon"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-[11px] text-fiestario-stone px-1 py-0.5">
                      +{cat.subcategories.length - 3} más
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-fiestario-carbon group-hover:text-fiestario-gold transition-colors">
                <span>Ver proveedores</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
