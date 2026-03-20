/**
 * GSAP Configuration
 * 
 * Register all GSAP plugins centrally.
 * Import this file once in layout.tsx or a top-level client component.
 * 
 * As of 2024, GSAP is 100% free including all plugins:
 * ScrollTrigger, SplitText, MorphSVG, Flip, Draggable, MotionPath
 */

export async function registerGsapPlugins() {
  try {
    const gsap = (await import('gsap')).default;
    
    // Core plugins
    const plugins = await Promise.allSettled([
      import('gsap/ScrollTrigger').then((m) => m.ScrollTrigger || m.default),
      import('gsap/Flip').then((m) => m.Flip || m.default),
      import('gsap/Draggable').then((m) => m.Draggable || m.default),
    ]);

    const resolved = plugins
      .filter((p): p is PromiseFulfilledResult<any> => p.status === 'fulfilled')
      .map((p) => p.value)
      .filter(Boolean);

    if (resolved.length > 0) {
      gsap.registerPlugin(...resolved);
    }

    // Set global defaults
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    });

    // ScrollTrigger defaults
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
      });
    } catch {
      // ScrollTrigger not available
    }

    return gsap;
  } catch {
    console.info('[Design Vault] GSAP not installed. Run: pnpm add gsap');
    return null;
  }
}

/**
 * Common GSAP animation presets for reuse across components.
 */
export const GSAP_PRESETS = {
  fadeInUp: {
    from: { opacity: 0, y: 40 },
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInLeft: {
    from: { opacity: 0, x: -40 },
    duration: 0.8,
    ease: 'power3.out',
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  stagger: {
    each: 0.08,
    ease: 'power2.out',
  },
  scrollTrigger: {
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
} as const;
