'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Blocks, X } from 'lucide-react';
import {
  CATALOG,
  CATEGORIES,
  getStats,
  type Category,
  type Difficulty,
  type DesignElement,
} from '@/data/catalog';
import { ProjectCard } from '@/components/showcase/ProjectCard';
import { FilterSidebar, MobileFilterTrigger, type SortOption } from '@/components/showcase/FilterSidebar';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { AuroraBackground } from '@/components/effects/AuroraBackground';

function sortProjects(projects: typeof CATALOG, sortBy: SortOption) {
  const sorted = [...projects];
  switch (sortBy) {
    case 'stars':
      return sorted.sort((a, b) => b.stars - a.stars);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'date':
      return sorted.sort(
        (a, b) =>
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );
    case 'difficulty': {
      const order = { principiante: 0, intermedia: 1, avanzada: 2 };
      return sorted.sort(
        (a, b) => order[a.difficulty] - order[b.difficulty]
      );
    }
    default:
      return sorted;
  }
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(
    'all'
  );
  const [activeDifficulty, setActiveDifficulty] = useState<
    Difficulty | 'all'
  >('all');
  const [activeElement, setActiveElement] = useState<DesignElement | 'all'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const stats = getStats();

  const filteredProjects = useMemo(() => {
    const filtered = CATALOG.filter((project) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.stack.some((s) => s.toLowerCase().includes(q)) ||
          project.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      if (activeCategory !== 'all' && project.category !== activeCategory)
        return false;
      if (
        activeDifficulty !== 'all' &&
        project.difficulty !== activeDifficulty
      )
        return false;
      if (
        activeElement !== 'all' &&
        !project.designElements.includes(activeElement)
      )
        return false;
      return true;
    });
    return sortProjects(filtered, sortBy);
  }, [searchQuery, activeCategory, activeDifficulty, activeElement, sortBy]);

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (activeDifficulty !== 'all' ? 1 : 0) +
    (activeElement !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setActiveDifficulty('all');
    setActiveElement('all');
    setSearchQuery('');
  };

  return (
    <>
      <ScrollProgress />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <AuroraBackground />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)]/80 px-4 py-1.5 text-sm text-[var(--text-secondary)] backdrop-blur-sm"
          >
            <Blocks className="h-4 w-4 text-[var(--cat-components)]" />
            <span>{stats.totalProjects} proyectos curados</span>
            <span className="text-[var(--text-muted)]">·</span>
            <Star className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {(stats.totalStars / 1000).toFixed(0)}K+ estrellas
            </span>
          </motion.div>

          {/* Title */}
          <SplitTextReveal
            as="h1"
            className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
          >
            Design Vault
          </SplitTextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl"
          >
            Los{' '}
            <span className="text-gradient font-semibold">
              mejores repositorios open source
            </span>{' '}
            con diseño web excepcional. Explora, aprende y replica componentes
            de nivel Awwwards.
          </motion.p>

          {/* Inline category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === key ? 'all' : (key as Category)
                  )
                }
                className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-all hover:scale-105"
                style={{
                  borderColor:
                    activeCategory === key
                      ? cat.color
                      : 'var(--border-default)',
                  backgroundColor:
                    activeCategory === key
                      ? `${cat.color}15`
                      : 'var(--bg-secondary)',
                  color:
                    activeCategory === key
                      ? cat.color
                      : 'var(--text-secondary)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT: Sidebar + Grid ═══ */}
      <section className="px-6 pb-32" id="catalogo">
        <div className="mx-auto max-w-[1400px]">
          {/* Search bar — full width */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Buscar proyectos, stacks, efectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-3 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--cat-components)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <MobileFilterTrigger
              hasActiveFilters={activeFilterCount > 0}
              activeCount={activeFilterCount}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            />
          </div>

          {/* Mobile filters panel */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden lg:hidden"
              >
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                  <FilterSidebar
                    activeCategory={activeCategory}
                    activeDifficulty={activeDifficulty}
                    activeElement={activeElement}
                    sortBy={sortBy}
                    onCategoryChange={setActiveCategory}
                    onDifficultyChange={setActiveDifficulty}
                    onElementChange={setActiveElement}
                    onSortChange={setSortBy}
                    onClearAll={clearAllFilters}
                    resultCount={filteredProjects.length}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                activeCategory={activeCategory}
                activeDifficulty={activeDifficulty}
                activeElement={activeElement}
                sortBy={sortBy}
                onCategoryChange={setActiveCategory}
                onDifficultyChange={setActiveDifficulty}
                onElementChange={setActiveElement}
                onSortChange={setSortBy}
                onClearAll={clearAllFilters}
                resultCount={filteredProjects.length}
              />
            </div>

            {/* Projects grid */}
            <div className="flex-1">
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        delay: Math.min(index * 0.02, 0.3),
                        duration: 0.35,
                        layout: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        },
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <p className="text-lg text-[var(--text-muted)]">
                    No se encontraron proyectos con esos filtros.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-sm text-[var(--cat-components)] hover:underline"
                  >
                    Limpiar todos los filtros
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
