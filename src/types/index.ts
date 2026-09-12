// ============================================================
// FIESTARIO - Master Domain Type Definitions
// ============================================================

export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export type EventType =
  | "Boda"
  | "XV Años"
  | "Cumpleaños"
  | "Baby Shower"
  | "Bautizo"
  | "Graduación"
  | "Aniversario"
  | "Despedida"
  | "Gender Reveal"
  | "Fiesta Infantil"
  | "Corporativo"
  | "Lanzamiento"
  | "Cena Privada"
  | "Reunión";

export type EventStyle =
  | "Elegante"
  | "Minimalista"
  | "Boho Chic"
  | "Mexicano Contemporáneo"
  | "Tropical"
  | "Moderno"
  | "Vintage"
  | "Lujo & Editorial"
  | "Infantil Temático"
  | "Rústico Campestre"
  | "Industrial Glam";

export type VendorStatus = "PENDING" | "UNDER_REVIEW" | "VERIFIED" | "SUSPENDED";

export interface Vendor {
  id: string;
  userId?: string;
  businessName: string;
  slug: string;
  tagline: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subcategories: string[];
  logo: string;
  coverImage: string;
  gallery: string[];
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  rating: number;
  reviewCount: number;
  ratingBreakdown?: {
    quality: number;
    service: number;
    value: number;
    punctuality: number;
  };
  verified: boolean;
  yearsExperience: number;
  responseTime: string; // e.g. "< 2 horas"
  serviceRadius: string; // e.g. "Monterrey y área metropolitana"
  startingPrice: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  address: string;
  city: string;
  state: string;
  zone?: string;
  coordinates?: { lat: number; lng: number };
  badges: string[];
  styles: EventStyle[];
  eventTypes: EventType[];
  featured: boolean;
  status: VendorStatus;
  faqs?: { question: string; answer: string }[];
  createdAt: string;
}

export type PricingType = "FIXED" | "STARTING_AT" | "PER_PERSON" | "PER_HOUR";

export interface Service {
  id: string;
  vendorId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  priceFrom: number;
  priceTo?: number;
  pricingType: PricingType;
  duration?: string;
  capacityMin?: number;
  capacityMax?: number;
  inclusions: string[];
  exclusions?: string[];
  image: string;
  active: boolean;
}

export interface Package {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorSlug: string;
  vendorAvatar: string;
  vendorCity: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  guestCount: number;
  inclusions: string[];
  image: string;
  popular?: boolean;
  featured?: boolean;
  eventType: EventType;
}

export type QuoteStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "NEGOTIATING"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | "CANCELLED";

export interface QuoteItem {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  eventId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  vendorId: string;
  vendorName: string;
  vendorAvatar: string;
  serviceId?: string;
  serviceName?: string;
  status: QuoteStatus;
  eventDate: string;
  guestCount: number;
  location: string;
  budget?: number;
  customerNotes: string;
  vendorNotes?: string;
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  validUntil: string;
  responseTime?: string;
  includedList?: string[];
  notIncludedList?: string[];
  createdAt: string;
}

export type ChecklistPhase =
  | "12_MONTHS"
  | "6_MONTHS"
  | "3_MONTHS"
  | "1_MONTH"
  | "2_WEEKS"
  | "EVENT_DAY";

export interface ChecklistTask {
  id: string;
  eventId: string;
  title: string;
  category: string;
  phase: ChecklistPhase;
  phaseLabel: string;
  completed: boolean;
  priority: "HIGH" | "MEDIUM" | "LOW";
  assignedVendorId?: string;
  assignedVendorName?: string;
  dueDate?: string;
}

export interface BudgetItem {
  id: string;
  eventId: string;
  category: string;
  name: string;
  estimated: number;
  actual: number;
  status: "PENDING" | "COMMITTED" | "PAID";
  vendorId?: string;
  vendorName?: string;
}

export interface EventPlan {
  id: string;
  customerId: string;
  name: string;
  type: EventType;
  date: string;
  city: string;
  zone?: string;
  guestCount: number;
  totalBudget: number;
  style: EventStyle;
  description?: string;
  status: "PLANNING" | "BOOKING" | "CONFIRMED" | "COMPLETED";
  tasks: ChecklistTask[];
  budgetItems: BudgetItem[];
  matchedVendorIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  quoteId?: string;
  attachmentUrl?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  vendorName: string;
  vendorAvatar: string;
  vendorSlug: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Review {
  id: string;
  vendorId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  qualityRating: number;
  serviceRating: number;
  valueRating: number;
  punctualityRating: number;
  comment: string;
  photos?: string[];
  verified: boolean;
  eventType: EventType;
  date: string;
  vendorReply?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  subcategories: string[];
  vendorCount: number;
  popular?: boolean;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  image: string;
  vendorCount: number;
  popularZones: string[];
}

export interface InspirationItem {
  id: string;
  title: string;
  eventType: EventType;
  style: EventStyle;
  image: string;
  vendorIds: string[];
  vendorNames: string[];
  city: string;
  tags: string[];
  likesCount: number;
}
