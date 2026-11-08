import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire('C:/Users/chris/Onéra/package.json');
const sharp = require('sharp');

const here = path.dirname(fileURLToPath(import.meta.url));
const wordmarkPath = path.resolve(here, '..', 'wordmark', 'onera-wordmark-white.svg');
const wordmarkSource = await readFile(wordmarkPath, 'utf8');
const masterSize = 2048;
const wordmarkWidthPercent = 70;

const platforms = [
  { slug: 'instagram', size: 1080 },
  { slug: 'threads', size: 1080 },
  { slug: 'facebook', size: 1024 },
  { slug: 'pinterest', size: 1000 },
  { slug: 'linkedin', size: 800 },
  { slug: 'youtube', size: 800 },
  { slug: 'tiktok', size: 720 },
  { slug: 'x', size: 400 },
];

const palettes = [
  { theme: 'light', slug: 'white-olive', label: 'White / Olive', background: '#FFFFFF', foreground: '#413E07' },
  { theme: 'light', slug: 'alabaster-charcoal', label: 'Alabaster / Charcoal', background: '#F7F6F2', foreground: '#262521' },
  { theme: 'light', slug: 'lavender-olive', label: 'Lavender / Olive', background: '#D8D0E6', foreground: '#413E07' },
  { theme: 'light', slug: 'sage-forest', label: 'Sage / Forest', background: '#BCC5B2', foreground: '#294638' },
  { theme: 'light', slug: 'blush-plum', label: 'Blush / Plum', background: '#E8CFC7', foreground: '#663A45' },
  { theme: 'dark', slug: 'black-white', label: 'Black / White', background: '#000000', foreground: '#FFFFFF' },
  { theme: 'dark', slug: 'olive-white', label: 'Olive / White', background: '#413E07', foreground: '#FFFFFF' },
  { theme: 'dark', slug: 'charcoal-alabaster', label: 'Charcoal / Alabaster', background: '#262521', foreground: '#F7F6F2' },
  { theme: 'dark', slug: 'plum-parchment', label: 'Plum / Parchment', background: '#663A45', foreground: '#F1E9D9' },
  { theme: 'dark', slug: 'terracotta-cream', label: 'Terracotta / Cream', background: '#B66D52', foreground: '#FFF5E7' },
];

