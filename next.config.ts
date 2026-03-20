import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack for dev (default in Next 15)
  // Three.js and R3F need transpilation
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'lenis',
  ],

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'gsap',
      'three',
    ],
  },

  // Webpack customization for Three.js
  webpack: (config) => {
    // GLSL shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
