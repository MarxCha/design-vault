# Animación & Scroll — Guía de Extracción

## Cuándo Usar Cada Librería

```
¿Es React?
├── Sí → ¿Necesitas scroll-driven?
│   ├── Sí → GSAP ScrollTrigger + Lenis
│   └── No → Motion (Framer Motion)
└── No → ¿Complejidad?
    ├── Alta → GSAP
    ├── Media → Anime.js
    └── Baja → AOS (data-attributes)

¿Necesitas page transitions?
├── Multi-page (MPA) → Barba.js + GSAP
└── SPA (React/Next) → Motion AnimatePresence

¿Necesitas smooth scroll?
├── Con parallax → Locomotive Scroll v5 (incluye Lenis)
└── Solo smooth → Lenis directo
```

## Recetas GSAP Más Útiles

### Text Reveal (SplitText + ScrollTrigger)
```js
const split = new SplitText(".heading", { type: "chars,words" });
gsap.from(split.chars, {
  opacity: 0, y: 50, rotateX: -90,
  stagger: 0.02, duration: 0.8,
  scrollTrigger: { trigger: ".heading", start: "top 80%" }
});
```

### Horizontal Scroll Section
```js
gsap.to(".panels", {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth,
  }
});
```

### Parallax Images
```js
gsap.to(".parallax-img", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: { trigger: ".section", scrub: true }
});
```
