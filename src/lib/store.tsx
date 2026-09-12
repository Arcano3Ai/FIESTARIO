"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Vendor, Quote, EventPlan, Conversation, Message, ChecklistTask, BudgetItem } from "@/types";
import { vendors as initialVendors } from "@/data/vendors";

interface FiestarioStoreContextType {
  // Current user & role switcher
  currentUser: User;
  setCurrentUserRole: (role: "CUSTOMER" | "VENDOR" | "ADMIN") => void;

  // Favorites
  favorites: string[]; // vendor ids
  toggleFavorite: (vendorId: string) => void;
  isFavorite: (vendorId: string) => boolean;

  // Comparison
  compareList: string[]; // vendor ids (max 3)
  toggleCompare: (vendorId: string) => void;
  removeFromCompare: (vendorId: string) => void;
  clearCompare: () => void;

  // Events & Planning
  events: EventPlan[];
  activeEvent: EventPlan | null;
  createEvent: (eventData: Partial<EventPlan>) => EventPlan;
  updateEvent: (eventId: string, updates: Partial<EventPlan>) => void;
  toggleTaskCompleted: (eventId: string, taskId: string) => void;
  updateBudgetItem: (eventId: string, itemId: string, updates: Partial<BudgetItem>) => void;

  // Quotes
  quotes: Quote[];
  requestQuote: (quoteData: Partial<Quote>) => Quote;
  updateQuoteStatus: (quoteId: string, status: Quote["status"]) => void;

  // Messaging
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  startConversation: (vendorId: string, initialMessage?: string) => Conversation;

  // Vendors list state (allows admin verification simulation)
  allVendors: Vendor[];
  updateVendorStatus: (vendorId: string, status: Vendor["status"]) => void;
}

const mockUsers: Record<string, User> = {
  CUSTOMER: {
    id: "user-cust-1",
    name: "Valeria Morales",
    email: "valeria.morales@gmail.com",
    role: "CUSTOMER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    phone: "+52 81 1234 5678",
    createdAt: "2024-01-10",
  },
  VENDOR: {
    id: "user-vend-1",
    name: "Alberto Garza (Quinta Monte Real)",
    email: "alberto@quintamontereal.mx",
    role: "VENDOR",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    phone: "+52 81 8345 9200",
    createdAt: "2023-11-05",
  },
  ADMIN: {
    id: "user-admin-1",
    name: "Director FIESTARIO",
    email: "admin@fiestario.mx",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    phone: "+52 55 1000 0000",
    createdAt: "2023-01-01",
  },
};

const initialSampleEvent: EventPlan = {
  id: "evt-sample-1",
  customerId: "user-cust-1",
  name: "Boda Campestre Valeria & Carlos",
  type: "Boda",
  date: "2025-11-15",
  city: "Monterrey",
  zone: "Santiago N.L.",
  guestCount: 180,
  totalBudget: 280000,
  style: "Elegante",
  description: "Boda al atardecer con ceremonia en jardín, cena de gala y música en vivo con grupo norteño y DJ.",
  status: "PLANNING",
  matchedVendorIds: ["quinta-monte-real", "mesa-y-fuego", "flores-alma-taller", "norteno-24"],
  createdAt: "2024-02-01",
  updatedAt: "2024-02-15",
  tasks: [
    { id: "t-1", eventId: "evt-sample-1", title: "Reservar Quinta Monte Real", category: "Lugar", phase: "12_MONTHS", phaseLabel: "12 meses antes", completed: true, priority: "HIGH", assignedVendorName: "Quinta Monte Real" },
    { id: "t-2", eventId: "evt-sample-1", title: "Degustación de menú parrillero", category: "Banquete", phase: "6_MONTHS", phaseLabel: "6 meses antes", completed: true, priority: "HIGH", assignedVendorName: "Mesa & Fuego" },
    { id: "t-3", eventId: "evt-sample-1", title: "Definir paleta de color y diseño floral", category: "Decoración", phase: "6_MONTHS", phaseLabel: "6 meses antes", completed: false, priority: "MEDIUM", assignedVendorName: "Flores Alma" },
    { id: "t-4", eventId: "evt-sample-1", title: "Contratar grupo norteño para tornaboda", category: "Música", phase: "3_MONTHS", phaseLabel: "3 meses antes", completed: false, priority: "HIGH", assignedVendorName: "Norteño 24" },
    { id: "t-5", eventId: "evt-sample-1", title: "Prueba de peinado y maquillaje", category: "Belleza", phase: "1_MONTH", phaseLabel: "1 mes antes", completed: false, priority: "MEDIUM" },
    { id: "t-6", eventId: "evt-sample-1", title: "Confirmación final de invitados (RSVP)", category: "Coordinación", phase: "2_WEEKS", phaseLabel: "2 semanas antes", completed: false, priority: "HIGH" },
    { id: "t-7", eventId: "evt-sample-1", title: "Coordinación de tiempos con proveedores", category: "Logística", phase: "EVENT_DAY", phaseLabel: "Día del evento", completed: false, priority: "HIGH" },
  ],
  budgetItems: [
    { id: "b-1", eventId: "evt-sample-1", category: "Lugar & Locación", name: "Quinta Monte Real (10 hrs)", estimated: 55000, actual: 52000, status: "COMMITTED", vendorName: "Quinta Monte Real" },
    { id: "b-2", eventId: "evt-sample-1", category: "Catering & Banquetes", name: "Mesa & Fuego Parrillada 180 pax", estimated: 86400, actual: 86400, status: "COMMITTED", vendorName: "Mesa & Fuego" },
    { id: "b-3", eventId: "evt-sample-1", category: "Música & Audio", name: "DJ Silverio Beats + Norteño 24", estimated: 40000, actual: 38000, status: "PENDING" },
    { id: "b-4", eventId: "evt-sample-1", category: "Decoración & Flores", name: "Arco floral y centros de mesa", estimated: 35000, actual: 32000, status: "PENDING" },
    { id: "b-5", eventId: "evt-sample-1", category: "Fotografía & Video", name: "Momentos Fotografía Colección Gala", estimated: 30000, actual: 29500, status: "PAID", vendorName: "Momentos Fotografía" },
    { id: "b-6", eventId: "evt-sample-1", category: "Pastelería & Postres", name: "Pastel Escultural 3 Pisos", estimated: 8000, actual: 6800, status: "PENDING" },
    { id: "b-7", eventId: "evt-sample-1", category: "Imprevistos & Propinas", name: "Fondo de contingencia", estimated: 25600, actual: 0, status: "PENDING" },
  ],
};

