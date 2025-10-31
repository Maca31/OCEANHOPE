# 🗂️ Ocean Hope - Estructura Detallada del Proyecto

## 📊 Vista General por Categorías

### 🎨 **1. COMPONENTES DE UI (shadcn/ui + Radix)**
Ubicación: `/components/ui/`

Todos estos componentes están basados en **Radix UI** y estilizados con **TailwindCSS**:

#### Formularios e Inputs
```
components/ui/
├── button.tsx          ⭐ Botones con variantes
├── input.tsx           ⭐ Campos de texto
├── textarea.tsx        ⭐ Áreas de texto
├── checkbox.tsx        ⭐ Casillas de verificación
├── radio-group.tsx     ⭐ Grupos de radio
├── select.tsx          ⭐ Selectores dropdown
├── switch.tsx          ⭐ Interruptores on/off
├── slider.tsx          ⭐ Controles deslizantes
├── input-otp.tsx       ⭐ Inputs de OTP
├── calendar.tsx        ⭐ Selector de fechas
├── form.tsx            ⭐ Sistema de formularios
└── label.tsx           ⭐ Etiquetas para inputs
```

#### Navegación
```
components/ui/
├── navigation-menu.tsx  🧭 Menús de navegación
├── breadcrumb.tsx       🧭 Migas de pan
├── menubar.tsx          🧭 Barra de menú
├── tabs.tsx             🧭 Pestañas
├── pagination.tsx       🧭 Paginación
└── command.tsx          🧭 Paleta de comandos
```

#### Feedback & Overlays
```
components/ui/
├── alert.tsx            💬 Alertas de notificación
├── alert-dialog.tsx     💬 Diálogos modales
├── dialog.tsx           💬 Ventanas modales
├── drawer.tsx           💬 Paneles deslizantes
├── sheet.tsx            💬 Paneles laterales
├── sonner.tsx           💬 Toast notifications
├── tooltip.tsx          💬 Tooltips informativos
├── hover-card.tsx       💬 Tarjetas emergentes
├── popover.tsx          💬 Popovers
├── dropdown-menu.tsx    💬 Menús desplegables
└── context-menu.tsx     💬 Menús contextuales
```

#### Layout & Display
```
components/ui/
├── card.tsx             📦 Tarjetas de contenido
├── separator.tsx        📦 Separadores
├── aspect-ratio.tsx     📦 Ratios de aspecto
├── scroll-area.tsx      📦 Áreas de scroll
├── resizable.tsx        📦 Paneles redimensionables
├── table.tsx            📦 Tablas responsivas
├── accordion.tsx        📦 Contenido colapsable
├── collapsible.tsx      📦 Paneles expandibles
├── carousel.tsx         📦 Carruseles
└── sidebar.tsx          📦 Barra lateral
```

#### Estado & Progreso
```
components/ui/
├── progress.tsx         ⏳ Barras de progreso
├── skeleton.tsx         ⏳ Placeholders de carga
├── avatar.tsx           ⏳ Avatares con fallback
├── badge.tsx            ⏳ Insignias
├── toggle.tsx           ⏳ Botones de alternancia
├── toggle-group.tsx     ⏳ Grupos de toggles
└── chart.tsx            ⏳ Gráficos (Recharts)
```

#### Utilidades
```
components/ui/
├── utils.ts             🔧 Funciones helper
└── use-mobile.ts        🔧 Hook para detectar mobile
```

**Total: 47 componentes UI de shadcn/ui (Radix-based)**

---

### 🌊 **2. COMPONENTES OCEÁNICOS PERSONALIZADOS**
Ubicación: `/components/`

#### Efectos Visuales Oceánicos
```
components/
├── OceanDivingBackground.tsx    🌊 Efecto de inmersión gradual
├── OceanWaves.tsx               🌊 Animación de olas realistas
├── WaveAnimation.tsx            🌊 Ondas animadas
├── FloatingElements.tsx         🌊 Burbujas y peces flotantes
├── ParticleField.tsx            🌊 Campo de partículas marinas
├── Ocean3D.tsx                  🌊 Escena 3D con Three.js
└── OceanFloor.tsx              🌊 Fondo del océano
```

