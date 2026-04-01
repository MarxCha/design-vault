'use client';

import { motion } from 'motion/react';

/**
 * Aurora Background effect inspired by Aceternity UI.
 * Animated gradient blobs that create a northern-lights effect.
 * Opacity adapts per theme via CSS variables.
 */
export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary blob */}
      <motion.div
        className="absolute -top-[40%] left-[20%] h-[80vh] w-[60vw] rounded-full"
        style={{
          opacity: 'var(--aurora-opacity-primary)',
          background:
            'radial-gradient(ellipse at center, var(--cat-components), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blob */}
      <motion.div
        className="absolute -right-[10%] top-[10%] h-[60vh] w-[50vw] rounded-full"
        style={{
          opacity: 'var(--aurora-opacity-secondary)',
          background:
            'radial-gradient(ellipse at center, var(--cat-landing), transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary accent blob */}
      <motion.div
        className="absolute bottom-[10%] left-[40%] h-[40vh] w-[40vw] rounded-full"
        style={{
          opacity: 'var(--aurora-opacity-secondary)',
          background:
            'radial-gradient(ellipse at center, var(--cat-animation), transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