function channelToLinear(value) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  const [red, green, blue] = channels.map(channelToLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(a, b) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function hexToRgb(hex) {
  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

async function renderMaster(palette) {
  const circle = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${masterSize}" height="${masterSize}" viewBox="0 0 ${masterSize} ${masterSize}">
      <circle cx="${masterSize / 2}" cy="${masterSize / 2}" r="${masterSize / 2}" fill="${palette.background}"/>
    </svg>
  `);
  const recoloredWordmark = wordmarkSource.replaceAll('#FFFFFF', palette.foreground);
  const wordmark = await sharp(Buffer.from(recoloredWordmark), { density: 300 })
    .resize({ width: Math.round(masterSize * wordmarkWidthPercent / 100) })
    .png()
    .toBuffer();
  const wordmarkMeta = await sharp(wordmark).metadata();

  return sharp({
    create: {
      width: masterSize,
      height: masterSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: circle, left: 0, top: 0 },
      {
        input: wordmark,
        left: Math.round((masterSize - wordmarkMeta.width) / 2),
        top: Math.round((masterSize - wordmarkMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function validateOutput(output, size, palette) {
  const metadata = await sharp(output).metadata();
  const stats = await sharp(output).stats();
  const corner = await sharp(output).extract({ left: 0, top: 0, width: 1, height: 1 }).ensureAlpha().raw().toBuffer();
  const backgroundSample = await sharp(output)
    .extract({ left: Math.floor(size / 2), top: Math.floor(size * 0.18), width: 1, height: 1 })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const expected = hexToRgb(palette.background);

  if (metadata.width !== size || metadata.height !== size || !metadata.hasAlpha || stats.isOpaque) {
    throw new Error(`Dimension/alpha validation failed for ${output}`);
  }
  if (corner[3] !== 0) {
    throw new Error(`Transparent-corner validation failed for ${output}`);
  }
  if (expected.some((channel, index) => Math.abs(backgroundSample[index] - channel) > 2) || backgroundSample[3] < 253) {
    throw new Error(`Circle-color validation failed for ${output}`);
  }
}

await mkdir(here, { recursive: true });

const masters = new Map();
const manifest = {
  status: 'Exploratory palette set; color combinations are not approved brand standards.',
  structure: '<platform>/<theme>/<platform-specific PNG>',
  wordmarkSource: path.relative(here, wordmarkPath).replaceAll('\\', '/'),
  wordmarkWidthPercent,
  platforms,
  palettes: palettes.map((palette) => ({
    ...palette,
    contrastRatio: Number(contrastRatio(palette.background, palette.foreground).toFixed(2)),
  })),
  files: [],
};

for (const palette of palettes) {
  const master = await renderMaster(palette);
  masters.set(`${palette.theme}/${palette.slug}`, master);

  const masterDir = path.join(here, '_masters', palette.theme);
  await mkdir(masterDir, { recursive: true });
  const masterName = `onera-profile-master-${palette.theme}-${palette.slug}-${masterSize}.png`;
  const masterOutput = path.join(masterDir, masterName);
  await sharp(master).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(masterOutput);
  await validateOutput(masterOutput, masterSize, palette);
  manifest.files.push(path.relative(here, masterOutput).replaceAll('\\', '/'));

  for (const platform of platforms) {
    const outputDir = path.join(here, platform.slug, palette.theme);
    await mkdir(outputDir, { recursive: true });
    const name = `onera-profile-${platform.slug}-${palette.theme}-${palette.slug}-${platform.size}.png`;
    const output = path.join(outputDir, name);
    await sharp(master)
      .resize(platform.size, platform.size, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(output);
    await validateOutput(output, platform.size, palette);
    manifest.files.push(path.relative(here, output).replaceAll('\\', '/'));
  }
  console.log(`${palette.theme}/${palette.slug}: master + ${platforms.length} platform exports`);
}

const proofWidth = 2200;
const proofHeight = 1160;
const proofSize = 300;
const proofComposites = [];
const proofText = [];
for (let index = 0; index < palettes.length; index += 1) {
  const palette = palettes[index];
  const column = index % 5;
  const row = Math.floor(index / 5);
  const left = 80 + column * 420;
  const top = 150 + row * 500;
  const preview = await sharp(masters.get(`${palette.theme}/${palette.slug}`))
    .resize(proofSize, proofSize, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  proofComposites.push({ input: preview, left, top });
  proofText.push(`<text class="name" x="${left}" y="${top + 346}">${palette.label}</text>`);
  proofText.push(`<text class="hex" x="${left}" y="${top + 376}">${palette.background} · ${palette.foreground}</text>`);
}
const proofOverlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${proofWidth}" height="${proofHeight}" viewBox="0 0 ${proofWidth} ${proofHeight}">
    <style>
      .title { font: 600 23px Arial, sans-serif; letter-spacing: 5px; fill: #413E07; }
      .theme { font: 600 17px Arial, sans-serif; letter-spacing: 3px; fill: #6B6957; }
      .name { font: 600 20px Arial, sans-serif; fill: #262521; }
      .hex { font: 400 17px Arial, sans-serif; fill: #6B6957; }
      .note { font: 400 16px Arial, sans-serif; fill: #6B6957; }
    </style>
    <text class="title" x="80" y="62">ONÉRA PROFILE PHOTO · COLOR STUDY</text>
    <text class="theme" x="80" y="114">LIGHT THEMES</text>
    <text class="theme" x="80" y="614">DARK THEMES</text>
    ${proofText.join('\n')}
    <text class="note" x="80" y="1120">Exploratory palette — identical color combinations are exported for every platform.</text>
  </svg>
`);
const proofDir = path.join(here, '_proofs');
await mkdir(proofDir, { recursive: true });
const proofOutput = path.join(proofDir, 'onera-profile-color-study.png');
await sharp({
  create: {
    width: proofWidth,
    height: proofHeight,
    channels: 4,
    background: '#DEDCD4',
  },
})
  .composite([...proofComposites, { input: proofOverlay, left: 0, top: 0 }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(proofOutput);

manifest.proof = path.relative(here, proofOutput).replaceAll('\\', '/');
manifest.totalUploadFiles = platforms.length * palettes.length;
manifest.totalMasterFiles = palettes.length;
await writeFile(path.join(here, 'profile-photo-validation.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Validated ${manifest.totalUploadFiles} platform files, ${manifest.totalMasterFiles} masters, and 1 color proof.`);