const initialQuotes: Quote[] = [
  {
    id: "q-1",
    eventId: "evt-sample-1",
    customerId: "user-cust-1",
    customerName: "Valeria Morales",
    customerEmail: "valeria.morales@gmail.com",
    vendorId: "quinta-monte-real",
    vendorName: "Quinta Monte Real",
    vendorAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
    serviceId: "srv-monte-real-boda",
    serviceName: "Renta de Quinta para Boda & Recepción de Gala",
    status: "ACCEPTED",
    eventDate: "15 de Noviembre, 2025",
    guestCount: 180,
    location: "Santiago, N.L.",
    budget: 60000,
    customerNotes: "Queremos ceremonia civil en el jardín y recepción en la explanada techada.",
    vendorNotes: "Incluye suite nupcial sin cargo y planta de luz de respaldo.",
    items: [
      { name: "Renta de Quinta Monte Real (10 horas)", quantity: 1, unitPrice: 50000, total: 50000 },
      { name: "Mobiliario básico de cortesía (18 mesas + 180 sillas)", quantity: 1, unitPrice: 0, total: 0 },
      { name: "Servicio de limpieza y seguridad en estacionamiento", quantity: 1, unitPrice: 2000, total: 2000 },
    ],
    subtotal: 52000,
    discount: 2000,
    tax: 0,
    total: 50000,
    validUntil: "2025-05-30",
    responseTime: "45 min",
    includedList: ["Explanada techada", "Jardines", "Suite nupcial", "Seguridad"],
    notIncludedList: ["Banquete", "Bebidas", "Flores"],
    createdAt: "2024-02-05",
  },
  {
    id: "q-2",
    eventId: "evt-sample-1",
    customerId: "user-cust-1",
    customerName: "Valeria Morales",
    customerEmail: "valeria.morales@gmail.com",
    vendorId: "mesa-y-fuego",
    vendorName: "Mesa & Fuego Parrilladas de Autor",
    vendorAvatar: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&q=80",
    serviceId: "srv-mesa-fuego-parrillada",
    serviceName: "Banquete Parrillero Norestense Sterling Silver",
    status: "NEGOTIATING",
    eventDate: "15 de Noviembre, 2025",
    guestCount: 180,
    location: "Quinta Monte Real, Santiago N.L.",
    budget: 90000,
    customerNotes: "Nos interesa incluir la estación de tuétanos y queso flameado.",
    vendorNotes: "Propuesta especial con 4 horas continuas de asador a la vista.",
    items: [
      { name: "Banquete Parrillero Sterling Silver por persona", quantity: 180, unitPrice: 480, total: 86400 },
      { name: "Estación de tuétanos al mezquite para cóctel de bienvenida", quantity: 1, unitPrice: 4500, total: 4500 },
    ],
    subtotal: 90900,
    discount: 4500,
    tax: 0,
    total: 86400,
    validUntil: "2025-06-15",
    responseTime: "1 hora",
    includedList: ["Cortes Choice Sterling Silver", "Parrilleros profesionales", "Tortillas hechas a mano", "Salsas y guarniciones"],
    notIncludedList: ["Bebidas alcohólicas", "Vajilla de gala"],
    createdAt: "2024-02-10",
  },
  {
    id: "q-3",
    eventId: "evt-sample-1",
    customerId: "user-cust-1",
    customerName: "Valeria Morales",
    customerEmail: "valeria.morales@gmail.com",
    vendorId: "norteno-24",
    vendorName: "Norteño 24 de Monterrey",
    vendorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    serviceId: "srv-norteno-show-2horas",
    serviceName: "Presentación de Gala Norteño 24 (2 Horas)",
    status: "SENT",
    eventDate: "15 de Noviembre, 2025",
    guestCount: 180,
    location: "Santiago N.L.",
    customerNotes: "Para tocar en la tornaboda de 1:00 am a 3:00 am.",
    items: [
      { name: "Presentación de Gala Norteño 24 (2 horas)", quantity: 1, unitPrice: 16000, total: 16000 },
    ],
    subtotal: 16000,
    discount: 0,
    tax: 0,
    total: 16000,
    validUntil: "2025-07-01",
    responseTime: "20 min",
    includedList: ["5 Músicos de gala", "Sonido Bose profesional", "Repertorio personalizado"],
    notIncludedList: ["Horas extra fuera de contrato"],
    createdAt: "2024-02-14",
  },
];

