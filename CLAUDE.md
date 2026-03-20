# CLAUDE.md — Design Vault: Galería Curada de Diseño Web Open Source

## Identidad del Proyecto
**Nombre**: Design Vault  
**Propósito**: App-galería interactiva que reúne, documenta y permite explorar las mejores landing pages, dashboards, portfolios y experiencias 3D open source del mundo. Funciona como biblioteca de referencia visual Y como playground para replicar componentes.  
**Propietario**: MD Consultoría SC (Marx Chávez)  
**Ruta local Mac Mini**: `~/Projects/design-vault/`  
**Ruta local iMac**: `~/Projects/design-vault/`

---

## Stack Tecnológico

```
Framework:      Next.js 15 (App Router)
React:          19
Estilos:        Tailwind CSS 4 + CSS Modules para efectos custom
UI Base:        shadcn/ui (tema dark por defecto, toggle light)
Animaciones:    Framer Motion (motion) + GSAP (scroll effects)
3D:             React Three Fiber + drei + Three.js r170+
Scroll:         Lenis (smooth scroll global)
Tipografía:     Satoshi (body) + General Sans (headings) + JetBrains Mono (code)
Iconos:         Lucide React
Estado:         Zustand (mínimo, solo para filtros y favoritos)
MDX:            next-mdx-remote (documentación inline)
Monorepo:       No — single package
Package Mgr:    pnpm
```

---

## Arquitectura de la App

### Concepto Visual
La app es un **museo digital de diseño web**. Estética: dark mode primario con acentos de color por categoría. Layout tipo **Bento grid** para la galería principal. Cada tarjeta de proyecto tiene preview animado al hover (video/gif o iframe sandbox).

### Estructura de Rutas (App Router)

```
/                           → Home: hero + galería filtrable con bento grid
/categoria/[slug]           → Vista de categoría (landing-pages, dashboards, etc.)
/proyecto/[id]              → Detalle: demo embebida, código, screenshots, docs
/playground                 → Sandbox: componentes extraídos listos para copiar
/playground/[component-id]  → Componente individual con live preview + código
/acerca                     → Sobre el proyecto, metodología, créditos
```

### Modelo de Datos

Cada proyecto se define en `src/data/catalog.ts` como:

```typescript
interface DesignProject {
  id: string;                          // kebab-case único
  name: string;                        // Nombre display
  description: string;                 // 1-2 oraciones
  category: Category;                  // enum
  subcategory?: string;                // para filtrado fino
  repo: string;                        // URL GitHub
  demo?: string;                       // URL demo live
  screenshot: string;                  // /screenshots/{id}.webp
  stars: number;                       // GitHub stars (snapshot)
  stack: string[];                     // ["React", "Three.js", "GSAP"]
  designElements: DesignElement[];     // enum[]
  difficulty: 'principiante' | 'intermedia' | 'avanzada';
  highlights: string[];                // Lo que lo hace excepcional
  extractableComponents: Component[];  // Componentes que se pueden copiar
  figma?: string;                      // URL Figma si existe
  tutorial?: string;                   // URL tutorial si existe
  license: string;                     // MIT, Apache, etc.
  addedDate: string;                   // ISO date
}

type Category = 
  | 'component-libraries'
  | 'landing-pages'
  | 'dashboards'
  | 'portfolios'
  | '3d-webgl'
  | 'animation-libs'
  | 'products';

type DesignElement =
  | 'animations'        // GSAP, Framer Motion, CSS
  | 'scroll-driven'     // ScrollTrigger, parallax
  | 'bento-grid'        // Bento layouts
  | 'typography'        // Tipografía creativa
  | 'color-palette'     // Paletas innovadoras
  | '3d-webgl'          // Three.js, R3F, shaders
  | 'micro-interactions'// Hover, click, cursor effects
  | 'page-transitions'  // Barba.js, AnimatePresence
  | 'dark-mode'         // Implementación dark/light
  | 'responsive'        // Mobile-first excepcional
  | 'accessibility';    // a11y notable

interface Component {
  id: string;
  name: string;
  description: string;
  sourceFile: string;    // ruta relativa en el repo original
  previewRoute: string;  // /playground/{component-id}
  dependencies: string[];
}
```

