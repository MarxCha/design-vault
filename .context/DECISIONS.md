# DECISIONS.md — Design Vault

## DEC-001: Next.js 15 App Router (no Pages Router)
**Fecha**: 2026-03-19  
**Razón**: App Router es el estándar para nuevos proyectos. Server Components para catálogo estático. Parallel routes potenciales para playground.

## DEC-002: shadcn/ui como base UI
**Razón**: Es el ecosistema del que habla toda la investigación. Magic UI, Aceternity, Cult UI construyen sobre shadcn. Filosofía copy-paste alineada con el propósito del proyecto.

## DEC-003: GSAP + Framer Motion (ambos, no uno u otro)
**Razón**: GSAP para scroll-driven animations complejas (ScrollTrigger, SplitText, timelines). Motion para animaciones de componente React (layout, presence, gestures). Son complementarios, no competidores.

## DEC-004: Catálogo estático en TypeScript (no base de datos)
**Razón**: 50 proyectos es manejable en un archivo TS. Type safety completo. No necesitamos CRUD dinámico. Si crece a 200+, migrar a MDX files o SQLite.

## DEC-005: Screenshots con Playwright (no manuales)
**Razón**: Reproducibilidad. Se pueden re-capturar cuando cambian los demos. Script automatizable en CI.

## DEC-006: Dark mode por defecto
**Razón**: El 80%+ de los repos que investigamos usan dark mode. La estética del proyecto debe reflejar su contenido. Light mode disponible como toggle.

## DEC-007: Lenis para smooth scroll (no Locomotive v5)
**Razón**: Lenis es más ligero (3.6KB vs 9.4KB), mejor integración con GSAP ScrollTrigger, y es la base sobre la que Locomotive v5 se reconstruyó de todos modos.
