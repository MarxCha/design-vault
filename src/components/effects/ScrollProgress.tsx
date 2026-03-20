'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Thin progress bar at the top of the viewport
 * that shows how far the user has scrolled.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-0.5 origin-left bg-[var(--cat-components)]"
      style={{ scaleX }}
    />
  );
}