---

## Catálogo Completo de Proyectos (50 repos)

### CAT-01: Librerías de Componentes Animados

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `shadcn-ui` | shadcn/ui | `shadcn-ui/ui` | 94,000 | React, Radix, Tailwind | Principiante |
| `magic-ui` | Magic UI | `magicuidesign/magicui` | 20,400 | React, Next.js, Tailwind, Motion | Intermedia |
| `aceternity-ui` | Aceternity UI | `aceternity-ui` (ui.aceternity.com) | 3,300 | React, Next.js, Tailwind, Motion, WebGL | Avanzada |
| `motion-primitives` | Motion Primitives | `ibelick/motion-primitives` | 5,400 | React, Tailwind, Motion | Intermedia |
| `cult-ui` | Cult UI | `nolly-studio/cult-ui` | 3,000 | React, Next.js, Tailwind, shadcn | Intermedia |
| `launch-ui` | Launch UI | `launch-ui/launch-ui` | Creciendo | React, shadcn, Tailwind | Principiante |

### CAT-02: Landing Pages y Marketing Sites

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `iphone-15-clone` | Apple iPhone 15 Pro Clone | `adrianhajdin/iphone` | 7,000 | React, Three.js, R3F, GSAP, Tailwind | Avanzada |
| `zentry-awwwards` | Zentry Awwwards Clone | `adrianhajdin/award-winning-website` | — | React, GSAP, Tailwind | Avanzada |
| `gsap-macbook` | GSAP MacBook Landing | `adrianhajdin/gsap_macbook_landing` | — | React, Three.js, GSAP, Zustand | Avanzada |
| `gsap-cocktails` | GSAP Cocktails | `adrianhajdin/gsap_cocktails` | 500 | React, GSAP, Tailwind | Intermedia |
| `cruip-open-react` | Cruip Open React | `cruip/open-react-template` | 4,600 | React, Next.js, Tailwind v4 | Principiante |
| `astrowind` | AstroWind | `onwidget/astrowind` | 5,500 | Astro 5, Tailwind | Principiante |
| `saas-boilerplate` | SaaS Boilerplate | `ixartz/SaaS-Boilerplate` | 6,900 | Next.js, Tailwind, Shadcn, Drizzle | Intermedia |
| `page-ui-shipixen` | Page UI / Shipixen | `danmindru/page-ui` | — | React, Next.js, Tailwind, Shadcn | Principiante |
| `awesome-landing-pages` | Awesome Landing Pages | `PaulleDemon/awesome-landing-pages` | 919 | HTML, CSS, Tailwind | Principiante |

### CAT-03: Dashboards y Admin Panels

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `grafana` | Grafana | `grafana/grafana` | 66,000 | Go, React, TypeScript | Avanzada |
| `metabase` | Metabase | `metabase/metabase` | 40,000 | Clojure, React, TypeScript | Intermedia |
| `apache-superset` | Apache Superset | `apache/superset` | 65,000 | Python/Flask, React | Avanzada |
| `tremor` | Tremor | `tremorlabs/tremor` | 16,000 | React, Tailwind, Recharts | Principiante |
| `tabler` | Tabler | `tabler/tabler` | 38,000 | Bootstrap 5, HTML | Principiante |
| `shadcn-admin` | shadcn-admin | `satnaing/shadcn-admin` | 11,000 | Next.js, Shadcn, Tailwind | Intermedia |
| `ngx-admin` | ngx-admin | `akveo/ngx-admin` | 25,900 | Angular, Nebular UI | Intermedia |
| `horizon-ui` | Horizon UI | `horizon-ui/horizon-tailwind-react` | 5,200 | React, Tailwind, Chakra UI | Principiante |
| `next-shadcn-dashboard` | Next.js Dashboard Starter | `Kiranism/next-shadcn-dashboard-starter` | 5,800 | Next.js 16, React 19, Shadcn | Intermedia |
| `flowbite-admin` | Flowbite Admin Dashboard | `themesberg/flowbite-admin-dashboard` | 8,800 | Tailwind, Flowbite | Principiante |

