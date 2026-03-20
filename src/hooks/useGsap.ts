'use client';

import { useEffect, useRef, type RefObject } from 'react';

export function useGsap<T extends HTMLElement>(
  animationFn: (gsap: any, element: T) => void,
  deps: any[] = []
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const ctxRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    let cancelled = false;

    async function initAnimation() {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule;

        try {
          const stModule = await import('gsap/ScrollTrigger');
          const ScrollTrigger = stModule.default || stModule.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
        } catch {
          // ScrollTrigger not available
        }

        try {
          const splitModule = await import('gsap/SplitText');
          const SplitText = splitModule.default || splitModule.SplitText;
          gsap.registerPlugin(SplitText);
        } catch {
          // SplitText not available
        }

        if (cancelled) return;

        ctxRef.current = gsap.context(() => {
          animationFn(gsap, element);
        }, element);
      } catch {
        console.info('[Design Vault] GSAP not installed. Run: pnpm add gsap');
      }
    }

    initAnimation();

    return () => {
      cancelled = true;
      ctxRef.current?.revert();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
