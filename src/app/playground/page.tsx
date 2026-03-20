'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { CATALOG, CATEGORIES, getAllExtractableComponents } from '@/data/catalog';

export default function PlaygroundPage() {
  const allComponents = getAllExtractableComponents();

  // Group components by source project
  const projectsWithComponents = CATALOG.filter(
    (p) => p.extractableComponents.length > 0
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          Playground
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
          {allComponents.length} componentes extraíbles de{' '}
          {projectsWithComponents.length} proyectos. Cada uno está documentado
          con su código fuente, dependencias y ejemplo de uso.
        </p>
      </div>

      {/* Components grouped by project */}
      <div className="space-y-10">
        {projectsWithComponents.map((project) => {
          const category = CATEGORIES[project.category];

          return (
            <section key={project.id}>
              {/* Project header */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <Link
                  href={`/proyecto/${project.id}`}
                  className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--cat-components)]"
                >
                  ver proyecto →
                </Link>
              </div>

              {/* Components grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.extractableComponents.map((comp) => (
                  <ComponentCard
                    key={comp.id}
                    component={comp}
                    projectRepo={project.repo}
                    color={category.color}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Empty state hint */}
      {projectsWithComponents.length === 0 && (
        <div className="py-24 text-center text-[var(--text-muted)]">
          Los componentes del playground se están catalogando. Vuelve pronto.
        </div>
      )}
    </div>
  );
}

// ─── ComponentCard ─────────────────────────────────────────────────────────────

interface ComponentCardProps {
  component: {
    id: string;
    name: string;
    description: string;
    sourceFile: string;
    dependencies: string[];
  };
  projectRepo: string;
  color: string;
}

function ComponentCard({ component, projectRepo, color }: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const sourceUrl = `${projectRepo}/blob/main/${component.sourceFile}`;

  const handleCopyImport = () => {
    const deps = component.dependencies.length
      ? `pnpm add ${component.dependencies.join(' ')}`
      : '// No extra dependencies';
    navigator.clipboard.writeText(deps);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-hover)]">
      <div className="mb-2 flex items-center gap-2">
        <FileCode className="h-4 w-4" style={{ color }} />
        <span className="font-mono text-sm font-semibold">
          {component.name}
        </span>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-[var(--text-muted)]">
        {component.description}
      </p>

      {/* Source file */}
      <div className="mb-3 rounded-lg bg-[var(--bg-secondary)] p-2">
        <code className="text-[10px] text-[var(--text-muted)]">
          {component.sourceFile}
        </code>
      </div>

      {/* Dependencies */}
      {component.dependencies.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {component.dependencies.map((dep) => (
            <span
              key={dep}
              className="rounded px-1.5 py-0.5 text-[10px]"
              style={{
                backgroundColor: `${color}15`,
                color,
              }}
            >
              {dep}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ExternalLink className="h-3 w-3" />
          Ver código
        </a>
        <button
          onClick={handleCopyImport}
          className="flex items-center gap-1 text-[10px] transition-colors"
          style={{ color: copied ? '#22c55e' : color }}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? 'Copiado' : 'Copiar deps'}
        </button>
      </div>
    </div>
  );
}
