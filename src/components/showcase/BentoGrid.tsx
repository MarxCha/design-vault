'use client';

import { motion } from 'motion/react';
import { type DesignProject, CATEGORIES } from '@/data/catalog';
import { ProjectCard } from './ProjectCard';

interface BentoGridProps {
  projects: DesignProject[];
}

/**
 * Bento Grid layout para proyectos destacados.
 * Los primeros 2 proyectos son "featured" (ocupan más espacio),
 * los siguientes se acomodan en un grid asimétrico.
 */
export function BentoGrid({ projects }: BentoGridProps) {
  if (projects.length === 0) return null;

  // Layout: first 2 are large, rest are standard
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2, 12);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {/* Featured items — span 3 columns each on xl */}
      {featured.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="sm:col-span-2 lg:col-span-2 xl:col-span-3"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}

      {/* Rest of projects — standard size */}
      {rest.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
          className="sm:col-span-1 lg:col-span-2 xl:col-span-2"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
