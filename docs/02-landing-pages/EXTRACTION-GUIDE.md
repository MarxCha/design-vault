# Landing Pages — Guía de Extracción

## Patrones de Diseño Replicables

### De Adrian Hajdin (JavaScript Mastery)
Los repos de Hajdin son los mejores para aprender patrones de landing pages premium:

**iPhone 15 Clone** → Extraer:
- Patrón de scroll-triggered 3D model viewer (GSAP + R3F)
- Video carousel con progress bar circular
- Section pinning con ScrollTrigger
- Responsive 3D: cómo escalar modelos por viewport

**Zentry Awwwards** → Extraer:
- Clip-path animations (CSS + GSAP)
- Video background con scroll sync
- Tipografía animada con SplitText
- Layout asymétrico responsive

**GSAP Cocktails** → Extraer (REFERENCIA COMPLETA GSAP):
- SplitText reveal (chars, words, lines)
- Parallax con ScrollTrigger
- Timeline orchestration
- Image masking con clip-path animado
- Video sync con scroll position

### Templates para Uso Directo
**Cruip** → Fork directamente para MVP de landing page
**AstroWind** → Fork para sitios que priorizan performance
**Page UI** → "Thief Mode" para copiar secciones individuales

## Stack Recomendado para Landing Pages

```
Tier 1 (Marketing simple):
  Astro + Tailwind + AOS

Tier 2 (SaaS producto):
  Next.js + Tailwind + shadcn + Magic UI + Framer Motion

Tier 3 (Awwwards level):
  Next.js + Tailwind + GSAP + Three.js/R3F + Lenis
```
