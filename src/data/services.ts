import { Service } from "@/types";

export const services: Service[] = [
  // Quinta Monte Real
  {
    id: "srv-monte-real-boda",
    vendorId: "quinta-monte-real",
    categoryId: "lugares",
    name: "Renta de Quinta para Boda & Recepción de Gala",
    slug: "renta-quinta-boda-gala",
    description: "Uso exclusivo de jardines, explanada de madera techada, suite nupcial climatizada por 10 horas de evento más 4 horas de montaje previo. Planta de luz trifásica de 75 kW incluida.",
    priceFrom: 45000,
    priceTo: 65000,
    pricingType: "FIXED",
    duration: "10 horas de evento",
    capacityMin: 80,
    capacityMax: 400,
    inclusions: [
      "Explanada techada con piso pulido",
      "Suite nupcial con baño privado y aire acondicionado",
      "Planta de luz de emergencia",
      "Seguridad privada en accesos y estacionamiento",
      "Personal de limpieza continua en sanitarios de lujo",
      "Descorche libre sin cargo adicional"
    ],
    exclusions: ["Banquete y bebidas (se cotizan por separado)", "Decoración floral"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "srv-monte-real-cumple",
    vendorId: "quinta-monte-real",
    categoryId: "lugares",
    name: "Renta de Jardín & Alberca para Cumpleaños Boutique",
    slug: "renta-jardin-alberca-cumpleanos",
    description: "Área de alberca, terraza techada con asador de acero inoxidable, sombrillas y salas lounge para fiestas de día o atardecer.",
    priceFrom: 28000,
    pricingType: "FIXED",
    duration: "7 horas",
    capacityMin: 30,
    capacityMax: 120,
    inclusions: [
      "Terraza con barra y asador",
      "Mobiliario básico para 60 personas",
      "Acceso a alberca iluminada",
      "Audio ambiental Bluetooth"
    ],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Casa Aurelia
  {
    id: "srv-casa-aurelia-exclusiva",
    vendorId: "casa-aurelia-eventos",
    categoryId: "lugares",
    name: "Cena Privada / Boda Boutique en Residencia Aurelia",
    slug: "cena-privada-boda-boutique",
    description: "Acceso total a la residencia, patio interior de cantera, espejo de agua y salón climatizado con ventanales de piso a techo.",
    priceFrom: 42000,
    pricingType: "FIXED",
    duration: "8 horas",
    capacityMin: 20,
    capacityMax: 150,
    inclusions: [
      "Valet parking con seguro de cobertura amplia",
      "Iluminación escénica en árboles y fuentes",
      "Gerente de casa y concierge durante todo el evento",
      "Cocina industrial de ensamblaje para banquetero"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Mesa & Fuego
  {
    id: "srv-mesa-fuego-parrillada",
    vendorId: "mesa-y-fuego",
    categoryId: "taquizas",
    name: "Banquete Parrillero Norestense Sterling Silver",
    slug: "banquete-parrillero-sterling-silver",
    description: "Rib Eye y New York Choice al carbón de mezquite, tuétanos asados con escamoles o esquites, cazuela de queso menonita con chorizo de Cadereyta, guacamole rústico en molcajete y salsas tatemadas al momento.",
    priceFrom: 480,
    pricingType: "PER_PERSON",
    duration: "4 horas de servicio",
    capacityMin: 40,
    capacityMax: 500,
    inclusions: [
      "Parrilleros profesionales con mandiles de piel",
      "Cortes certificados importados",
      "Montaje en tablas de madera de mezquite curadas",
      "Tortillas de maíz y harina hechas a mano en el evento",
      "Frijoles con veneno (tocino y asado de puerco)"
    ],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Luna Decor Studio
  {
    id: "srv-luna-backdrop-editorial",
    vendorId: "luna-decor-studio",
    categoryId: "decoracion",
    name: "Diseño & Montaje de Backdrop Escenográfico Editorial",
    slug: "backdrop-escenografico-editorial",
    description: "Mamparas personalizadas con texturas de estuco veneciano, acrílico espejo, letrero de neón LED a medida con frase del evento, pedestales florales y detalles cromados.",
    priceFrom: 14500,
    pricingType: "FIXED",
    duration: "Montaje y desmontaje incluido",
    inclusions: [
      "Diseño de render previo en 3D",
      "Estructuras autoportantes",
      "Letrero neón personalizado que el cliente puede conservar",
      "Iluminación puntual LED dimerizable"
    ],
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Norteño 24
  {
    id: "srv-norteno-show-2horas",
    vendorId: "norteno-24",
    categoryId: "musica-vivo",
    name: "Presentación de Gala Norteño 24 (2 Horas)",
    slug: "presentacion-gala-norteno-24",
    description: "2 horas continuas con 5 músicos de gala. Acordeón, bajo sexto, bajo eléctrico, batería y percusiones. Equipo de audio Bose / Yamaha propio para hasta 200 personas sin costo adicional.",
    priceFrom: 16000,
    pricingType: "FIXED",
    duration: "2 horas",
    inclusions: [
      "5 Músicos uniformados con traje de etiqueta y texana",
      "Equipo de sonorización profesional y microfonía Shure",
      "Repertorio a petición del festejado"
    ],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Momentos Fotografía
  {
    id: "srv-momentos-boda-editorial",
    vendorId: "momentos-fotografia",
    categoryId: "fotografia",
    name: "Colección Nupcial Editorial & Sesión Save The Date",
    slug: "coleccion-nupcial-editorial",
    description: "10 horas de cobertura con fotógrafo principal y segundo tirador. Sesión casual previa, cobertura desde el Getting Ready hasta la fiesta. Entrega de 600+ fotografías editadas en colorimetría editorial fina y galería web privada durante 1 año.",
    priceFrom: 29500,
    pricingType: "FIXED",
    duration: "10 horas",
    inclusions: [
      "2 Fotógrafos profesionales",
      "Sesión casual en locación (2 horas)",
      "Galería digital de alta velocidad sin límite de descargas",
      "Caja de madera con 30 impresiones fine art y USB en piel"
    ],
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // DJ Silverio
  {
    id: "srv-dj-silverio-show",
    vendorId: "dj-silverio-beats",
    categoryId: "musica-dj",
    name: "Experiencia DJ & Audio Line Array de Alta Gama",
    slug: "experiencia-dj-audio-alta-gama",
    description: "Set en vivo de 6 horas continuas. Cabina de acrílico iluminada, sistema de sonido L-Acoustics de fidelidad acústica, 8 cabezas móviles Beam robóticas, barras de wash arquitectónico para paredes y máquina de humo bajo para vals o momento estelar.",
    priceFrom: 24000,
    pricingType: "FIXED",
    duration: "6 horas",
    inclusions: [
      "DJ profesional y operador de iluminación en vivo",
      "Audio Line Array de alto impacto",
      "Iluminación robótica programada por DMX",
      "Humo bajo para vals / entrada triunfal",
      "Micrófonos inalámbricos Sennheiser para brindis"
    ],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Flores Alma
  {
    id: "srv-flores-arco-monumental",
    vendorId: "flores-alma-taller",
    categoryId: "flores",
    name: "Arco Floral Monumental para Ceremonia",
    slug: "arco-floral-monumental",
    description: "Estructura circular o cuadrada cubierta en un 80% con rosas de exportación, hortensias, ranúnculos, delfinios y follaje de eucalipto dólar y olivo natural.",
    priceFrom: 18500,
    pricingType: "FIXED",
    inclusions: [
      "Flores naturales de primera calidad",
      "Montaje en sitio 4 horas antes del evento",
      "Desmontaje al término de la ceremonia"
    ],
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Elixir Cocktail Bar
  {
    id: "srv-elixir-barra-libre",
    vendorId: "elixir-cocktail-bar",
    categoryId: "mixologia",
    name: "Barra Libre de Coctelería de Autor (5 Horas)",
    slug: "barra-libre-cocteleria-autor",
    description: "Menú de 4 cócteles diseñados para tu evento más coctelería clásica. Mezcales espadín, ginebra premium, tequila reposado, licores artesanales, botánicos frescos y barra de madera o mármol.",
    priceFrom: 280,
    pricingType: "PER_PERSON",
    duration: "5 horas",
    capacityMin: 40,
    capacityMax: 300,
    inclusions: [
      "Mixólogos profesionales certificados",
      "Cristalería fina de cristal cortado",
      "Hielos artesanales traslúcidos con sello a fuego",
      "Destilados, mezcladores, frutas y jarabes botánicos"
    ],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Pastelería Dulce Pecado
  {
    id: "srv-dulce-pecado-pastel-3pisos",
    vendorId: "pasteleria-dulce-pecado",
    categoryId: "reposteria",
    name: "Pastel Escultural de 3 Pisos para 100 Personas",
    slug: "pastel-escultural-3-pisos",
    description: "Tres pisos de altura con diseño personalizado de texturas minerales, acabados en lámina de oro comestible y flores de azúcar hechas pétalo a pétalo.",
    priceFrom: 6800,
    pricingType: "FIXED",
    inclusions: [
      "Degustación previa de 4 combinaciones de sabor para 2 personas",
      "Base de pedestal de cerámica o latón en comodato",
      "Entrega climatizada y montaje en el lugar del evento"
    ],
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
    active: true,
  },

  // Taquizas Tradición Regia
  {
    id: "srv-taquiza-regia-clasica",
    vendorId: "taquizas-tradicion-regia",
    categoryId: "taquizas",
    name: "Taquiza Tradicional Mexicana en Cazuelas de Barro",
    slug: "taquiza-tradicional-mexicana",
    description: "Buffet libre de 6 guisados a elegir servidos en cazuelas calientes, arroz rojo tradicional, frijoles charros con tocino y salchicha, 3 salsas caseras, limones, cebolla curtida y tortillas calientitas.",
    priceFrom: 135,
    pricingType: "PER_PERSON",
    duration: "3 horas de servicio continuo",
    capacityMin: 30,
    capacityMax: 400,
    inclusions: [
      "Personal uniformado para servir los tacos",
      "Platos y servilletas desechables de alta resistencia o vajilla",
      "Cazuelas de barro decorativas para mesa buffet",
      "Garantía de que nadie se quede con hambre"
    ],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
];
