'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
}

const LenisContext = createContext<LenisInstance | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);

  useEffect(() => {
    let instance: LenisInstance | null = null;
    let rafId: number;
    let useGsapTicker = false;

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default;

        instance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
        }) as unknown as LenisInstance;

        setLenis(instance);

        // Try GSAP integration first
        try {
          const gsapModule = await import('gsap');
          const ScrollTriggerModule = await import('gsap/ScrollTrigger');
          const gsap = gsapModule.default || gsapModule;
          const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule.ScrollTrigger;

          if (gsap.registerPlugin && ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            instance.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time: number) => {
              instance?.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
            useGsapTicker = true;
          }
        } catch {
          // GSAP not available
        }

        // Only use rAF loop if GSAP ticker is not driving Lenis
        if (!useGsapTicker) {
          function raf(time: number) {
            instance?.raf(time);
            rafId = requestAnimationFrame(raf);
          }
          rafId = requestAnimationFrame(raf);
        }
      } catch {
        console.info('[Design Vault] Lenis not installed. Run: pnpm add lenis');
      }
    }

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      instance?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis(): LenisInstance | null {
  return useContext(LenisContext);
}
