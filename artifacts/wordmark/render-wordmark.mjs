import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire('C:/Users/chris/Onéra/package.json');
const sharp = require('sharp');
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(await readFile(path.join(here, 'wordmark-spec.json'), 'utf8'));

for (const name of Object.keys(spec.variants)) {
  const output = path.join(here, `${name}.png`);
  await sharp(path.join(here, `${name}.svg`), { density: 120 })
    .resize({ width: 3000 }).withMetadata({ density: 300 }).png().toFile(output);
  const metadata = await sharp(output).metadata();
  const stats = await sharp(output).stats();
  if (metadata.width !== 3000 || !metadata.hasAlpha || stats.isOpaque) {
    throw new Error(`PNG failed dimension/transparency validation: ${name}`);
  }
  console.log(JSON.stringify({ file: output, width: metadata.width, height: metadata.height, transparent: !stats.isOpaque }));
}

// Compare the vector outlines against the actual browser-rendered website font.
const font = (await readFile(spec.fontAsset)).toString('base64');
const svg = await readFile(path.join(here, 'onera-wordmark.svg'), 'utf8');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head><style>@font-face{font-family:OneraWebsite;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300;font-style:normal}body{margin:0}</style></head><body></body></html>`);
  const reference = await page.evaluate(async ({ spec }) => {
    await document.fonts.load('300 1000px OneraWebsite', spec.wordmark);
    if (!document.fonts.check('300 1000px OneraWebsite', spec.wordmark)) throw new Error('Font failed to load');
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(spec.viewBox[2]);
    canvas.height = Math.ceil(spec.viewBox[3]);
    const ctx = canvas.getContext('2d');
    ctx.font = '300 1000px OneraWebsite';
    ctx.fontKerning = 'normal';
    ctx.letterSpacing = '120px';
    ctx.fillStyle = '#413E07';
    ctx.fillText(spec.wordmark, 64 - spec.inkBounds.left, 64 + spec.inkBounds.top);
    const m = ctx.measureText(spec.wordmark);
    return { png: canvas.toDataURL().split(',')[1], measuredInkWidth: m.actualBoundingBoxLeft + m.actualBoundingBoxRight };
  }, { spec });
  const vectorRaster = await sharp(Buffer.from(svg)).resize(Math.ceil(spec.viewBox[2]), Math.ceil(spec.viewBox[3]), { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const browserRaster = await sharp(Buffer.from(reference.png, 'base64')).ensureAlpha().raw().toBuffer();
  let intersection = 0;
  let union = 0;
  for (let i = 3; i < vectorRaster.length; i += 4) {
    const a = vectorRaster[i] > 127;
    const b = browserRaster[i] > 127;
    if (a && b) intersection++;
    if (a || b) union++;
  }
  const overlap = intersection / union;
  if (overlap < 0.95) throw new Error(`Outlined wordmark differs from browser reference: overlap ${overlap}`);
  await writeFile(path.join(here, 'wordmark-validation.json'), JSON.stringify({ browserReferenceInkWidth: reference.measuredInkWidth, outlineInkWidth: spec.inkBounds.right - spec.inkBounds.left, inkOverlap: overlap, svgContainsTextElement: /<text\b/.test(svg), pngWidth: 3000, transparent: true }, null, 2) + '\n');
  console.log(JSON.stringify({ browserReferenceInkWidth: reference.measuredInkWidth, inkOverlap: overlap }));
} finally {
  await browser.close();
}

// A compact color proof for discussing dark mode; no website files are changed.
const logoContent = svg.match(/<path[\s\S]*?\/>/)[0];
const logoWidth = 610;
const logoScale = logoWidth / spec.viewBox[2];
const logoHeight = spec.viewBox[3] * logoScale;
const panels = [
  { x: 0, bg: '#FFFFFF', text: '#413E07', label: 'CURRENT LIGHT', swatches: ['#413E07', '#FFFFFF', '#F7F6F2'] },
  { x: 800, bg: '#171812', text: '#F3F0E7', label: 'PROPOSED DARK', swatches: ['#171812', '#21231B', '#F3F0E7', '#B4B078'] },
];
const proof = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="520" viewBox="0 0 1600 520">
${panels.map(({ x, bg, text, label, swatches }) => `<g transform="translate(${x},0)">
<rect width="800" height="520" fill="${bg}"/>
<text x="64" y="64" fill="${text}" font-family="Arial,sans-serif" font-size="15" letter-spacing="3">${label}</text>
<g transform="translate(95 ${200 - logoHeight / 2}) scale(${logoScale})">${logoContent.replace('fill="#413E07"', `fill="${text}"`)}</g>
<line x1="64" y1="330" x2="736" y2="330" stroke="${text}" stroke-opacity="0.2"/>
${swatches.map((color, i) => `<rect x="${64 + i * 170}" y="370" width="142" height="45" fill="${color}" stroke="${text}" stroke-opacity="0.3"/><text x="${64 + i * 170}" y="448" fill="${text}" font-family="Arial,sans-serif" font-size="17">${color}</text>`).join('')}
</g>`).join('')}
</svg>`;
await sharp(Buffer.from(proof)).png().toFile(path.join(here, 'onera-light-dark-proof.png'));
