# Design Vault 🏛️

> Galería curada interactiva de los mejores repositorios open source con diseño web excepcional.

**50 proyectos** · **7 categorías** · **500K+ ⭐ combinadas** · **30+ componentes extraíbles**

## ¿Qué es Design Vault?

Un museo digital de diseño web que reúne, documenta y permite explorar las mejores landing pages, dashboards, portfolios y experiencias 3D open source del mundo. Funciona como:

- **Biblioteca de referencia visual** — descubre diseño excepcional por categoría
- **Playground de componentes** — copia componentes replicables con un clic
- **Guía de implementación** — aprende qué hace excepcional a cada proyecto

## Categorías

| Categoría | Proyectos | Descripción |
|---|---|---|
| 🧱 Componentes Animados | 6 | shadcn/ui, Magic UI, Aceternity, Motion Primitives, Cult UI, Launch UI |
| 🚀 Landing Pages | 9 | iPhone clone, Zentry Awwwards, Cruip, AstroWind, SaaS templates |
| 📊 Dashboards | 10 | Grafana, Metabase, Superset, Tremor, Tabler, shadcn-admin |
| 🎨 Portfolios | 12 | Brittany Chiang, Bruno Simon, macOS sim, Craftzdog, retro CRT |
| 🌐 3D & WebGL | 6 | React Three Fiber, Theatre.js, Infinite World, shaders |
| ✨ Animación | 7 | GSAP, Motion, Anime.js, Lenis, Locomotive, Barba.js, AOS |
| 📦 Productos | 4 | cal.com, Dub.co, Payload CMS, Penpot |

## Stack

```
Next.js 15          Tailwind CSS 4       shadcn/ui
Framer Motion       GSAP + ScrollTrigger React Three Fiber
Lenis               Zustand              TypeScript
Satoshi + General Sans + JetBrains Mono
```

## Quick Start

```bash
# Clonar
git clone https://github.com/md-consultoria/design-vault.git
cd design-vault

# Instalar
pnpm install

# Desarrollar
pnpm dev

# Capturar screenshots (requiere Playwright)
pnpm screenshots
```

## Estructura

```
src/
├── app/           # Next.js App Router pages
├── components/    # UI, layout, showcase, effects
├── data/          # catalog.ts — los 50 proyectos
├── lib/           # Utilidades y configuración
├── hooks/         # Custom hooks (GSAP, Lenis, filtros)
└── styles/        # Globals + CSS custom
```

## Documentación

Consultar `CLAUDE.md` para instrucciones completas de implementación y `.context/` para el estado actual del proyecto.

---

**MD Consultoría SC** · 2026
