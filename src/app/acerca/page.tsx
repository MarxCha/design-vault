import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getStats, CATEGORIES } from '@/data/catalog';
import { formatStars } from '@/lib/utils';

export const metadata = {
  title: 'Acerca de',
  description: 'Metodología y créditos de Design Vault.',
};

export default function AboutPage() {
  const stats = getStats();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
        Acerca de Design Vault
      </h1>

      <div className="prose-sm space-y-6 text-[var(--text-secondary)]">
        <p className="text-lg leading-relaxed">
          Design Vault es una galería curada que reúne los{' '}
          <strong className="text-[var(--text-primary)]">
            {stats.totalProjects} mejores repositorios open source
          </strong>{' '}
          con diseño web excepcional, acumulando{' '}
          <strong className="text-[var(--text-primary)]">
            {formatStars(stats.totalStars)}+ estrellas
          </strong>{' '}
          en GitHub.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Metodología de selección
        </h2>
        <p>
          Cada proyecto fue evaluado considerando tres dimensiones: popularidad
          (estrellas, forks, descargas npm), calidad visual (diseño único, no
          genérico, creatividad) y novedad (elementos poco comunes o
          experimentales que quizás no tengan muchas estrellas). La selección
          prioriza calidad sobre cantidad.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Categorías
        </h2>
        <div className="space-y-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div key={key} className="flex items-start gap-3">
              <span
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <div>
                <strong className="text-[var(--text-primary)]">
                  {cat.label}
                </strong>
                <span className="text-[var(--text-muted)]"> — </span>
                {cat.description}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Stack tecnológico
        </h2>
        <p>
          Design Vault está construido con Next.js 15, Tailwind CSS 4, shadcn/ui,
          Framer Motion, GSAP y Lenis. Las tipografías son Satoshi (body),
          General Sans (headings) y JetBrains Mono (code). Los screenshots se
          capturan automáticamente con Playwright.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Tendencias clave identificadas
        </h2>
        <p>
          El ecosistema shadcn/ui es hegemónico — Magic UI, Aceternity, Cult UI
          y Motion Primitives construyen sobre él. El stack dominante para
          landing pages premium es Next.js + Tailwind + Framer Motion para
          interfaz, y Three.js + GSAP + R3F para experiencias 3D. GSAP liberó
          todos sus plugins premium de forma gratuita, lo que cambió el juego
          para scroll-driven storytelling.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Créditos
        </h2>
        <p>
          Todos los proyectos listados pertenecen a sus respectivos autores y
          licencias. Design Vault es un proyecto de documentación y curación,
          no un fork ni redistribución. Desarrollado por{' '}
          <strong className="text-[var(--text-primary)]">
            MD Consultoría SC
          </strong>
          .
        </p>
      </div>
    </div>
  );
}
