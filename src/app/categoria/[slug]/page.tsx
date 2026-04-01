import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, getByCategory, type Category } from '@/data/catalog';
import { ProjectCard } from '@/components/showcase/ProjectCard';
import { CategoryHeader } from '@/components/showcase/CategoryHeader';

const validCategories = Object.keys(CATEGORIES) as Category[];

export function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug as Category];
  if (!cat) return { title: 'Categoría no encontrada' };
  const count = getByCategory(slug as Category).length;
  return {
    title: cat.label,
    description: cat.description,
    openGraph: {
      title: `${cat.label} — Design Vault`,
      description: `${count} proyectos open source de ${cat.label.toLowerCase()}`,
      type: 'website',
      images: [`/api/og?title=${encodeURIComponent(cat.label)}&category=${slug}&count=${count}`],
    },
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

      <CategoryHeader category={category} projectCount={projects.length} />

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
