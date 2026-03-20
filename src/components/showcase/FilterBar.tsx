'use client';

import { LayoutGrid, List } from 'lucide-react';
import { CATEGORIES, type Category, type Difficulty, type DesignElement } from '@/data/catalog';

interface FilterBarProps {
  activeCategory: Category | 'all';
  activeDifficulty: Difficulty | 'all';
  activeElement: DesignElement | 'all';
  onCategoryChange: (cat: Category | 'all') => void;
  onDifficultyChange: (diff: Difficulty | 'all') => void;
  onElementChange: (el: DesignElement | 'all') => void;
  viewMode: 'bento' | 'grid';
  onViewModeChange: (mode: 'bento' | 'grid') => void;
}

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedia', label: 'Intermedia' },
  { value: 'avanzada', label: 'Avanzada' },
];

const ELEMENT_OPTIONS: { value: DesignElement | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'animations', label: 'Animaciones' },
  { value: 'scroll-driven', label: 'Scroll-driven' },
  { value: 'bento-grid', label: 'Bento Grid' },
  { value: 'typography', label: 'Tipografía' },
  { value: 'color-palette', label: 'Paleta de Color' },
  { value: '3d-webgl', label: '3D/WebGL' },
  { value: 'micro-interactions', label: 'Micro-interactions' },
  { value: 'page-transitions', label: 'Page Transitions' },
  { value: 'dark-mode', label: 'Dark Mode' },
  { value: 'responsive', label: 'Responsive' },
  { value: 'accessibility', label: 'Accesibilidad' },
];

const selectClass =
  'rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-2 text-xs text-[var(--text-secondary)] transition-colors focus:border-[var(--cat-components)] focus:outline-none';

export function FilterBar({
  activeCategory,
  activeDifficulty,
  activeElement,
  onCategoryChange,
  onDifficultyChange,
  onElementChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category select */}
      <select
        value={activeCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
        className={selectClass}
      >
        <option value="all">Todas las categorías</option>
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <option key={key} value={key}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Difficulty select */}
      <select
        value={activeDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty | 'all')}
        className={selectClass}
      >
        {DIFFICULTY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Design element select */}
      <select
        value={activeElement}
        onChange={(e) => onElementChange(e.target.value as DesignElement | 'all')}
        className={selectClass}
      >
        {ELEMENT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* View mode toggle */}
      <div className="flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)]">
        <button
          onClick={() => onViewModeChange('bento')}
          className={`rounded-l-lg p-2 transition-colors ${
            viewMode === 'bento'
              ? 'bg-[var(--cat-components)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
          aria-label="Vista Bento"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`rounded-r-lg p-2 transition-colors ${
            viewMode === 'grid'
              ? 'bg-[var(--cat-components)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
          aria-label="Vista Lista"
        >
          <List className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
