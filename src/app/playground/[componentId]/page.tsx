import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileCode } from 'lucide-react';
import { CATALOG, CATEGORIES } from '@/data/catalog';

function findComponent(componentId: string) {
  for (const project of CATALOG) {
    const comp = project.extractableComponents.find((c) => c.id === componentId);
    if (comp) return { project, component: comp };
  }
  return null;
}

export function generateStaticParams() {
  return CATALOG.flatMap((p) =>
    p.extractableComponents.map((c) => ({ componentId: c.id }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ componentId: string }> }) {
  const { componentId } = await params;
  const result = findComponent(componentId);
  if (!result) return { title: 'Componente no encontrado' };
  return {
    title: `${result.component.name} — Playground`,
    description: result.component.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ componentId: string }>;
}) {
  const { componentId } = await params;
  const result = findComponent(componentId);

  if (!result) {
    notFound();
  }

  const { project, component } = result;
  const category = CATEGORIES[project.category];
  const sourceUrl = `${project.repo}/blob/main/${component.sourceFile}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/playground"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Playground
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <FileCode className="h-5 w-5" style={{ color: category.color }} />
          <span className="font-mono text-2xl font-bold">{component.name}</span>
        </div>
        <p className="mb-4 text-lg text-[var(--text-secondary)]">
          {component.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <span>De</span>
          <Link
            href={`/proyecto/${project.id}`}
            className="text-[var(--cat-components)] hover:underline"
          >
            {project.name}
          </Link>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Source */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Archivo fuente
          </h2>
          <div className="mb-4 rounded-lg bg-[var(--bg-secondary)] p-3">
            <code className="text-sm text-[var(--text-secondary)]">
              {component.sourceFile}
            </code>
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--cat-components)] hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Ver código en GitHub
          </a>
        </div>

        {/* Dependencies */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Dependencias
          </h2>
          {component.dependencies.length > 0 ? (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                {component.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="rounded-lg px-3 py-1.5 text-sm"
                    style={{
                      backgroundColor: `${category.color}15`,
                      color: category.color,
                    }}
                  >
                    {dep}
                  </span>
                ))}
              </div>
              <div className="rounded-lg bg-[var(--bg-secondary)] p-3">
                <code className="text-xs text-[var(--text-muted)]">
                  pnpm add {component.dependencies.join(' ')}
                </code>
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">
              Sin dependencias adicionales.
            </p>
          )}
        </div>
      </div>

      {/* Project context */}
      <div className="mt-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Proyecto de origen
        </h2>
        <div className="flex items-start gap-4">
          <span
            className="mt-1 h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <div>
            <Link
              href={`/proyecto/${project.id}`}
              className="text-lg font-semibold hover:text-[var(--cat-components)]"
            >
              {project.name}
            </Link>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-[var(--bg-secondary)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