### CAT-04: Portfolios y Sitios Creativos

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `brittany-chiang-v4` | Brittany Chiang v4 | `bchiang7/v4` | 8,200 | Gatsby, React, Styled Components | Principiante |
| `simplefolio` | Simplefolio | `cobiwave/simplefolio` | 14,100 | HTML5, SCSS, Bootstrap 5 | Principiante |
| `leerob-site` | Lee Robinson's Site | `leerob/next-mdx-blog` | 7,600 | Next.js, MDX, Tailwind | Intermedia |
| `bruno-simon-folio` | Bruno Simon Folio 2019 | `brunosimon/folio-2019` | 4,700 | Three.js, Cannon.js | Avanzada |
| `macos-portfolio` | macOS Simulator Portfolio | `Renovamen/playground-macos` | 3,400 | React, Zustand, UnoCSS | Avanzada |
| `craftzdog-homepage` | Craftzdog Homepage | `craftzdog/craftzdog-homepage` | 3,000 | Next.js, Chakra UI, Three.js, Motion | Intermedia |
| `hamishmw-portfolio` | HamishMW Portfolio | `HamishMW/portfolio` | 4,000 | Remix, Three.js, Motion | Avanzada |
| `bruno-room-3d` | Bruno Simon Room in 3D | `brunosimon/my-room-in-3d` | 4,400 | Three.js, Blender | Intermedia |
| `magic-ui-portfolio` | Magic UI Portfolio | `dillionverma/portfolio` | 1,200 | Next.js 14, Shadcn, Magic UI | Principiante |
| `nim-template` | Nim Template | `ibelick/nim` | — | Next.js 15, React 19, Tailwind v4 | Intermedia |
| `retro-computer` | Retro Computer Portfolio | `edhinrichsen/retro-computer-website` | — | Three.js, Vanilla JS | Avanzada |
| `portfolio-ideas` | Portfolio Ideas (curación) | `Evavic44/portfolio-ideas` | 5,900 | Colección curada | — |

### CAT-05: Experiencias 3D y WebGL

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `react-three-fiber` | React Three Fiber | `pmndrs/react-three-fiber` | 28,000 | React, Three.js | Intermedia |
| `theatre-js` | Theatre.js | `theatre-js/theatre` | 12,200 | Three.js, React | Avanzada |
| `infinite-world` | Bruno Simon Infinite World | `brunosimon/infinite-world` | 568 | WebGPU, Three.js TSL | Avanzada |
| `wawa-vfx` | WawaVFX | `wass08/wawa-vfx` | — | React Three Fiber | Intermedia |
| `radiant-shaders` | Radiant Shader Art | `pbakaus/radiant` | — | HTML, GLSL, standalone | Intermedia |
| `book-of-shaders` | The Book of Shaders | `patriciogonzalezvivo/thebookofshaders` | 6,200 | GLSL, HTML | Intermedia |

### CAT-06: Librerías de Animación y Scroll

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `gsap` | GSAP | `greensock/GSAP` | 20,000 | Vanilla JS | Intermedia |
| `motion-framer` | Motion (Framer Motion) | `motiondivision/motion` | 26,000 | React, Vanilla JS | Principiante |
| `anime-js` | Anime.js | `juliangarnier/anime` | 50,000 | Vanilla JS | Principiante |
| `lenis` | Lenis | `darkroomengineering/lenis` | 9,000 | Vanilla JS | Principiante |
| `locomotive-scroll` | Locomotive Scroll v5 | `locomotivemtl/locomotive-scroll` | 8,000 | Vanilla JS, Lenis | Intermedia |
| `barba-js` | Barba.js | `barbajs/barba` | 11,000 | Vanilla JS | Intermedia |
| `aos` | AOS | `michalsnik/aos` | 26,000 | Vanilla JS | Principiante |

### CAT-07: Productos Open Source con Diseño Comercial

| ID | Nombre | Repo | ⭐ | Stack | Dificultad |
|---|---|---|---|---|---|
| `cal-com` | cal.com | `calcom/cal.com` | 35,000 | Next.js, Prisma, Tailwind | Avanzada |
| `dub-co` | Dub.co | `dubinc/dub` | 20,000 | Next.js, Tailwind, Prisma | Avanzada |
| `payload-cms` | Payload CMS | `payloadcms/payload` | 30,000 | TypeScript, React, Node.js | Avanzada |
| `penpot` | Penpot | `penpot/penpot` | 35,000 | Clojure, SVG | Avanzada |

