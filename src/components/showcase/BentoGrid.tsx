'use client';

import { motion } from 'motion/react';
import { type DesignProject } from '@/data/catalog';
import { ProjectCard } from './ProjectCard';

interface BentoGridProps {
  projects: DesignProject[];
}

/**
 * Bento Grid — asymmetric layout with featured items spanning wider.
 * Pattern: first 2 span full width, then every 5th item spans 2 cols.
 */
export function BentoGrid({ projects }: BentoGridProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, i) => {
        // First item spans 2 cols, then every 7th after that
        const isWide = i === 0 || (i > 2 && i % 7 === 0);
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.4 }}
            className={isWide ? 'sm:col-span-2' : ''}
          >
            <ProjectCard project={project} />
          </motion.div>
        );
      })}
    </div>
  );
}
