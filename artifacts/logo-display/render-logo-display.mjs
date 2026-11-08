import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('C:/Users/chris/Onéra/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const here = path.dirname(fileURLToPath(import.meta.url));
const fontPath = path.resolve(here, '../../web-app-onera/dist/_next/static/media/01e4147cff8141ee-s.p.3huc2loe0ie8a.woff2');
const font = (await readFile(fontPath)).toString('base64');
const palette = [
  { background: '#FFFFFF', foreground: '#413E07' },
  { background: '#413E07', foreground: '#FFFFFF' },
  { background: '#D8D0E6', foreground: '#413E07' },
  { background: '#F7F6F2', foreground: '#262521' },
  { background: '#262521', foreground: '#F7F6F2' },
  { background: '#BCC5B2', foreground: '#294638' },
  { background: '#663A45', foreground: '#F1E9D9' },
  { background: '#E8CFC7', foreground: '#663A45' },
  { background: '#B66D52', foreground: '#FFF5E7' },
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: 'OneraWebsite'; font-style: normal; font-weight: 300 700; src: url(data:font/woff2;base64,${font}) format('woff2'); }
    html,body { margin: 0; padding: 0; background: white; }
    canvas { display: block; width: 1200px; height: 1200px; }
  </style></head><body><canvas width="3000" height="3000" aria-label="Onéra wordmark in nine color combinations"></canvas></body></html>`);
  const result = await page.evaluate(async ({ palette }) => {
    await document.fonts.load('300 220px OneraWebsite', 'Onéra');
    await document.fonts.ready;
    if (!document.fonts.check('300 220px OneraWebsite', 'Onéra')) throw new Error('Website font did not load.');
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    if (!('letterSpacing' in context)) throw new Error('Canvas letter-spacing is unavailable.');
    const text = 'Onéra';
    const fontSize = 220;
    context.font = `300 ${fontSize}px OneraWebsite`;
    context.fontKerning = 'auto';
    context.letterSpacing = `${fontSize * 0.12}px`;
    context.textBaseline = 'alphabetic';
    const metrics = context.measureText(text);
    const bounds = [];
    for (let index = 0; index < palette.length; index++) {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const cellX = col * 1000;
      const cellY = row * 1000;
      context.fillStyle = palette[index].background;
      context.fillRect(cellX, cellY, 1000, 1000);
      context.fillStyle = palette[index].foreground;
      const x = cellX + 500 + (metrics.actualBoundingBoxLeft - metrics.actualBoundingBoxRight) / 2;
      const y = cellY + 500 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
      context.fillText(text, x, y);
      bounds.push({
        x: x - metrics.actualBoundingBoxLeft,
        y: y - metrics.actualBoundingBoxAscent,
        width: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
      });
    }
    return { png: canvas.toDataURL('image/png').split(',')[1], bounds, fontSize, tracking: fontSize * .12 };
  }, { palette });
  const output = path.join(here, 'onera-logo-display-3x3.png');
  await sharp(Buffer.from(result.png, 'base64')).withMetadata({ density: 300 }).png().toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.width !== 3000 || metadata.height !== 3000) throw new Error('Output dimensions are incorrect.');
  for (let i = 0; i < result.bounds.length; i++) {
    const bounds = result.bounds[i];
    const centerX = i % 3 * 1000 + 500;
    const centerY = Math.floor(i / 3) * 1000 + 500;
    if (Math.abs(bounds.x + bounds.width / 2 - centerX) > .1 || Math.abs(bounds.y + bounds.height / 2 - centerY) > .1) throw new Error(`Panel ${i + 1} is not centered.`);
    if (bounds.width > 820 || bounds.height > 600) throw new Error(`Panel ${i + 1} exceeds its safe area.`);
  }
  await writeFile(path.join(here, 'logo-display-spec.json'), JSON.stringify({
    source: 'Local Onéra website snapshot',
    fontAsset: fontPath,
    wordmark: 'Onéra',
    fontFamily: 'Cormorant Garamond',
    fontWeight: 300,
    letterSpacing: '.12em',
    dimensions: [metadata.width, metadata.height],
    density: metadata.density,
    layout: '3 columns × 3 rows, no gutters, visually centered identical wordmarks',
    palette,
    inkBounds: result.bounds,
  }, null, 2) + '\n');
  console.log(JSON.stringify({ output, width: metadata.width, height: metadata.height, density: metadata.density, panels: palette.length, font: 'Cormorant Garamond 300', tracking: '.12em', inkWidth: result.bounds[0].width }));
} finally {
  await browser.close();
}
