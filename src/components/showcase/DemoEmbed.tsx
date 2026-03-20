'use client';

import { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, RefreshCw, ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';

interface DemoEmbedProps {
  url: string;
  title: string;
  className?: string;
}

/**
 * Browser-style iframe embed for project demos.
 * Lazy-loads when visible. Has toolbar with traffic lights,
 * viewport switcher, refresh, fullscreen and external link.
 */
export function DemoEmbed({ url, title, className = '' }: DemoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync fullscreen state with browser
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleRefresh = () => {
    setIsLoaded(false);
    setRefreshKey((k) => k + 1);
  };

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px',
  };

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] ${className}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* URL bar */}
          <div className="hidden rounded-md bg-[var(--bg-secondary)] px-3 py-1 sm:block">
            <span className="max-w-[300px] truncate text-[11px] text-[var(--text-muted)]">
              {url}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Viewport switcher */}
          <div className="mr-2 hidden items-center gap-0.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-secondary)] p-0.5 sm:flex">
            {([
              { id: 'desktop' as const, Icon: Monitor },
              { id: 'tablet' as const, Icon: Tablet },
              { id: 'mobile' as const, Icon: Smartphone },
            ]).map(({ id, Icon }) => (
              <button
                key={id}
                onClick={() => setViewport(id)}
                className={`rounded p-1 transition-colors ${
                  viewport === id
                    ? 'bg-[var(--cat-components)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
                title={id}
              >
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            title="Recargar"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            title="Pantalla completa"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            title="Abrir en nueva pestaña"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Iframe container */}
      <div className="relative flex justify-center bg-[#0a0a0a]" style={{ minHeight: '60vh' }}>
        {isVisible ? (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--cat-components)]" />
                  <span className="text-[11px] text-[var(--text-muted)]">Cargando demo...</span>
                </div>
              </div>
            )}
            <div
              className="h-full w-full transition-all duration-300"
              style={{
                maxWidth: viewportWidths[viewport],
                minHeight: '60vh',
              }}
            >
              <iframe
                key={refreshKey}
                src={url}
                title={title}
                className="h-full w-full"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s',
                  minHeight: '60vh',
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <span className="text-[var(--text-muted)]">Cargando preview...</span>
          </div>
        )}
      </div>
    </div>
  );
}
