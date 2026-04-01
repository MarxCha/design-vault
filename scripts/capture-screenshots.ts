/**
 * Design Vault — Screenshot Capture Pipeline
 *
 * Usa Playwright + Sharp para capturar screenshots WebP optimizados.
 *
 * Uso:
 *   npx tsx scripts/capture-screenshots.ts
 *   npx tsx scripts/capture-screenshots.ts --id=magic-ui
 */

import { chromium, type Browser } from 'playwright';
import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

const CONFIG = {
  outputDir: path.resolve(__dirname, '../public/screenshots'),
  viewports: {
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
  },
  timeout: 30_000,
  waitAfterLoad: 3_000,
  webpQuality: 82,
};

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

async function captureAndConvert(
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
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout,
    });
    await page.waitForTimeout(CONFIG.waitAfterLoad);

    // Dismiss cookie banners
    try {
      const cookieBtn = await page.$('[class*="cookie"] button, [id*="cookie"] button, [class*="consent"] button');
      if (cookieBtn) await cookieBtn.click();
      await page.waitForTimeout(500);
    } catch {}

    // Capture as PNG buffer, convert to WebP with sharp
    const buffer = await page.screenshot({ type: 'png', fullPage: false });
    await sharp(buffer)
      .webp({ quality: CONFIG.webpQuality })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKb = (stats.size / 1024).toFixed(0);
    console.log(`  ✅ ${filename} (${viewport.width}x${viewport.height}, ${sizeKb}KB)`);
    return true;
  } catch (error) {
    console.log(`  ❌ ${filename}: ${(error as Error).message.slice(0, 80)}`);
    return false;
  } finally {
    await page.close();
  }
}

function generatePlaceholder(id: string, color: string = '#2563eb'): void {
  const svg = `<svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="100%" stop-color="#18181b"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="720" cy="400" r="120" fill="${color}" opacity="0.1"/>
    <text x="720" y="420" dominant-baseline="middle" text-anchor="middle"
          font-family="system-ui" font-size="36" font-weight="600" fill="#fafafa">${id}</text>
    <text x="720" y="470" dominant-baseline="middle" text-anchor="middle"
          font-family="system-ui" font-size="18" fill="#71717a">design-vault.vercel.app</text>
  </svg>`;

  const outputPath = path.join(CONFIG.outputDir, `${id}-placeholder.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`  📎 ${id}-placeholder.svg`);
}

async function main() {
  const args = process.argv.slice(2);
  const filterById = args.find((a) => a.startsWith('--id='))?.split('=')[1];

  fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  let projects = Object.entries(DEMO_URLS);
  if (filterById) {
    projects = projects.filter(([id]) => id === filterById);
  }

  console.log(`\n🎯 Design Vault — Screenshot Pipeline`);
  console.log(`   ${projects.length} proyectos a capturar\n`);

  const browser = await chromium.launch({ headless: true });
  let success = 0;
  let failed = 0;

  for (const [id, url] of projects) {
    console.log(`\n📸 ${id} → ${url}`);

    const ok = await captureAndConvert(browser, id, url, CONFIG.viewports.desktop);

    if (ok) {
      await captureAndConvert(browser, id, url, CONFIG.viewports.mobile, 'mobile');
      success++;
    } else {
      generatePlaceholder(id);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ Exitosos: ${success} (${success * 2} archivos)`);
  console.log(`❌ Fallidos: ${failed}`);
  console.log(`📁 Output: ${CONFIG.outputDir}`);
  console.log(`${'═'.repeat(50)}\n`);
}

main().catch(console.error);
