import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { LenisProvider } from '@/hooks/useLenis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://design-vault.vercel.app'),
  title: {
    default: 'Design Vault — Galería de Diseño Web Open Source',
    template: '%s | Design Vault',
  },
  description:
    'Catálogo curado de los 50 mejores repositorios open source con diseño web excepcional. Landing pages, dashboards, portfolios, 3D y más.',
  keywords: [
    'diseño web', 'open source', 'landing pages', 'dashboards', 'portfolios',
    'three.js', 'gsap', 'framer motion', 'shadcn', 'tailwind css',
  ],
  authors: [{ name: 'MD Consultoría SC' }],
  openGraph: {
    title: 'Design Vault — Galería de Diseño Web Open Source',
    description: '50 repos · 7 categorías · 500K+ ⭐ combinadas',
    type: 'website',
    locale: 'es_MX',
    images: ['/api/og?title=Design%20Vault'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Vault — Galería de Diseño Web Open Source',
    description: '50 repos open source con diseño web excepcional',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <LenisProvider>
          <Navbar />
          <main className="pt-[var(--nav-height)]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
