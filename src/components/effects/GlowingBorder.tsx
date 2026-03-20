'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// ─── GlowingBorder ────────────────────────────────────────────────────────────

interface GlowingBorderProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

/**
 * Wrapper that adds a subtle animated glow border on hover.
 */
export function GlowingBorder({
  children,
  color = 'var(--cat-components)',
  className = '',
}: GlowingBorderProps) {
  return (
    <motion.div
      className={`relative rounded-xl ${className}`}
      whileHover="hover"
    >
      {/* Glow layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)`,
          filter: 'blur(8px)',
        }}
        variants={{
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// ─── ParallaxImage ────────────────────────────────────────────────────────────

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // -30 to 30, default -20 (slower than scroll)
}

/**
 * Image that moves at a different rate than scroll.
 * Negative speed = image moves up slower (classic parallax).
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = -20,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
