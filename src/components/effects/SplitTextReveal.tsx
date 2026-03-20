'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitTextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

/**
 * Text reveal animation that splits text into words and animates them in.
 * Uses Framer Motion for React compatibility. For GSAP SplitText,
 * switch to the GSAP version when the plugin is loaded.
 */
export function SplitTextReveal({
  children,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  staggerDelay = 0.04,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const words = children.split(' ');

  return (
    <Tag ref={ref as any} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1], // expo out
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