---

## Implementación: Fases de Desarrollo

### Fase 1: Scaffold y Core (Sprint 1 — 1 semana)

1. **Inicializar proyecto**
   ```bash
   pnpm create next-app@latest design-vault --typescript --tailwind --eslint --app --src-dir
   cd design-vault
   pnpm dlx shadcn@latest init
   ```

2. **Instalar dependencias core**
   ```bash
   pnpm add motion gsap @gsap/react lenis @studio-freight/lenis zustand
   pnpm add @react-three/fiber @react-three/drei three
   pnpm add next-mdx-remote gray-matter
   pnpm add lucide-react
   pnpm add -D @types/three
   ```

3. **Configurar tipografía**
   - Descargar Satoshi, General Sans de fontshare.com
   - JetBrains Mono de Google Fonts
   - Configurar en `layout.tsx` con `next/font/local`

4. **Implementar sistema de temas**
   - Dark mode por defecto (fondo: `#09090b`)
   - Colores por categoría:
     - Component Libraries: `#2563eb` (blue-600)
     - Landing Pages: `#7c3aed` (violet-600)
     - Dashboards: `#059669` (emerald-600)
     - Portfolios: `#d97706` (amber-600)
     - 3D/WebGL: `#dc2626` (red-600)
     - Animation: `#0891b2` (cyan-600)
     - Products: `#4f46e5` (indigo-600)

5. **Layout principal**
   - Navbar sticky con blur backdrop
   - Sidebar de categorías (collapsible en mobile)
   - Footer con stats del catálogo
   - Smooth scroll con Lenis global

6. **Catálogo de datos** (`src/data/catalog.ts`)
   - Poblar los 50 proyectos con toda la metadata
   - Funciones helper: `getByCategory()`, `getById()`, `search()`, `filterByElement()`

### Fase 2: Galería y Navegación (Sprint 2 — 1 semana)

7. **Home page** (`/`)
   - Hero section con título animado (GSAP SplitText o Motion TextEffect)
   - Stats globales: "50 proyectos · 7 categorías · 500K+ ⭐ combinadas"
   - Bento grid de proyectos destacados (top 12)
   - Filtros por: categoría, dificultad, design element, stack
   - Búsqueda fuzzy en tiempo real

8. **Tarjeta de proyecto** (`ProjectCard`)
   - Thumbnail con aspect ratio 16:9
   - Hover: video preview o screenshot zoom con overlay de info
   - Badges: categoría (color), dificultad, stack tags
   - Star count con icono
   - Quick actions: ver demo, ver repo, copiar componentes

9. **Vista de categoría** (`/categoria/[slug]`)
   - Header con descripción de la categoría
   - Grid de proyectos filtrados
   - Sub-filtros específicos por categoría

10. **Vista de detalle** (`/proyecto/[id]`)
    - Hero: screenshot grande o iframe de demo
    - Sidebar: metadata (stars, stack, links)
    - Sección "¿Por qué es excepcional?" con highlights
    - Sección "Componentes extraíbles" con links al playground
    - Sección "Cómo replicar" con instrucciones paso a paso
    - Galería de screenshots adicionales

### Fase 3: Playground de Componentes (Sprint 3 — 1 semana)

11. **Playground principal** (`/playground`)
    - Grid de componentes extraídos organizados por tipo:
      - Hero Sections, Feature Grids, Testimonial Blocks
      - Buttons, Cards, Navbars, Footers
      - Animations, Scroll Effects, 3D Elements
    - Toggle código/preview para cada uno
    - Botón "Copiar código" con syntax highlighting

12. **Componente individual** (`/playground/[component-id]`)
    - Live preview con sandbox aislado
    - Code tabs: Component, Usage, Dependencies
    - Props documentation
    - Variantes (si aplica)
    - "Usado en:" links a proyectos del catálogo

### Fase 4: Screenshots y Media (Sprint 4 — 1 semana)

