'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATALOG } from '@/data/catalog';
import { getSearchSuggestions } from '@/lib/search';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar proyectos, stacks, efectos...',
  className = '',
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update suggestions
  useEffect(() => {
    if (value.length >= 2) {
      setSuggestions(getSearchSuggestions(CATALOG, value));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleSelect = useCallback(
    (suggestion: string) => {
      onChange(suggestion);
      inputRef.current?.blur();
      setIsFocused(false);
    },
    [onChange]
  );

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-3 pl-10 pr-20 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--cat-components)] focus:outline-none"
      />

      {/* Keyboard shortcut hint */}
      {!value && !isFocused && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
          <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-card)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
            ⌘
          </kbd>
          <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-card)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
            K
          </kbd>
        </div>
      )}

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onMouseDown={() => handleSelect(suggestion)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
              >
                <Search className="h-3 w-3 text-[var(--text-muted)]" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
