'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Star, ExternalLink, Github, Puzzle, Eye, Heart } from 'lucide-react';
import { type DesignProject, CATEGORIES } from '@/data/catalog';
import { formatStars } from '@/lib/utils';
import { useFilterStore } from '@/hooks/useFilter';
import { ThumbnailPreview, LivePreview } from './LivePreview';

interface ProjectCardProps {
  project: DesignProject;
}

const difficultyColors: Record<string, string> = {
  principiante: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermedia: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  avanzada: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();
  const category = CATEGORIES[project.category];
  const { favorites, toggleFavorite } = useFilterStore();
  const isFavorite = favorites.includes(project.id);

  return (
    <>
      <motion.article
        data-category={project.category}
        className="card-hover group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => router.push(`/proyecto/${project.id}`)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(`/proyecto/${project.id}`);
          }
        }}
      >
        {/* Screenshot / Live Preview */}
        <div className="relative aspect-video overflow-hidden bg-[var(--bg-secondary)]">
          <ThumbnailPreview
            url={project.demo}
            color={category.color}
            name={project.name}
            onPreviewClick={
              project.demo ? () => setShowPreview(true) : undefined
            }
          />

          {/* Category badge */}
          <div
            className="absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm"
            style={{
              backgroundColor: `${category.color}cc`,
              color: '#fff',
            }}
          >
            {category.label}
          </div>

          {/* Stars badge + Favorite */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] backdrop-blur-sm">
              <Star className="h-3 w-3 text-amber-400" />
              <span className="text-white">{formatStars(project.stars)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(project.id);
              }}
              className="rounded-md bg-black/60 p-1 backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-white/70'
                }`}
              />
            </button>
          </div>

          {/* Hover overlay with actions */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/60 backdrop-blur-[2px]"
          >
            {project.demo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(true);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition-transform hover:scale-105"
              >
                <Eye className="h-3.5 w-3.5" />
                Vista previa
              </button>
            )}
            <a
              href={project.demo || project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-transform hover:scale-105"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {project.demo ? 'Abrir' : 'Repo'}
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-xs font-medium text-white backdrop-blur-sm transition-transform hover:scale-105"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1 text-sm font-semibold leading-tight text-[var(--text-primary)] group-hover:text-white">
            {project.name}
          </h3>

          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="mb-3 flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-md bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${difficultyColors[project.difficulty]}`}
            >
              {project.difficulty}
            </span>

            {project.extractableComponents.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-[var(--cat-components)]">
                <Puzzle className="h-3 w-3" />
                {project.extractableComponents.length}
              </span>
            )}
          </div>
        </div>

        {/* Accent line at bottom */}
        <motion.div
          className="h-0.5"
          style={{ backgroundColor: category.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.article>

      {/* Full-screen live preview */}
      {project.demo && (
        <LivePreview
          url={project.demo}
          name={project.name}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
