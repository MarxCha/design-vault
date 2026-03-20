# Librerías de Componentes Animados — Guía de Extracción

## Prioridad de Extracción

### Magic UI (ALTA — 150+ componentes, todos copy-paste)
Componentes más valiosos para replicar:
1. **Globe** — El globo interactivo estilo GitHub. Dependencia: `cobe`. 
2. **BorderBeam** — Borde luminoso animado. CSS-only con pseudo-elements.
3. **Marquee** — Carrusel infinito. Dos filas en dirección opuesta.
4. **AnimatedShinyText** — Shimmer effect en texto. Gradient animation CSS.
5. **MeteorEffect** — Meteoritos cayendo. Absolute positioned spans animados.
6. **NumberTicker** — Contador animado de números. Spring animation.
7. **RetroGrid** — Grid perspective retro. CSS transform perspective.
8. **DotPattern** — Fondo de puntos SVG pattern.
9. **OrbitingCircles** — Círculos orbitando un centro. CSS rotate animation.
10. **BentoGrid** — Grid bento responsive. CSS Grid con spans.

### Aceternity UI (ALTA — efectos premium únicos)
1. **AuroraBackground** — Aurora boreal. CSS gradients con filter blur.
2. **SpotlightEffect** — Spotlight sigue cursor. `onMouseMove` + radial gradient.
3. **3DCardEffect** — Parallax 3D en hover. Transform rotateX/Y.
4. **TracingBeam** — Línea SVG que sigue scroll. useScroll + motion.
5. **TextGenerateEffect** — Texto que aparece palabra por palabra.
6. **HeroHighlight** — Highlight animado en texto hero.
7. **InfiniteMovingCards** — Testimonios en scroll infinito.
8. **LampEffect** — Lamp/spotlight con conic gradient.
9. **WavyBackground** — Canvas con ondas animadas.
10. **BackgroundGradientAnimation** — Gradients que se mueven.

### Motion Primitives (MEDIA — componentes elegantes y refinados)
1. **TextEffect** — Múltiples presets: fade-in, blur, scramble, stagger.
2. **MorphingDialog** — Dialog que morphs desde trigger element.
3. **Spotlight** — Spotlight cursor effect minimalista.
4. **AnimatedBackground** — Background que cambia con active tab.

### Cult UI (MEDIA — experimental, nichos específicos)
1. **MacOSDock** — Dock con magnification effect al hover.
2. **PixelHeading** — Heading pixelado con efecto glitch.
3. **GradientHeading** — Heading con gradient animado.
4. **NeurmorphButton** — Botón con efecto neumórfico.

### Launch UI (BAJA — bloques útiles pero menos únicos)
1. **HeroGlow** — Hero section con glow radial.
2. **BentoFeatures** — Feature grid en bento layout.
3. **TestimonialMasonry** — Testimonios en masonry grid.

## Patrón de Extracción

Para cada componente:
1. Copiar el archivo fuente del repo original
2. Adaptar imports a nuestro proyecto (shadcn paths, motion import)
3. Crear página preview en `/playground/[component-id]`
4. Documentar props, variantes, dependencias
5. Agregar example de uso mínimo
