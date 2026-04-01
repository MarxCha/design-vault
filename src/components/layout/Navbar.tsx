'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X, Sun, Moon, SunDim, Github } from 'lucide-react';

type Theme = 'dark' | 'dim' | 'light';
const THEME_CYCLE: Theme[] = ['dark', 'dim', 'light'];
const THEME_ICONS: Record<Theme, typeof Sun> = {
  dark: Moon,
  dim: SunDim,
  light: Sun,
};
const THEME_LABELS: Record<Theme, string> = {
  dark: 'Modo oscuro',
  dim: 'Modo cálido',
  light: 'Modo claro',
};

const NAV_LINKS = [
  { href: '/', label: 'Galería' },
  { href: '/#catalogo', label: 'Catálogo' },
  { href: '/playground', label: 'Playground' },
  { href: '/acerca', label: 'Acerca' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const { scrollY } = useScroll();

  useEffect(() => {
    const saved = localStorage.getItem('design-vault-theme') as Theme | null;
    if (saved && THEME_CYCLE.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const toggleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('design-vault-theme', next);
  };

  const ThemeIcon = THEME_ICONS[theme];

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 h-[var(--nav-height)] transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--cat-components)]">
            <span className="text-sm font-bold text-white">DV</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            Design Vault
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            aria-label={THEME_LABELS[theme]}
            title={THEME_LABELS[theme]}
          >
            <ThemeIcon className="h-4 w-4" />
          </button>

          <a
            href="https://github.com/md-consultoria/design-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden glass md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
