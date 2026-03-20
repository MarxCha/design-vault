/**
 * Design Vault — Screenshot Capture Pipeline
 * 
 * Usa Playwright para capturar screenshots de cada demo URL
 * en el catálogo. Genera imágenes WebP optimizadas para la galería.
 * 
 * Uso:
 *   npx tsx scripts/capture-screenshots.ts
 *   npx tsx scripts/capture-screenshots.ts --id=magic-ui
 *   npx tsx scripts/capture-screenshots.ts --category=landing-pages
 * 
 * Requiere:
 *   pnpm add -D playwright @playwright/test
 *   npx playwright install chromium
 */

import { chromium, type Browser, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

// Importar catálogo (ajustar path según build)
// En desarrollo, usar ts-node o tsx para ejecutar directamente
const CATALOG_PATH = path.resolve(__dirname, '../src/data/catalog.ts');

// Configuración
const CONFIG = {
  outputDir: path.resolve(__dirname, '../public/screenshots'),
  viewports: {
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
  },
  timeout: 30_000,          // 30s máximo por página
  waitAfterLoad: 3_000,     // 3s extra para que carguen animaciones
  quality: 85,              // WebP quality
  maxConcurrent: 3,         // Capturas simultáneas
};

interface ProjectEntry {
  id: string;
  name: string;
  demo?: string;
  repo: string;
}

// Proyectos con demos conocidas
const DEMO_URLS: Record<string, string> = {
  'shadcn-ui': 'https://ui.shadcn.com',
  'magic-ui': 'https://magicui.design',
  'aceternity-ui': 'https://ui.aceternity.com',
  'motion-primitives': 'https://motion-primitives.com',
  'cult-ui': 'https://www.cult-ui.com',
  'launch-ui': 'https://www.launchuicomponents.com',
  'iphone-15-clone': 'https://apple-iphone-v.vercel.app',
  'cruip-open-react': 'https://open.cruip.com',
  'astrowind': 'https://astrowind.vercel.app',
  'saas-boilerplate': 'https://react-saas.com',
  'page-ui-shipixen': 'https://pageui.shipixen.com',
  'awesome-landing-pages': 'https://awesome-landingpages.vercel.app',
  'grafana': 'https://play.grafana.org',
  'tremor': 'https://npm.tremor.so',
  'tabler': 'https://preview.tabler.io',
  'shadcn-admin': 'https://shadcn-admin.netlify.app',
  'horizon-ui': 'https://horizon-ui.com',
  'next-shadcn-dashboard': 'https://next-shadcn-dashboard-starter.vercel.app',
  'brittany-chiang-v4': 'https://v4.brittanychiang.com',
  'leerob-site': 'https://leerob.io',
  'bruno-simon-folio': 'https://bruno-simon.com',
  'macos-portfolio': 'https://portfolio.zxh.me',
  'craftzdog-homepage': 'https://www.craftz.dog',
  'hamishmw-portfolio': 'https://hamishw.com',
  'magic-ui-portfolio': 'https://dillion.io',
  'nim-template': 'https://nim-eight.vercel.app',
  'retro-computer': 'https://edwardh.io',
  'react-three-fiber': 'https://docs.pmnd.rs',
  'theatre-js': 'https://www.theatrejs.com',
  'book-of-shaders': 'https://thebookofshaders.com',
  'gsap': 'https://gsap.com',
  'motion-framer': 'https://motion.dev',
  'anime-js': 'https://animejs.com',
  'lenis': 'https://lenis.darkroom.engineering',
  'locomotive-scroll': 'https://scroll.locomotive.ca',
  'barba-js': 'https://barba.js.org',
  'aos': 'https://michalsnik.github.io/aos',
  'cal-com': 'https://cal.com',
  'dub-co': 'https://dub.co',
  'payload-cms': 'https://payloadcms.com',
  'penpot': 'https://penpot.app',
};

async function captureScreenshot(
  browser: Browser,
  id: string,
  url: string,
  viewport: { width: number; height: number },
  suffix: string = ''
): Promise<boolean> {
  const page = await browser.newPage();
  const filename = suffix ? `${id}-${suffix}.webp` : `${id}.webp`;
  const outputPath = path.join(CONFIG.outputDir, filename);

  try {
    await page.setViewportSize(viewport);
    
    // Navegar con timeout
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout,
    });

    // Esperar extra para animaciones
    await page.waitForTimeout(CONFIG.waitAfterLoad);

    // Cerrar modales/banners de cookies si existen
    try {
      const cookieBtn = await page.$('[class*="cookie"] button, [id*="cookie"] button, [class*="consent"] button');
      if (cookieBtn) await cookieBtn.click();
    } catch {
      // Ignorar si no hay banner
    }

    // Capturar
    await page.screenshot({
      path: outputPath,
      type: 'jpeg', // Playwright no soporta WebP directo, convertir después
      quality: CONFIG.quality,
      fullPage: false,
    });

    console.log(`  ✅ ${filename} (${viewport.width}x${viewport.height})`);
    return true;
  } catch (error) {
    console.log(`  ❌ ${filename}: ${(error as Error).message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function generatePlaceholder(id: string): Promise<void> {
  // Crear un placeholder SVG para proyectos sin demo
  const svg = `<svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#18181b"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" 
          font-family="system-ui" font-size="48" fill="#71717a">${id}</text>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
          font-family="system-ui" font-size="24" fill="#52525b">Screenshot pendiente</text>
  </svg>`;

  const outputPath = path.join(CONFIG.outputDir, `${id}.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`  📎 ${id}.svg (placeholder)`);
}

async function main() {
  // Parse args
  const args = process.argv.slice(2);
  const filterById = args.find(a => a.startsWith('--id='))?.split('=')[1];
  const filterByCat = args.find(a => a.startsWith('--category='))?.split('=')[1];

  // Asegurar directorio de salida
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  // Filtrar proyectos
  let projects = Object.entries(DEMO_URLS);
  if (filterById) {
    projects = projects.filter(([id]) => id === filterById);
  }
  // Si se filtró por categoría, se necesitaría el catálogo completo

  console.log(`\n🎯 Design Vault — Captura de Screenshots`);
  console.log(`   ${projects.length} proyectos a capturar\n`);

  const browser = await chromium.launch({ headless: true });
  let success = 0;
  let failed = 0;

  for (const [id, url] of projects) {
    console.log(`\n📸 ${id} → ${url}`);
    
    // Desktop
    const ok = await captureScreenshot(
      browser, id, url,
      CONFIG.viewports.desktop
    );
    
    if (ok) {
      // Mobile
      await captureScreenshot(
        browser, id, url,
        CONFIG.viewports.mobile,
        'mobile'
      );
      success++;
    } else {
      await generatePlaceholder(id);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Exitosos: ${success}`);
  console.log(`❌ Fallidos: ${failed}`);
  console.log(`📁 Output: ${CONFIG.outputDir}`);
  console.log(`${'='.repeat(50)}\n`);

  // TODO: Convertir JPEGs a WebP con sharp
  // import sharp from 'sharp';
  // const jpegFiles = fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.jpeg'));
  // for (const file of jpegFiles) {
  //   const input = path.join(CONFIG.outputDir, file);
  //   const output = input.replace('.jpeg', '.webp');
  //   await sharp(input).webp({ quality: CONFIG.quality }).toFile(output);
  //   fs.unlinkSync(input);
  // }
}

main().catch(console.error);
