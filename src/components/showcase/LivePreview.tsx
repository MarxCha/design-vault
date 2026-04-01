'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, ExternalLink, Maximize2, Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';

interface LivePreviewProps {
  url: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '390px' },
] as const;

export function LivePreview({ url, name, isOpen, onClose }: LivePreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col bg-[var(--bg-primary)]"
        >
          {/* Toolbar */}
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 py-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{name}</span>
              <div className="hidden items-center gap-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-0.5 sm:flex">
                {VIEWPORTS.map((vp) => {
                  const Icon = vp.icon;
                  return (
                    <button
                      key={vp.id}
                      onClick={() => setViewport(vp.id)}
                      className={`rounded-md p-1.5 transition-colors ${
                        viewport === vp.id
                          ? 'bg-[var(--cat-components)] text-white'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                      }`}
                      title={vp.label}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden max-w-md flex-1 px-6 md:block">
              <div className="flex items-center gap-2 rounded-lg bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
                <span className="truncate">{url}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setIsLoading(true); setRefreshKey((k) => k + 1); }}
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                title="Recargar"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-400"
                title="Cerrar (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0a0a0a] p-4">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-primary)]">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--cat-components)]" />
                  <span className="text-xs text-[var(--text-muted)]">Cargando preview...</span>
                </div>
              </div>
            )}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full overflow-hidden rounded-lg border border-[var(--border-default)] bg-white shadow-2xl"
              style={{ width: VIEWPORTS.find((v) => v.id === viewport)?.width ?? '100%', maxWidth: '100%' }}
            >
              <iframe
                key={refreshKey}
                ref={iframeRef}
                src={url}
                title={`Preview de ${name}`}
                className="h-full w-full"
                sandbox="allow-scripts allow-same-origin allow-popups"
                onLoad={() => setIsLoading(false)}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Screenshot-based thumbnail. Uses captured WebP images instead of iframes.
 */
export function ThumbnailPreview({
  url,
  color,
  name,
  projectId,
  onPreviewClick,
}: {
  url?: string;
  color: string;
  name: string;
  projectId: string;
  onPreviewClick?: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const screenshotSrc = `/screenshots/${projectId}.webp`;

  return (
    <div className="relative h-full w-full">
      {/* Gradient background always visible */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}08 40%, transparent 70%)`,
        }}
      />

      {/* Screenshot image */}
      {!imgError ? (
        <Image
          src={screenshotSrc}
          alt={`Screenshot de ${name}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-5xl font-bold opacity-[0.08]" style={{ color }}>
            {name.charAt(0)}
          </span>
        </div>
      )}

      {/* Preview button overlay */}
      {url && onPreviewClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreviewClick();
          }}
          className="absolute bottom-2 right-2 z-20 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <Maximize2 className="h-3 w-3" />
          Preview
        </button>
      )}
    </div>
  );
}
