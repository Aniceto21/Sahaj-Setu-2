import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.resolve('public/icon.svg'));

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public/pwa-192x192.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public/pwa-512x512.png'));

  // Maskable icon with 15% safe padding
  await sharp(svgBuffer)
    .resize(400, 400)
    .extend({
      top: 56,
      bottom: 56,
      left: 56,
      right: 56,
      background: '#042f2e'
    })
    .png()
    .toFile(path.resolve('public/pwa-maskable-512x512.png'));

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public/apple-touch-icon.png'));

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('public/favicon.ico'));

  console.log('Icons generated successfully!');
}

generateIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
