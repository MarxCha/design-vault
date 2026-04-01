import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const CATEGORY_COLORS: Record<string, string> = {
  'component-libraries': '#2563eb',
  'landing-pages': '#7c3aed',
  'dashboards': '#059669',
  'portfolios': '#d97706',
  '3d-webgl': '#dc2626',
  'animation-libs': '#0891b2',
  'products': '#4f46e5',
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Design Vault';
  const category = searchParams.get('category') || '';
  const stars = searchParams.get('stars') || '';
  const count = searchParams.get('count') || '';
  const accentColor = CATEGORY_COLORS[category] || '#2563eb';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#09090b',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: accentColor,
            opacity: 0.08,
            filter: 'blur(100px)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            DV
          </div>
          <span style={{ color: '#a1a1aa', fontSize: '20px' }}>Design Vault</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 30 ? '56px' : '72px',
            fontWeight: 700,
            color: '#fafafa',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {/* Meta info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            color: '#71717a',
          }}
        >
          {category && (
            <span
              style={{
                color: accentColor,
                borderBottom: `2px solid ${accentColor}`,
                paddingBottom: '2px',
              }}
            >
              {category.replace(/-/g, ' ')}
            </span>
          )}
          {stars && <span>⭐ {Number(stars).toLocaleString()}</span>}
          {count && <span>{count} proyectos</span>}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(to right, ${accentColor}, transparent)`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
