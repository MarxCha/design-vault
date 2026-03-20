import type { Metadata } from 'next';
import { Inter, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { LenisProvider } from '@/hooks/useLenis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-general-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
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
      className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <LenisProvider>
          <Navbar />
          <main className="pt-[var(--nav-height)]">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
