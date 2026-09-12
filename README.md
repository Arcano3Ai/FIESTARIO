# FIESTARIO
### *“Todo para celebrar. En un solo lugar.”*
**The Premium Event Marketplace for Mexico**

---

## 1. Visión General
FIESTARIO es un marketplace digital de alta gama diseñado específicamente para el mercado mexicano de eventos sociales y corporativos (bodas, XV años, cumpleaños boutique, baby showers, cenas privadas, lanzamientos y galas).

La plataforma trasciende el simple directorio tradicional para operar como un **sistema operativo del evento**: el usuario no busca servicios aislados, sino que estructura su celebración a partir del concepto:
$$\text{EVENTO} \longrightarrow \text{NECESIDADES} \longrightarrow \text{PROVEEDORES} \longrightarrow \text{COTIZACIONES} \longrightarrow \text{RESERVAS}$$

---

## 2. Identidad Visual y Principios de Diseño
- **Estilo**: *Luxury Editorial Marketplace*.
- **Paleta Cromática Canónica**:
  - **Negro Carbón**: `#111111`
  - **Blanco Cálido**: `#FAF9F6`
  - **Champagne**: `#E7D8BF`
  - **Arena**: `#D8C7AE`
  - **Dorado Sutil**: `#B89B5E` (usado exclusivamente como acento elegante)
  - **Gris Piedra**: `#77736C`
- **Tipografía**: Fuentes serif editoriales (Playfair Display) combinadas con sans-serif moderno y limpio (Plus Jakarta Sans).
- **Enfoque México**: Precios formateados en moneda nacional (`$XX,XXX MXN`), terminología auténtica (quintas, haciendas, salones, taquizas gourmet de trompo, parrilladas al carbón, mariachi de gala, grupos norteños, arcos orgánicos de globos, etc.) y cobertura inicial de ciudades clave (Monterrey, San Pedro Garza García, CDMX, Guadalajara, San Miguel de Allende, Querétaro, Cancún y Mérida).

---

