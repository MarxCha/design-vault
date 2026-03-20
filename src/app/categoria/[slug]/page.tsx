import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, getByCategory, type Category } from '@/data/catalog';
import { ProjectCard } from '@/components/showcase/ProjectCard';

const validCategories = Object.keys(CATEGORIES) as Category[];

export function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug as Category];
  if (!cat) return { title: 'Categoría no encontrada' };
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = slug as Category;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const cat = CATEGORIES[category];
  const projects = getByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      {/* Category header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          <span className="text-sm text-[var(--text-muted)]">
            {projects.length} proyectos
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          {cat.label}
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
          {cat.description}
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
