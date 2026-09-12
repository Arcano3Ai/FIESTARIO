import { EventType, EventStyle, Vendor } from "@/types";
import { vendors } from "@/data/vendors";

export interface AIPlanResult {
  concept: string;
  suggestedStyle: EventStyle;
  tagline: string;
  paletteDescription: string;
  colors: string[];
  budgetBreakdown: {
    category: string;
    percentage: number;
    amount: number;
    description: string;
  }[];
  totalEstimated: number;
  priorities: string[];
  recommendedVendors: {
    vendor: Vendor;
    matchScore: number;
    matchReasons: string[];
  }[];
  suggestedChecklist: {
    title: string;
    category: string;
    phase: "12_MONTHS" | "6_MONTHS" | "3_MONTHS" | "1_MONTH" | "EVENT_DAY";
    phaseLabel: string;
  }[];
}

export function generateAIEvaluation(prompt: string, eventType?: EventType, guestCount?: number, budget?: number, city?: string): AIPlanResult {
  const lower = prompt.toLowerCase();

  // Infer parameters if not explicitly provided
  let detectedType: EventType = eventType || "Cumpleaños";
  if (lower.includes("boda") || lower.includes("matrimonio") || lower.includes("casamiento")) detectedType = "Boda";
  else if (lower.includes("xv") || lower.includes("quince") || lower.includes("15")) detectedType = "XV Años";
  else if (lower.includes("baby shower") || lower.includes("bebé") || lower.includes("gender reveal")) detectedType = "Baby Shower";
  else if (lower.includes("corporativo") || lower.includes("empresa") || lower.includes("gala")) detectedType = "Corporativo";
  else if (lower.includes("bautizo") || lower.includes("primera comunión")) detectedType = "Bautizo";

  let detectedGuests = guestCount || 80;
  const guestMatch = prompt.match(/(\d+)\s*(personas|invitados|pax)/i);
  if (guestMatch) {
    detectedGuests = parseInt(guestMatch[1], 10);
  }

  let detectedBudget = budget || 45000;
  const budgetMatch = prompt.match(/\$?\s*(\d{1,3}(?:[.,]\d{3})*|\d+)\s*(?:mil|pesos|mxn)?/i);
  if (budgetMatch && !budget) {
    const rawNum = budgetMatch[1].replace(/[.,]/g, "");
    const val = parseInt(rawNum, 10);
    if (val > 1000) detectedBudget = val;
    else if (val > 10 && val < 500) detectedBudget = val * 1000;
  }

  // Determine concept & style
  let concept = "Celebración Contemporánea de Lujo";
  let suggestedStyle: EventStyle = "Elegante";
  let tagline = "Una experiencia sensorial íntima y sofisticada.";
  let colors = ["#111111", "#FAF9F6", "#E7D8BF", "#B89B5E"];

  if (detectedType === "Boda") {
    concept = "Romance Editorial & Jardín Secreto";
    suggestedStyle = "Lujo & Editorial";
    tagline = "Iluminación etérea, mantelería de lino y gastronomía de autor al atardecer.";
    colors = ["#FAF9F6", "#E7D8BF", "#B89B5E", "#77736C"];
  } else if (detectedType === "XV Años") {
    concept = "Festival Glamour & Noche de Estrellas";
    suggestedStyle = "Moderno";
    tagline = "Audio de concierto, cabina 360 y una pista de baile que nunca se apaga.";
    colors = ["#111111", "#333333", "#D4BC7D", "#FAF9F6"];
  } else if (detectedType === "Cumpleaños") {
    if (lower.includes("parrillada") || lower.includes("asador") || lower.includes("carne")) {
      concept = "Asado Gourmet & Maridaje Norestense";
      suggestedStyle = "Mexicano Contemporáneo";
      tagline = "Cortes finos a las brasas de mezquite, tuétanos y música norteña de etiqueta.";
      colors = ["#2B1B17", "#B89B5E", "#D8C7AE", "#FAF9F6"];
    } else {
      concept = "Cumpleaños Boutique en Terraza";
      suggestedStyle = "Elegante";
      tagline = "Coctelería de autor, beats acústicos y atmósfera de alta noche.";
      colors = ["#1A1A1A", "#E7D8BF", "#B89B5E", "#FAF9F6"];
    }
  } else if (detectedType === "Baby Shower") {
    concept = "Brunch Botánico & Dulces Finos";
    suggestedStyle = "Boho Chic";
    tagline = "Tonos arena y champagne con esculturas de globos orgánicos y repostería artesanal.";
    colors = ["#FAF9F6", "#E7D8BF", "#D8C7AE", "#A39E96"];
  }

  // Calculate intelligent budget breakdown
  const total = detectedBudget;
  const budgetBreakdown = [
    {
      category: "Lugar / Locación",
      percentage: 32,
      amount: Math.round(total * 0.32),
      description: "Espacio con encanto arquitectónico y exclusividad horaria.",
    },
    {
      category: "Banquete & Alimentos",
      percentage: 28,
      amount: Math.round(total * 0.28),
      description: `Menú por persona calculado para ${detectedGuests} invitados.`,
    },
    {
      category: "Música & Audiovisual",
      percentage: 15,
      amount: Math.round(total * 0.15),
      description: "DJ con cabina de diseño o grupo en vivo de gala.",
    },
    {
      category: "Decoración & Ambientación",
      percentage: 12,
      amount: Math.round(total * 0.12),
      description: "Backdrop para fotos, iluminación puntual y centros de mesa.",
    },
    {
      category: "Fotografía & Recuerdos",
      percentage: 8,
      amount: Math.round(total * 0.08),
      description: "Galería digital con estética editorial para revivir el día.",
    },
    {
      category: "Fondo de Imprevistos",
      percentage: 5,
      amount: Math.round(total * 0.05),
      description: "Reserva del 5% para propinas o requerimientos de última hora.",
    },
  ];

  // Match ranking algorithm
  const ranked = vendors
    .map((vendor) => {
      let score = 85;
      const reasons: string[] = [];

      // Check event type match
      if (vendor.eventTypes.includes(detectedType)) {
        score += 6;
        reasons.push(`Especialista probado en ${detectedType}`);
      }

      // Check style match
      if (vendor.styles.includes(suggestedStyle)) {
        score += 4;
        reasons.push(`Alineado al concepto ${suggestedStyle}`);
      }

      // Check keyword interest (autos, música, shows, banquetes, planners)
      if (
        (lower.includes("auto") || lower.includes("coche") || lower.includes("transporte") || lower.includes("limusina")) &&
        vendor.categoryId === "autos"
      ) {
        score += 8;
        reasons.push("Vehículo de colección / Transportación VIP seleccionada");
      }

      if (
        (lower.includes("show") || lower.includes("animacion") || lower.includes("circo") || lower.includes("fuego") || lower.includes("pirotecnia")) &&
        vendor.categoryId === "shows"
      ) {
        score += 8;
        reasons.push("Show de alto impacto escénico recomendado");
      }

      if (
        (lower.includes("musica") || lower.includes("dj") || lower.includes("mariachi") || lower.includes("orquesta") || lower.includes("cuerdas") || lower.includes("banda")) &&
        (vendor.categoryId === "musica-vivo" || vendor.categoryId === "musica-dj")
      ) {
        score += 8;
        reasons.push("Ensamble musical curado para tu celebración");
      }

      // Check rating
      if (vendor.rating >= 4.9) {
        score += 3;
        reasons.push(`Calificación excepcional (${vendor.rating} ★)`);
      }

      // Check verification
      if (vendor.verified) {
        reasons.push("✓ Proveedor Verificado FIESTARIO");
      }

      if (vendor.responseTime.includes("min") || vendor.responseTime.includes("< 1 hora")) {
        reasons.push("Tiempo de respuesta ultrarrápido");
      }

      // Cap at 99%
      score = Math.min(99, score);

      return {
        vendor,
        matchScore: score,
        matchReasons: reasons.slice(0, 3),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  // Suggested timeline checklist
  const suggestedChecklist = [
    { title: `Reservar locación recomendada para ${detectedGuests} pax`, category: "Lugar", phase: "12_MONTHS" as const, phaseLabel: "Fase Inicial" },
    { title: "Definir menú con banquetero o parrillero", category: "Banquete", phase: "6_MONTHS" as const, phaseLabel: "Fase 2" },
    { title: "Contratar música (DJ / Grupo de Gala)", category: "Música", phase: "3_MONTHS" as const, phaseLabel: "Fase 3" },
    { title: "Aprobar diseño de escenografía y backdrop de fotos", category: "Decoración", phase: "1_MONTH" as const, phaseLabel: "Fase 4" },
    { title: "Confirmar cronograma y accesos con proveedores", category: "Logística", phase: "EVENT_DAY" as const, phaseLabel: "Día del Evento" },
  ];

  const priorities = [
    `Asegurar la fecha con al menos 4 meses de anticipación para garantizar disponibilidad de locación.`,
    `Degustación previa del menú para validar sazón y porciones para los ${detectedGuests} invitados.`,
    `Coordinar la paleta visual (${colors.slice(0, 2).join(", ")}) entre la decoración y el mobiliario.`,
  ];

  return {
    concept,
    suggestedStyle,
    tagline,
    paletteDescription: `Paleta sofisticada con base en ${colors[0]} y acentos cálidos en ${colors[2]}.`,
    colors,
    budgetBreakdown,
    totalEstimated: total,
    priorities,
    recommendedVendors: ranked,
    suggestedChecklist,
  };
}
