# PLAN-current.md — Design Vault

## Plan de Implementación: 5 Sprints (5 semanas)

### Sprint 1: Scaffold y Core ← SIGUIENTE
- [ ] Init Next.js 15 + shadcn/ui + dependencias
- [ ] Configurar tipografía (Satoshi, General Sans, JetBrains Mono)
- [ ] Sistema de temas dark/light con colores por categoría
- [ ] Layout: Navbar + Sidebar + Footer + Lenis scroll
- [ ] `catalog.ts` con los 50 proyectos completos
- [ ] Tipos TypeScript para todo el modelo de datos

### Sprint 2: Galería y Navegación
- [ ] Home page: hero animado + bento grid + filtros
- [ ] ProjectCard con hover preview
- [ ] Vista de categoría con sub-filtros
- [ ] Vista de detalle de proyecto
- [ ] Búsqueda fuzzy
- [ ] Responsive design completo

### Sprint 3: Playground de Componentes
- [ ] Extraer 20-30 componentes replicables
- [ ] Live preview + code tabs
- [ ] Botón "Copiar código"
- [ ] Documentación de props y dependencias

### Sprint 4: Screenshots y Media
- [ ] Script Playwright para capturar 50 screenshots
- [ ] Video previews para proyectos con animación
- [ ] Optimización de imágenes (WebP, blur placeholders)
- [ ] Lazy loading de iframes

### Sprint 5: Pulido y Efectos
- [ ] Page transitions (AnimatePresence)
- [ ] GSAP scroll effects globales
- [ ] SEO + Open Graph
- [ ] Lighthouse optimization
- [ ] Deploy a Vercel