const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    customerId: "user-cust-1",
    customerName: "Valeria Morales",
    vendorId: "quinta-monte-real",
    vendorName: "Quinta Monte Real",
    vendorAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
    vendorSlug: "quinta-monte-real",
    lastMessage: "¡Excelente! Hemos marcado la fecha 15 de Noviembre como reservada para ustedes.",
    lastMessageTime: "Ayer, 18:30",
    unreadCount: 0,
    messages: [
      { id: "m-1", conversationId: "conv-1", senderId: "user-cust-1", senderName: "Valeria Morales", senderRole: "CUSTOMER", text: "Hola Alberto, ¿cómo estás? Queremos revisar si la fecha del 15 de noviembre de 2025 sigue disponible.", createdAt: "2024-02-05T10:00:00" },
      { id: "m-2", conversationId: "conv-1", senderId: "user-vend-1", senderName: "Alberto Garza", senderRole: "VENDOR", text: "¡Hola Valeria! Sí, la fecha está totalmente libre. Te acabo de adjuntar la cotización formal con el beneficio de suite nupcial.", createdAt: "2024-02-05T10:45:00" },
      { id: "m-3", conversationId: "conv-1", senderId: "user-cust-1", senderName: "Valeria Morales", senderRole: "CUSTOMER", text: "¡Muchísimas gracias! Ya la aceptamos en Fiestario.", createdAt: "2024-02-06T14:10:00" },
      { id: "m-4", conversationId: "conv-1", senderId: "user-vend-1", senderName: "Alberto Garza", senderRole: "VENDOR", text: "¡Excelente! Hemos marcado la fecha 15 de Noviembre como reservada para ustedes.", createdAt: "2024-02-06T14:25:00" },
    ],
  },
  {
    id: "conv-2",
    customerId: "user-cust-1",
    customerName: "Valeria Morales",
    vendorId: "mesa-y-fuego",
    vendorName: "Mesa & Fuego Parrilladas",
    vendorAvatar: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&q=80",
    vendorSlug: "mesa-y-fuego",
    lastMessage: "¿A qué hora te gustaría programar la degustación para los 4 comensales?",
    lastMessageTime: "Hoy, 10:15",
    unreadCount: 1,
    messages: [
      { id: "m-20", conversationId: "conv-2", senderId: "user-cust-1", senderName: "Valeria Morales", senderRole: "CUSTOMER", text: "Hola, nos encanta su propuesta para la boda en Quinta Monte Real. ¿Podríamos agendar degustación de los cortes?", createdAt: "2024-02-10T16:00:00" },
      { id: "m-21", conversationId: "conv-2", senderId: "vend-mesa", senderName: "Chef Roberto (Mesa & Fuego)", senderRole: "VENDOR", text: "¡Claro que sí, Valeria! Con gusto los recibimos en nuestro taller de San Pedro. ¿A qué hora te gustaría programar la degustación para los 4 comensales?", createdAt: "2024-02-11T10:15:00" },
    ],
  },
];