13. **Pipeline de screenshots**
    - Script con Playwright para capturar screenshots de cada demo URL
    - Guardar en `public/screenshots/{id}.webp` (optimizado)
    - Capturar tanto desktop (1440px) como mobile (390px)
    - Para demos con animación: capturar video corto (5-10s) como `.webm`

14. **Lazy loading y optimización**
    - Next.js Image con blur placeholder
    - Intersection Observer para cargar iframes solo cuando visibles
    - Prefetch de categoría siguiente en scroll

### Fase 5: Pulido y Efectos (Sprint 5 — 1 semana)

15. **Efectos globales**
    - Page transitions con AnimatePresence
    - Cursor personalizado que cambia por categoría
    - Scroll progress indicator en navbar
    - Easter egg: secuencia Konami muestra stats avanzadas

16. **Responsive**
    - Mobile: stack vertical, cards compactas
    - Tablet: 2 columnas
    - Desktop: bento grid dinámico 3-4 columnas
    - Ultra-wide: 5 columnas con más espacio

17. **SEO y Meta**
    - Metadata dinámica por página
    - Open Graph images generadas
    - Sitemap automático

---

## Convenciones de Código

### Estructura de archivos
```
src/
├── app/
│   ├── layout.tsx              # Root layout con Lenis + ThemeProvider
│   ├── page.tsx                # Home con hero + galería
│   ├── categoria/
│   │   └── [slug]/
│   │       └── page.tsx        # Vista por categoría
│   ├── proyecto/
│   │   └── [id]/
│   │       └── page.tsx        # Detalle de proyecto
│   ├── playground/
│   │   ├── page.tsx            # Índice de componentes
│   │   └── [componentId]/
│   │       └── page.tsx        # Componente individual
│   └── acerca/
│       └── page.tsx
├── components/
│   ├── ui/                     # shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── showcase/
│   │   ├── ProjectCard.tsx     # Tarjeta de proyecto
│   │   ├── BentoGrid.tsx       # Layout bento grid
│   │   ├── CategoryHeader.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SearchInput.tsx
│   │   ├── ProjectDetail.tsx
│   │   └── DemoEmbed.tsx       # Iframe sandbox
│   └── effects/
│       ├── SplitTextReveal.tsx # GSAP text animation
│       ├── ScrollProgress.tsx
│       ├── ParallaxImage.tsx
│       └── GlowingBorder.tsx
├── data/
│   └── catalog.ts              # Los 50 proyectos
├── lib/
│   ├── utils.ts                # shadcn cn() + helpers
│   ├── search.ts               # Fuzzy search
│   └── gsap-config.ts          # GSAP plugin registration
├── hooks/
│   ├── useGsap.ts
│   ├── useLenis.ts
│   └── useFilter.ts
└── styles/
    └── globals.css             # Tailwind + custom CSS variables
```

### Naming conventions
- Components: PascalCase (`ProjectCard.tsx`)
- Hooks: camelCase con prefijo `use` (`useFilter.ts`)
- Utils: camelCase (`formatStars.ts`)
- Data: camelCase (`catalog.ts`)
- CSS: kebab-case (`globals.css`)

### Reglas de calidad
- TypeScript strict mode
- ESLint + Prettier
- Todos los componentes con JSDoc mínimo
- Imágenes: WebP, max 200KB, con blur placeholder
- Performance target: Lighthouse 90+ en todas las métricas
- Accesibilidad: WCAG AA mínimo

---

## Notas para Claude Code

1. **Empieza por los datos**: `catalog.ts` es la fuente de verdad. Poblar primero con los 50 repos.
2. **La galería es el producto**: La home page con bento grid, filtros y hover previews es lo más importante.
3. **No clones todo**: No estamos clonando 50 repos — estamos **documentando y referenciando** con screenshots, demos embebidas y código extraído de los componentes más interesantes.
4. **Screenshots**: Usa Playwright para capturar. Si la demo no está disponible, usa placeholder.
5. **Playground**: Prioriza componentes de Magic UI, Aceternity y Motion Primitives — son los más replicables.
6. **GSAP es free ahora**: Usar sin restricciones, incluyendo ScrollTrigger y SplitText.
7. **Diseño propio excepcional**: Esta app DEBE tener diseño tan bueno como lo que muestra. No genérica.
