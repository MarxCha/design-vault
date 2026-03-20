import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-6xl font-bold tracking-tight text-gradient">404</h1>
      <p className="mb-8 text-lg text-[var(--text-secondary)]">
        Esta página no existe en el vault.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[var(--cat-components)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
