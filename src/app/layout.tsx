import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FiestarioStoreProvider } from "@/lib/store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIESTARIO · Todo para celebrar. En un solo lugar.",
  description:
    "El marketplace premium de eventos de México. Descubre y cotiza quintas, salones, catering, taquizas gourmet, decoración, DJs y fotografía en Monterrey, CDMX, Guadalajara y más.",
  keywords: [
    "eventos monterrey",
    "quintas santiago nl",
    "bodas san miguel de allende",
    "proveedores de eventos mexico",
    "catering monterrey",
    "dj para bodas",
    "decoracion globos",
    "fiestario",
  ],
  authors: [{ name: "Fiestario Technologies" }],
  openGraph: {
    title: "FIESTARIO · The Premium Event Marketplace for Mexico",
    description: "Todo para celebrar. En un solo lugar. Cotiza directamente con los mejores proveedores de eventos.",
    type: "website",
    locale: "es_MX",
    url: "https://fiestario.mx",
    siteName: "FIESTARIO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-fiestario-warmWhite text-fiestario-carbon antialiased selection:bg-fiestario-champagne selection:text-fiestario-carbon">
        <FiestarioStoreProvider>
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </FiestarioStoreProvider>
      </body>
    </html>
  );
}
