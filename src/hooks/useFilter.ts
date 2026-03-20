import { create } from 'zustand';
import { type Category, type Difficulty, type DesignElement } from '@/data/catalog';

interface FilterState {
  searchQuery: string;
  category: Category | 'all';
  difficulty: Difficulty | 'all';
  element: DesignElement | 'all';
  viewMode: 'bento' | 'grid';
  favorites: string[]; // project ids

  // Actions
  setSearchQuery: (q: string) => void;
  setCategory: (cat: Category | 'all') => void;
  setDifficulty: (diff: Difficulty | 'all') => void;
  setElement: (el: DesignElement | 'all') => void;
  setViewMode: (mode: 'bento' | 'grid') => void;
  toggleFavorite: (id: string) => void;
  clearFilters: () => void;
}

/**
 * Global filter state using Zustand.
 * Persists favorites to localStorage.
 * 
 * Usage:
 *   const { category, setCategory, favorites } = useFilterStore();
 */
export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  category: 'all',
  difficulty: 'all',
  element: 'all',
  viewMode: 'bento',
  favorites: [],

  setSearchQuery: (q) => set({ searchQuery: q }),
  setCategory: (cat) => set({ category: cat }),
  setDifficulty: (diff) => set({ difficulty: diff }),
  setElement: (el) => set({ element: el }),
  setViewMode: (mode) => set({ viewMode: mode }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),

  clearFilters: () =>
    set({
      searchQuery: '',
      category: 'all',
      difficulty: 'all',
      element: 'all',
    }),
}));