#### Componentes de Sección
```
components/
├── HeroSection.tsx              📄 Hero principal con animaciones
├── StorySection.tsx             📄 Sección "Nuestra Historia"
├── ImpactSection.tsx            📄 Sección "Impacto Global"
├── ActionSection.tsx            📄 Sección "Toma Acción"
└── UnderwaterSection.tsx        📄 Wrapper con efectos de profundidad
```

#### Módulos Interactivos
```
components/
├── InteractiveOceanMap.tsx      🗺️ Mapa oceánico clickeable
├── InteractiveActionCards.tsx   🗺️ Tarjetas de acción interactivas
├── OceanDepthExplorer.tsx       🗺️ Explorador de profundidades
├── OceanFactsReveal.tsx         🗺️ Revelación de datos oceánicos
├── MarineLifeGallery.tsx        🗺️ Galería de vida marina
├── ParallaxTestimonials.tsx     🗺️ Testimonios con parallax
├── ScrollRevealTimeline.tsx     🗺️ Línea de tiempo animada
└── OceanStatsCounter.tsx        🗺️ Contador de estadísticas
```

#### Core & Navegación
```
components/
├── Header.tsx                   🎯 Navbar con navegación suave
├── Footer.tsx                   🎯 Pie de página
├── ThemeProvider.tsx            🎯 Proveedor de tema oscuro/claro
└── LoadingScreen.tsx           🎯 Pantalla de carga inicial
```

#### Efectos de Interacción
```
components/
├── MagneticCursor.tsx           ✨ Cursor oceánico con burbujas
├── ScrollProgress.tsx           ✨ Barra de progreso de scroll
├── ScrollToTop.tsx              ✨ Botón scroll to top
└── SmoothScroll.tsx            ✨ Scroll suave con Lenis
```

#### Componentes Especiales
```
components/figma/
└── ImageWithFallback.tsx        🖼️ Imagen con fallback automático
```

**Total: 28 componentes personalizados**

---

### 📱 **3. ESTRUCTURA DE LA APLICACIÓN**
Ubicación: Raíz del proyecto

```
📱 APLICACIÓN PRINCIPAL
├── App.tsx                      # Componente raíz con todas las secciones
├── index.html                   # HTML principal
└── src/
    └── main.tsx                 # Punto de entrada React
```

---

### 🎨 **4. ESTILOS Y DISEÑO**
Ubicación: `/styles/`

```
🎨 SISTEMA DE DISEÑO
└── styles/
    └── globals.css
        ├── 🎨 Variables CSS (Temas claro/oscuro)
        ├── 🎨 Tokens de color
        ├── 📝 Tipografía (Playfair Display + Inter)
        ├── ✨ Cursor personalizado
        ├── 📜 Scrollbar oceánico
        ├── 🎯 Estados de focus
        └── ♿ Accesibilidad (prefers-reduced-motion)
```

**Tipografías**:
- **Playfair Display** (Serif) - Títulos y elementos destacados
- **Inter** (Sans-serif) - Contenido general y UI

---

### 📚 **5. DOCUMENTACIÓN**
Ubicación: `/docs/` y raíz

```
📚 DOCUMENTACIÓN ORGANIZADA
├── docs/
│   ├── README.md                    # Índice de documentación
│   ├── TECH_STACK.md               # Stack tecnológico completo
│   └── PROJECT_STRUCTURE.md        # Este archivo
│
├── ARCHITECTURE.md                  # Arquitectura del proyecto
├── COMPONENT_REFERENCE.md           # Referencia de componentes
├── INTEGRATION.md                   # Guía de integración
│
├── FEATURES.md                      # Características principales
├── NEW_FEATURES.md                  # Nuevas características
├── OCEAN_ENHANCEMENTS.md            # Mejoras oceánicas
├── THEME_OCEAN_EFFECTS.md           # Sistema de temas
│
├── IMPLEMENTATION_SUMMARY.md        # Resumen de implementación
├── OCEAN_DIVING_UPDATE.md           # Update de inmersión
├── QUICK_REFERENCE.md               # Referencia rápida
│
├── DEPLOYMENT.md                    # Guía de despliegue
├── Attributions.md                  # Créditos y atribuciones
└── README.md                        # README principal
```

