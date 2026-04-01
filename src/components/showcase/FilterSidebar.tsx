'use client';

import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Clock,
  Type,
  TrendingUp,
  Heart,
} from 'lucide-react';
import {
  CATEGORIES,
  CATALOG,
  type Category,
  type Difficulty,
  type DesignElement,
} from '@/data/catalog';
import { useFilterStore } from '@/hooks/useFilter';

import type { SortOption } from '@/hooks/useFilter';
export type { SortOption };

interface FilterSidebarProps {
  activeCategory: Category | 'all';
  activeDifficulty: Difficulty | 'all';
  activeElement: DesignElement | 'all';
  sortBy: SortOption;
  onCategoryChange: (cat: Category | 'all') => void;
  onDifficultyChange: (diff: Difficulty | 'all') => void;
  onElementChange: (el: DesignElement | 'all') => void;
  onSortChange: (sort: SortOption) => void;
  onClearAll: () => void;
  resultCount: number;
}

const DIFFICULTIES: { value: Difficulty; label: string; color: string }[] = [
  { value: 'principiante', label: 'Principiante', color: '#10b981' },
  { value: 'intermedia', label: 'Intermedia', color: '#f59e0b' },
  { value: 'avanzada', label: 'Avanzada', color: '#ef4444' },
];

const DESIGN_ELEMENTS: { value: DesignElement; label: string }[] = [
  { value: 'animations', label: 'Animaciones' },
  { value: 'scroll-driven', label: 'Scroll-driven' },
  { value: '3d-webgl', label: '3D / WebGL' },
  { value: 'micro-interactions', label: 'Micro-interactions' },
  { value: 'bento-grid', label: 'Bento Grid' },
  { value: 'typography', label: 'Tipografía' },
  { value: 'page-transitions', label: 'Page Transitions' },
  { value: 'dark-mode', label: 'Dark Mode' },
  { value: 'color-palette', label: 'Paleta de Color' },
  { value: 'responsive', label: 'Responsive' },
  { value: 'accessibility', label: 'Accesibilidad' },
];

const SORT_OPTIONS: { value: SortOption; label: string; icon: typeof Star }[] = [
  { value: 'stars', label: 'Estrellas', icon: Star },
  { value: 'name', label: 'Nombre', icon: Type },
  { value: 'date', label: 'Recientes', icon: Clock },
  { value: 'difficulty', label: 'Dificultad', icon: TrendingUp },
];

function getCategoryCount(cat: Category) {
  return CATALOG.filter((p) => p.category === cat).length;
}

export function FilterSidebar({
  activeCategory,
  activeDifficulty,
  activeElement,
  sortBy,
  onCategoryChange,
  onDifficultyChange,
  onElementChange,
  onSortChange,
  onClearAll,
  resultCount,
}: FilterSidebarProps) {
  const { favorites, showFavoritesOnly, setShowFavoritesOnly } = useFilterStore();
  const hasActiveFilters =
    activeCategory !== 'all' ||
    activeDifficulty !== 'all' ||
    activeElement !== 'all' ||
    showFavoritesOnly;

  return (
    <aside className="sticky top-[calc(var(--nav-height)+1rem)] h-fit w-full shrink-0 space-y-6 lg:w-[260px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filtros</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-[11px] text-[var(--cat-components)] transition-colors hover:underline"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="rounded-lg bg-[var(--bg-card)] px-3 py-2 text-center text-xs text-[var(--text-muted)]">
        <span className="font-semibold text-[var(--text-primary)]">
          {resultCount}
        </span>{' '}
        proyectos encontrados
      </div>

      {/* Favorites toggle */}
      {favorites.length > 0 && (
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all ${
            showFavoritesOnly
              ? 'border-red-500/30 bg-red-500/10 text-red-400'
              : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${showFavoritesOnly ? 'fill-red-500' : ''}`} />
          Favoritos
          <span className="ml-auto rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px]">
            {favorites.length}
          </span>
        </button>
      )}

      {/* Sort */}
      <div>
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          <ArrowUpDown className="mr-1.5 inline h-3 w-3" />
          Ordenar por
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {SORT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = sortBy === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] transition-all ${
                  isActive
                    ? 'bg-[var(--cat-components)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Icon className="h-3 w-3" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Categorías
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-all ${
              activeCategory === 'all'
                ? 'bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-secondary)]'
            }`}
          >
            <span>Todas</span>
            <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px]">
              {CATALOG.length}
            </span>
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = getCategoryCount(key as Category);
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() =>
                  onCategoryChange(isActive ? 'all' : (key as Category))
                }
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-secondary)]'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${cat.color}12`,
                        borderLeft: `2px solid ${cat.color}`,
                      }
                    : undefined
                }
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="flex-1 text-left">{cat.label}</span>
                <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Dificultad
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map((diff) => {
            const isActive = activeDifficulty === diff.value;
            return (
              <button
                key={diff.value}
                onClick={() =>
                  onDifficultyChange(isActive ? 'all' : diff.value)
                }
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                  isActive
                    ? 'border-transparent text-white'
                    : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                }`}
                style={
                  isActive
                    ? { backgroundColor: diff.color }
                    : undefined
                }
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Design Elements */}
      <div>
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Elementos de diseño
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {DESIGN_ELEMENTS.map((el) => {
            const isActive = activeElement === el.value;
            return (
              <button
                key={el.value}
                onClick={() =>
                  onElementChange(isActive ? 'all' : el.value)
                }
                className={`rounded-full border px-2.5 py-1 text-[10px] transition-all ${
                  isActive
                    ? 'border-[var(--cat-components)] bg-[var(--cat-components)]/10 text-[var(--cat-components)]'
                    : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {el.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active filters summary */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-2.5">
              {activeCategory !== 'all' && (
                <ActiveChip
                  label={CATEGORIES[activeCategory].label}
                  color={CATEGORIES[activeCategory].color}
                  onRemove={() => onCategoryChange('all')}
                />
              )}
              {activeDifficulty !== 'all' && (
                <ActiveChip
                  label={activeDifficulty}
                  color={
                    DIFFICULTIES.find((d) => d.value === activeDifficulty)
                      ?.color ?? '#888'
                  }
                  onRemove={() => onDifficultyChange('all')}
                />
              )}
              {activeElement !== 'all' && (
                <ActiveChip
                  label={
                    DESIGN_ELEMENTS.find((e) => e.value === activeElement)
                      ?.label ?? activeElement
                  }
                  color="var(--cat-components)"
                  onRemove={() => onElementChange('all')}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

function ActiveChip({
  label,
  color,
  onRemove,
}: {
  label: string;
  color: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
      }}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/20"
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  );
}

/** Mobile filter trigger sheet */
export function MobileFilterTrigger({
  hasActiveFilters,
  activeCount,
  onClick,
}: {
  hasActiveFilters: boolean;
  activeCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-3 py-2 text-xs transition-colors hover:border-[var(--border-hover)] lg:hidden"
    >
      <SlidersHorizontal className="h-3.5 w-3.5" />
      Filtros
      {hasActiveFilters && (
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--cat-components)] text-[9px] text-white">
          {activeCount}
        </span>
      )}
    </button>
  );
}
