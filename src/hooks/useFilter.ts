import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Category, type Difficulty, type DesignElement } from '@/data/catalog';

export type SortOption = 'stars' | 'name' | 'date' | 'difficulty';

interface FilterState {
  searchQuery: string;
  category: Category | 'all';
  difficulty: Difficulty | 'all';
  element: DesignElement | 'all';
  viewMode: 'bento' | 'grid';
  sortBy: SortOption;
  favorites: string[];
  showFavoritesOnly: boolean;

  setSearchQuery: (q: string) => void;
  setCategory: (cat: Category | 'all') => void;
  setDifficulty: (diff: Difficulty | 'all') => void;
  setElement: (el: DesignElement | 'all') => void;
  setViewMode: (mode: 'bento' | 'grid') => void;
  setSortBy: (sort: SortOption) => void;
  toggleFavorite: (id: string) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      searchQuery: '',
      category: 'all',
      difficulty: 'all',
      element: 'all',
      viewMode: 'bento',
      sortBy: 'stars',
      favorites: [],
      showFavoritesOnly: false,

      setSearchQuery: (q) => set({ searchQuery: q }),
      setCategory: (cat) => set({ category: cat }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      setElement: (el) => set({ element: el }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),

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
          showFavoritesOnly: false,
        }),
    }),
    {
      name: 'design-vault-filters',
      partialize: (state) => ({
        favorites: state.favorites,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
      }),
    }
  )
);