---

### 📖 **6. GUÍAS Y MEJORES PRÁCTICAS**
Ubicación: `/guidelines/`

```
📖 GUÍAS
└── guidelines/
    └── Guidelines.md                # Guías del proyecto
```

---

## 🔧 Stack Tecnológico por Capa

### Frontend Core
```
React 18              # Biblioteca UI principal
TypeScript            # Tipado estático
Next.js               # Framework React
```

### Styling & Design
```
TailwindCSS v4.0      # Framework CSS
CSS Variables         # Temas dinámicos
Google Fonts          # Playfair Display + Inter
```

### UI Components
```
shadcn/ui             # Componentes pre-construidos
Radix UI              # Primitivos sin estilos (base de shadcn)
Lucide React          # Sistema de iconos
```

### Animation & 3D
```
Motion/React          # Framer Motion - Animaciones declarativas
GSAP                  # Animaciones cinematográficas
Three.js              # Gráficos 3D
@react-three/fiber    # React renderer para Three.js
@react-three/drei     # Helpers para Three.js
```

### Utilities
```
Lenis                 # Scroll suave
Recharts              # Gráficos (usado por Chart component)
Sonner                # Toast notifications
```

---

## 📊 Resumen Numérico

| Categoría | Cantidad |
|-----------|----------|
| **Componentes UI (shadcn/Radix)** | 47 |
| **Componentes Personalizados** | 28 |
| **Archivos de Documentación** | 15+ |
| **Tecnologías Core** | 12+ |
| **Dependencias Radix UI** | 30+ |

---

## 🎯 Características Clave por Componente

### 🌊 Efectos Oceánicos
- **OceanDivingBackground**: Profundidad gradual, color adaptativo al tema
- **FloatingElements**: Burbujas ascendentes, peces nadando
- **OceanWaves**: Gradientes animados, movimiento fluido
- **MagneticCursor**: Efecto magnético, burbujas de rastro

### ✨ Interactividad
- **Header**: Navegación suave, z-index optimizado
- **ScrollProgress**: Barra de progreso visual
- **ScrollRevealTimeline**: Revelación progresiva
- **InteractiveOceanMap**: Mapa clickeable con tooltips

### 🎨 Temas
- **ThemeProvider**: Persistencia en localStorage
- **Adaptación automática**: Todos los efectos oceánicos se adaptan al tema
- **Colores océano**: Cian/azul para claro, azul profundo para oscuro

---

## 🚀 Flujo de Navegación

```
App.tsx (Root)
    ├── ThemeProvider
    │   └── Proporciona tema a toda la app
    │
    ├── LoadingScreen
    │   └── Pantalla inicial con animación
    │
    ├── Header (z-100)
    │   └── Navbar fijo con navegación suave
    │
    ├── ScrollProgress
    │   └── Barra de progreso en top
    │
    ├── MagneticCursor (z-9999)
    │   └── Cursor personalizado siempre visible
    │
    ├── OceanDivingBackground
    │   └── Efecto de inmersión en toda la página
    │
    ├── Main Content
    │   ├── HeroSection
    │   ├── UnderwaterSection (shallow)
    │   │   └── StorySection
    │   ├── UnderwaterSection (medium)
    │   │   ├── ImpactSection
    │   │   └── ScrollRevealTimeline
    │   └── UnderwaterSection (deep)
    │       ├── ActionSection
    │       └── OceanFloor
    │
    ├── Footer
    │   └── Información y links
    │
    └── ScrollToTop
        └── Botón flotante para volver arriba
```

---

## 🎨 Sistema de Z-Index Optimizado

```
z-[9999]  → MagneticCursor (cursor siempre visible)
z-[100]   → Header (navbar siempre clickeable)
z-50      → ScrollToTop
z-40      → ScrollProgress
z-10      → Main content
z-0       → OceanDivingBackground
z-[-1]    → Efectos de fondo profundos
```

---

**Última actualización**: 31 de Octubre, 2025  
**Estado**: ✅ Producción Ready  
**Página sin cambios funcionales**: ✅ Confirmado