## 3. Arquitectura del Código
El proyecto está construido con **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS** y una arquitectura desacoplada y escalable:

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                      # Homepage canónica de 14 secciones
│   │   ├── explorar/page.tsx             # Explorador con filtros avanzados y vista dual (Grid/Mapa)
│   │   ├── categorias/page.tsx           # Catálogo de 15 categorías esenciales
│   │   ├── categorias/[slug]/page.tsx    # Landing dinámica por categoría con SEO
│   │   ├── ciudades/[slug]/page.tsx      # Landing por ciudad con zonas populares
│   │   ├── inspiracion/page.tsx          # Muro estilo Pinterest con proveedores vinculados
│   │   ├── paquetes/page.tsx             # Paquetes llave en mano con precio cerrado
│   │   ├── comparar/page.tsx             # Matriz de comparación frente a frente de proveedores
│   │   ├── arma-tu-evento/page.tsx       # Wizard "Arma tu Evento" de 4 pasos
│   │   ├── ia-planner/page.tsx           # Planeador con IA & Fiestario Match Engine
│   │   ├── publicar-negocio/page.tsx     # Wizard de onboarding para nuevos negocios
│   │   └── planes/page.tsx               # Planes de suscripción (Básico, Pro, Elite)
│   ├── proveedores/[slug]/page.tsx       # Perfil editorial de proveedor con galería y tabs
│   ├── dashboard/
│   │   ├── page.tsx                      # "My Fiestario": Presupuesto, Checklist y Cotizaciones
│   │   ├── cotizaciones/page.tsx         # Gestión y aprobación de cotizaciones formales
│   │   ├── favoritos/page.tsx            # Colección personal de proveedores guardados
│   │   └── mensajes/page.tsx             # Chat en tiempo real simulado cliente ↔ proveedor
│   ├── vendor/page.tsx                   # Portal del Proveedor: KPIs, leads y disponibilidad
│   ├── admin/page.tsx                    # Panel de administración, auditoría y verificación
│   ├── layout.tsx                        # Layout maestro con fuentes y Store reactivo
│   └── globals.css                       # Tokens de diseño y scrollbars refinados
├── components/
│   ├── ui/                               # Primitivas de diseño (Button, Badge, Modal, RatingStars)
│   ├── layout/                           # Header con role switcher, Footer y MobileNav
│   └── shared/                           # VendorCard, QuoteModal, SearchOmnibox
├── features/
│   └── ai-planner/                       # Motor de matching algorítmico y cálculo de presupuestos
├── data/                                 # Semilla mexicana realista (30+ proveedores, categorías, reviews)
├── types/                                # Definición estricta de interfaces TypeScript
└── lib/                                  # Store reactivo con sincronización y helpers de formateo
```

---

## 4. Características Principales Implementadas

### A) Selector de Rol en Vivo (Demo Mode)
En el header de la aplicación se incluye un conmutador rápido para alternar entre las tres perspectivas del producto sin necesidad de reautenticación:
1. **👤 Cliente (`Valeria Morales`)**: Puede armar eventos, controlar presupuestos, solicitar cotizaciones, comparar proveedores y chatear.
2. **🏪 Proveedor (`Quinta Monte Real`)**: Acceso a su portal con métricas de conversión, cotizaciones entrantes y control de fechas en calendario.
3. **🛡️ Administrador**: Acceso a auditoría en tiempo real, KPIs de la plataforma y cola de verificación de proveedores para otorgar o revocar el badge **✓ Proveedor Verificado**.

### B) Homepage Canónica de 14 Secciones
1. Hero cinematográfico con propuesta de valor.
2. Buscador omnibox multifactorial (¿Qué?, ¿Dónde?, ¿Cuándo?, Invitados).
3. Categorías populares con fotografía y conteo.
4. "Los favoritos de FIESTARIO" (proveedores destacados).
5. Exploración por tipo de celebración (Bodas, Cumpleaños, XV Años, etc.).
6. Muro de inspiración fotográfica.
7. Paquetes llave en mano ("Hazlo fácil").
8. Banner interactivo "Arma tu evento".
9. Proveedores cercanos geolocalizados por ciudad.
10. Cómo funciona (01 Explora, 02 Compara, 03 Cotiza, 04 Celebra).
11. Testimonios verificados con desglose de estrellas.
12. CTA para captación de proveedores.
13. Newsletter editorial.
14. Footer institucional completo.

### C) "Arma tu Evento" & Planeador IA
- Entrada estructurada por pasos (Tipo, Fecha, Ciudad, Invitados, Presupuesto, Estilo y Necesidades).
- Generación instantánea de cronograma por fases temporales (12 meses, 6 meses, 3 meses, día del evento).
- Desglose financiero ponderado por partidas de gasto.
- Cálculo de compatibilidad (**Fiestario Match %**) con explicaciones transparentes de por qué un proveedor es el ideal.

### D) Cotizaciones, Comparador y Mensajería
- Solicitud de cotización formal con número de invitados, presupuesto y notas de inspiración.
- Tabla comparativa de hasta 3 opciones frente a frente.
- Chat interno cliente-proveedor con hilos de conversación y estados de propuesta.

---

## 5. Instalación y Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en puerto 3005
npm run dev

# 3. Compilar para producción
npm run build
```

Acceder a `http://localhost:3005` en el navegador.

---

## 6. Variables de Entorno (`.env.example`)
La arquitectura está desacoplada y lista para conectarse con PostgreSQL/Prisma, Stripe México, OpenAI y Resend cuando se requiera persistencia en la nube:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/fiestario?schema=public"
AUTH_SECRET="your-super-secret-key"
STRIPE_SECRET_KEY="sk_test_..."
AI_API_KEY="sk-..."
```

---
© FIESTARIO Technologies · *Todo para celebrar. En un solo lugar.*
