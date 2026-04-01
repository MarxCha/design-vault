import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Star, Puzzle, BookOpen, FileCode } from 'lucide-react';
import { CATALOG, CATEGORIES, getById } from '@/data/catalog';
import { formatStars } from '@/lib/utils';
import { DemoEmbed } from '@/components/showcase/DemoEmbed';

export function generateStaticParams() {
  return CATALOG.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getById(id);
  if (!project) return { title: 'Proyecto no encontrado' };
  const cat = CATEGORIES[project.category];
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — Design Vault`,
      description: `${project.description} | ${cat.label} · ${formatStars(project.stars)} ⭐`,
      type: 'article',
      images: [`/api/og?title=${encodeURIComponent(project.name)}&category=${project.category}&stars=${project.stars}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description,
    },
  };
}

const difficultyColors: Record<string, string> = {
  principiante: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermedia: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  avanzada: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getById(id);

  if (!project) {
    notFound();
  }

  const category = CATEGORIES[project.category];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={`/categoria/${project.category}`}
            className="mb-3 inline-block rounded-md px-2.5 py-1 text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
              border: `1px solid ${category.color}30`,
            }}
          >
            {category.label}
          </Link>

          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--cat-components)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Ver Demo
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)]"
          >
            <Github className="h-4 w-4" />
            Repositorio
          </a>
        </div>
      </div>

      {/* Screenshot / Demo */}
      {project.demo ? (
        <div className="mb-10">
          <DemoEmbed
            url={project.demo}
            title={`Demo de ${project.name}`}
          />
        </div>
      ) : (
        <div className="mb-10 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)]">
          <div className="text-center">
            <span className="text-[var(--text-muted)]">
              Demo no disponible
            </span>
            <div className="mt-3">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)]"
              >
                <Github className="h-4 w-4" />
                Visitar repositorio
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Highlights */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Star className="h-5 w-5 text-amber-400" />
              ¿Por qué es excepcional?
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          {/* Extractable Components */}
          {project.extractableComponents.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Puzzle className="h-5 w-5 text-[var(--cat-components)]" />
                Componentes Extraíbles
              </h2>
              <div className="space-y-3">
                {project.extractableComponents.map((comp) => (
                  <div
                    key={comp.id}
                    className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-4"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-[var(--cat-components)]" />
                      <span className="font-mono text-sm font-semibold">
                        {comp.name}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-[var(--text-muted)]">
                      {comp.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                        {comp.sourceFile}
                      </span>
                      {comp.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="rounded bg-[var(--cat-components)]/10 px-1.5 py-0.5 text-[10px] text-[var(--cat-components)]"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tutorial */}
          {project.tutorial && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <BookOpen className="h-5 w-5" />
                Tutorial
              </h2>
              <a
                href={project.tutorial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--cat-components)] hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Ver tutorial
              </a>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Metadata card */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Información
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-[var(--text-muted)]">Estrellas</dt>
                <dd className="flex items-center gap-1 font-medium">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  {formatStars(project.stars)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-[var(--text-muted)]">Dificultad</dt>
                <dd>
                  <span className={`rounded border px-2 py-0.5 text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-[var(--text-muted)]">Licencia</dt>
                <dd className="font-medium">{project.license}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-[var(--text-muted)]">Componentes</dt>
                <dd className="font-medium">{project.extractableComponents.length}</dd>
              </div>
            </dl>
          </div>

          {/* Stack */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-[var(--bg-secondary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Design Elements */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Elementos de diseño
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.designElements.map((el) => (
                <span
                  key={el}
                  className="rounded-lg border border-[var(--border-default)] px-2.5 py-1 text-xs text-[var(--text-muted)]"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Figma */}
          {project.figma && (
            <a
              href={project.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4 text-sm transition-colors hover:border-[var(--border-hover)]"
            >
              <span className="text-[var(--text-secondary)]">Archivos Figma disponibles</span>
              <ExternalLink className="ml-auto h-4 w-4 text-[var(--text-muted)]" />
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
