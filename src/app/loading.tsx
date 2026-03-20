export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--cat-components)]" />
        <span className="text-sm text-[var(--text-muted)]">Cargando vault...</span>
      </div>
    </div>
  );
}
