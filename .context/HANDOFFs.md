# HANDOFFs.md — Design Vault

## Handoff Inicial: Planificación → Implementación

**De**: Claude AI (estrategia/planificación)  
**Para**: Claude Code (implementación)  
**Fecha**: 2026-03-19

### Contexto
Se realizó investigación exhaustiva de ~50 repos open source con diseño web excepcional. El resultado es un catálogo curado que debe convertirse en una app-galería interactiva llamada "Design Vault".

### Archivos clave a leer primero
1. `CLAUDE.md` — Instrucciones completas, stack, fases, arquitectura
2. `src/data/catalog.ts` — Los 50 proyectos con toda su metadata
3. `.context/PLAN-current.md` — Plan de sprints
4. `.context/DECISIONS.md` — Decisiones técnicas y sus razones

### Prioridad de implementación
1. **Datos primero**: `catalog.ts` es la fuente de verdad
2. **Layout + Navegación**: Que se pueda navegar entre categorías
3. **Home bento grid**: El showcase principal
4. **ProjectCard con hover**: La UX core
5. **Detalle de proyecto**: La información completa
6. **Playground**: Componentes copiables

### Nota importante
La app DEBE tener diseño excepcional propio. No es aceptable un template genérico mostrando diseños excepcionales. Usa los mismos principios que documentamos: GSAP para scroll, Motion para micro-interactions, tipografía Satoshi/General Sans, dark mode con acentos de color por categoría.
