'use client';

import { motion } from 'motion/react';
import { CATEGORIES, type Category } from '@/data/catalog';

interface CategoryHeaderProps {
  category: Category;
  projectCount: number;
}

export function CategoryHeader({ category, projectCount }: CategoryHeaderProps) {
  const cat = CATEGORIES[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: cat.color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-sm font-medium text-[var(--text-muted)]">
          {projectCount} proyectos
        </span>
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">
        {cat.label}
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
        {cat.description}
      </p>

      {/* Decorative line */}
      <motion.div
        className="mt-6 h-px"
        style={{
          background: `linear-gradient(to right, ${cat.color}, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
