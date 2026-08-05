import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:4399/sfdy-website';
const OUT  = '/Users/pbau3r/DevWorks/Websites/SFDY/screenshots/review';
mkdirSync(OUT, { recursive: true });

const pages = [
  { name: '01-home-full',      url: '/' },
  { name: '02-news',           url: '/news' },
  { name: '03-careers',        url: '/careers' },
  { name: '04-investors',      url: '/investors' },
];

const browser = await chromium.launch();
const ctx     = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p.url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/${p.name}.png`, fullPage: true });
  console.log(`✓ ${p.name}`);
  await page.close();
}

await browser.close();
console.log('Done →', OUT);
