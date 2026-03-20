'use client';

import Link from 'next/link';
import { CATEGORIES, getStats } from '@/data/catalog';
import { formatStars } from '@/lib/utils';

export function Footer() {
  const stats = getStats();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--cat-components)]">
                <span className="text-xs font-bold text-white">DV</span>
              </div>
              <span className="text-sm font-semibold">Design Vault</span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              Galería curada de los mejores repositorios open source con diseño
              web excepcional. {stats.totalProjects} proyectos ·{' '}
              {formatStars(stats.totalStars)} estrellas combinadas.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Categorías
            </h3>
            <ul className="space-y-2">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <li key={key}>
                  <Link
                    href={`/categoria/${key}`}
                    className="flex items-center gap-2 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Explorar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#catalogo"
                  className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Catálogo completo
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Playground
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/md-consultoria/design-vault"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Estadísticas
            </h3>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <p>{stats.totalProjects} proyectos documentados</p>
              <p>{stats.totalComponents} componentes extraíbles</p>
              <p>{stats.byDifficulty.principiante} principiante · {stats.byDifficulty.intermedia} intermedia · {stats.byDifficulty.avanzada} avanzada</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-default)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 MD Consultoría SC. Hecho con Next.js, shadcn/ui y mucho café.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Los proyectos listados pertenecen a sus respectivos autores y licencias.
          </p>
        </div>
      </div>
    </footer>
  );
}