const FiestarioStoreContext = createContext<FiestarioStoreContextType | null>(null);

export function FiestarioStoreProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<"CUSTOMER" | "VENDOR" | "ADMIN">("CUSTOMER");
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.CUSTOMER);
  const [favorites, setFavorites] = useState<string[]>(["quinta-monte-real", "mesa-y-fuego", "luna-decor-studio"]);
  const [compareList, setCompareList] = useState<string[]>(["quinta-monte-real", "casa-aurelia-eventos"]);
  const [events, setEvents] = useState<EventPlan[]>([initialSampleEvent]);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [allVendors, setAllVendors] = useState<Vendor[]>(initialVendors);

  // Sync current user when role changes
  const setCurrentUserRole = (role: "CUSTOMER" | "VENDOR" | "ADMIN") => {
    setCurrentRole(role);
    setCurrentUser(mockUsers[role]);
  };

  // Favorites logic
  const toggleFavorite = (vendorId: string) => {
    setFavorites((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const isFavorite = (vendorId: string) => favorites.includes(vendorId);

  // Compare logic (up to 3)
  const toggleCompare = (vendorId: string) => {
    setCompareList((prev) => {
      if (prev.includes(vendorId)) {
        return prev.filter((id) => id !== vendorId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], vendorId];
      }
      return [...prev, vendorId];
    });
  };

  const removeFromCompare = (vendorId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== vendorId));
  };

  const clearCompare = () => setCompareList([]);

  // Events logic
  const createEvent = (eventData: Partial<EventPlan>): EventPlan => {
    const newEvent: EventPlan = {
      id: "evt-" + Date.now(),
      customerId: currentUser.id,
      name: eventData.name || "Mi Nuevo Evento",
      type: eventData.type || "Cumpleaños",
      date: eventData.date || new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
      city: eventData.city || "Monterrey",
      zone: eventData.zone || "San Pedro Garza García",
      guestCount: eventData.guestCount || 80,
      totalBudget: eventData.totalBudget || 45000,
      style: eventData.style || "Elegante",
      description: eventData.description || "",
      status: "PLANNING",
      tasks: eventData.tasks || [
        { id: "t-101", eventId: "new", title: "Elegir y reservar lugar / locación", category: "Lugar", phase: "12_MONTHS", phaseLabel: "Fase 1", completed: false, priority: "HIGH" },
        { id: "t-102", eventId: "new", title: "Definir menú y banquete", category: "Catering", phase: "6_MONTHS", phaseLabel: "Fase 2", completed: false, priority: "HIGH" },
        { id: "t-103", eventId: "new", title: "Contratar música y audio profesional", category: "Música", phase: "3_MONTHS", phaseLabel: "Fase 3", completed: false, priority: "HIGH" },
        { id: "t-104", eventId: "new", title: "Diseño de decoración y ambientación", category: "Decoración", phase: "3_MONTHS", phaseLabel: "Fase 3", completed: false, priority: "MEDIUM" },
        { id: "t-105", eventId: "new", title: "Contratar fotografía de recuerdo", category: "Fotografía", phase: "1_MONTH", phaseLabel: "Fase 4", completed: false, priority: "MEDIUM" },
        { id: "t-106", eventId: "new", title: "Confirmación final con proveedores", category: "Logística", phase: "EVENT_DAY", phaseLabel: "Día del evento", completed: false, priority: "HIGH" },
      ],
      budgetItems: eventData.budgetItems || [
        { id: "b-101", eventId: "new", category: "Lugar & Espacio", name: "Renta de Quinta o Salón", estimated: (eventData.totalBudget || 45000) * 0.35, actual: 0, status: "PENDING" },
        { id: "b-102", eventId: "new", category: "Comida & Banquete", name: "Alimentos por persona", estimated: (eventData.totalBudget || 45000) * 0.30, actual: 0, status: "PENDING" },
        { id: "b-103", eventId: "new", category: "Música & Sonido", name: "DJ / Grupo en vivo", estimated: (eventData.totalBudget || 45000) * 0.15, actual: 0, status: "PENDING" },
        { id: "b-104", eventId: "new", category: "Decoración & Arte", name: "Backdrop y ambientación", estimated: (eventData.totalBudget || 45000) * 0.10, actual: 0, status: "PENDING" },
        { id: "b-105", eventId: "new", category: "Fotografía & Video", name: "Cobertura del evento", estimated: (eventData.totalBudget || 45000) * 0.10, actual: 0, status: "PENDING" },
      ],
      matchedVendorIds: eventData.matchedVendorIds || ["quinta-monte-real", "mesa-y-fuego", "dj-silverio-beats"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (eventId: string, updates: Partial<EventPlan>) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, ...updates, updatedAt: new Date().toISOString() } : evt))
    );
  };

  const toggleTaskCompleted = (eventId: string, taskId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          tasks: evt.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
        };
      })
    );
  };

  const updateBudgetItem = (eventId: string, itemId: string, updates: Partial<BudgetItem>) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          budgetItems: evt.budgetItems.map((b) => (b.id === itemId ? { ...b, ...updates } : b)),
        };
      })
    );
  };

  // Quotes logic
  const requestQuote = (quoteData: Partial<Quote>): Quote => {
    const vendor = allVendors.find((v) => v.id === quoteData.vendorId) || allVendors[0];
    const newQuote: Quote = {
      id: "q-" + Date.now(),
      eventId: quoteData.eventId || events[0]?.id,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      vendorId: vendor.id,
      vendorName: vendor.businessName,
      vendorAvatar: vendor.logo,
      serviceId: quoteData.serviceId,
      serviceName: quoteData.serviceName || "Cotización Personalizada",
      status: "SENT",
      eventDate: quoteData.eventDate || "Próxima fecha",
      guestCount: quoteData.guestCount || 80,
      location: quoteData.location || "Monterrey, N.L.",
      budget: quoteData.budget || 25000,
      customerNotes: quoteData.customerNotes || "Solicitud de información y disponibilidad.",
      items: [
        { name: quoteData.serviceName || "Servicio Principal", quantity: 1, unitPrice: quoteData.budget || 20000, total: quoteData.budget || 20000 },
      ],
      subtotal: quoteData.budget || 20000,
      discount: 0,
      tax: 0,
      total: quoteData.budget || 20000,
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      responseTime: vendor.responseTime,
      includedList: ["Asesoría personalizada", "Propuesta detallada en PDF"],
      createdAt: new Date().toISOString(),
    };

    setQuotes((prev) => [newQuote, ...prev]);

    // Also initiate or find conversation with this vendor
    startConversation(vendor.id, `Hola, acabo de enviarles una solicitud de cotización para mi evento el ${newQuote.eventDate}.`);

    return newQuote;
  };

  const updateQuoteStatus = (quoteId: string, status: Quote["status"]) => {
    setQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status } : q)));
  };

  // Messaging logic
  const startConversation = (vendorId: string, initialMessage?: string): Conversation => {
    const existing = conversations.find((c) => c.vendorId === vendorId);
    if (existing) {
      if (initialMessage) {
        sendMessage(existing.id, initialMessage);
      }
      return existing;
    }

    const vendor = allVendors.find((v) => v.id === vendorId) || allVendors[0];
    const newConv: Conversation = {
      id: "conv-" + Date.now(),
      customerId: currentUser.id,
      customerName: currentUser.name,
      vendorId: vendor.id,
      vendorName: vendor.businessName,
      vendorAvatar: vendor.logo,
      vendorSlug: vendor.slug,
      lastMessage: initialMessage || "Conversación iniciada",
      lastMessageTime: "Ahora",
      unreadCount: 0,
      messages: initialMessage
        ? [
            {
              id: "msg-" + Date.now(),
              conversationId: "conv-" + Date.now(),
              senderId: currentUser.id,
              senderName: currentUser.name,
              senderRole: currentUser.role,
              text: initialMessage,
              createdAt: new Date().toISOString(),
            },
          ]
        : [],
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  const sendMessage = (conversationId: string, text: string) => {
    const newMessage: Message = {
      id: "msg-" + Date.now(),
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: "Ahora",
          messages: [...c.messages, newMessage],
        };
      })
    );
  };

  // Admin vendor status management
  const updateVendorStatus = (vendorId: string, status: Vendor["status"]) => {
    setAllVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status, verified: status === "VERIFIED" } : v))
    );
  };

  return (
    <FiestarioStoreContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        events,
        activeEvent: events[0] || null,
        createEvent,
        updateEvent,
        toggleTaskCompleted,
        updateBudgetItem,
        quotes,
        requestQuote,
        updateQuoteStatus,
        conversations,
        sendMessage,
        startConversation,
        allVendors,
        updateVendorStatus,
      }}
    >
      {children}
    </FiestarioStoreContext.Provider>
  );
}

export function useFiestario() {
  const context = useContext(FiestarioStoreContext);
  if (!context) {
    throw new Error("useFiestario must be used within a FiestarioStoreProvider");
  }
  return context;
}
