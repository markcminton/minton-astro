/**
 * Watermark + resize script for astrophotography portfolio
 *
 * Reads:   public/bestPics/*
 * Writes:  public/bestPics-web/*  (resized to max 2400px wide, © watermarked)
 *
 * Run once before deploying:
 *   npm install --save-dev sharp
 *   node scripts/watermark.mjs
 *
 * The originals in public/bestPics/ stay on your machine (gitignored).
 * The processed copies in public/bestPics-web/ go into git and deploy normally.
 * Update the `file` field in src/data/photos.js to use 'bestPics-web/filename'.
 */

import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const INPUT_DIR  = path.join(__dirname, '../public/bestPics')
const OUTPUT_DIR = path.join(__dirname, '../public/bestPics-web')
const MAX_WIDTH  = 2400   // cap resolution — still high quality, much smaller file
const WATERMARK  = '© Mark Minton'

// ── SVG watermark overlay ────────────────────────────────────────────────────
// Positioned bottom-right, semi-transparent white text with a subtle drop shadow.
function makeWatermarkSvg(width) {
  const fontSize  = Math.max(20, Math.round(width * 0.018))  // ~1.8% of image width
  const padding   = Math.round(fontSize * 1.4)
  const textWidth = Math.round(WATERMARK.length * fontSize * 0.6)
  const svgWidth  = textWidth + padding * 2
  const svgHeight = Math.round(fontSize * 2.4)

  return Buffer.from(`
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1.5" flood-color="black" flood-opacity="0.6"/>
        </filter>
      </defs>
      <text
        x="${padding}"
        y="${svgHeight - Math.round(fontSize * 0.6)}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        fill="rgba(255,255,255,0.55)"
        filter="url(#shadow)"
        letter-spacing="1"
      >${WATERMARK}</text>
    </svg>
  `)
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
    console.log(`Created output directory: ${OUTPUT_DIR}`)
  }

  const files = await readdir(INPUT_DIR)
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  if (images.length === 0) {
    console.log('No images found in public/bestPics/')
    return
  }

  console.log(`Processing ${images.length} image(s)...\n`)

  for (const filename of images) {
    const inputPath  = path.join(INPUT_DIR, filename)
    const outputPath = path.join(OUTPUT_DIR, filename)

    const image    = sharp(inputPath)
    const metadata = await image.metadata()
    const srcWidth = metadata.width ?? MAX_WIDTH

    // Resize: shrink if wider than MAX_WIDTH, never upscale
    const targetWidth = Math.min(srcWidth, MAX_WIDTH)
    const resized = image.resize(targetWidth, null, {
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })

    // Build watermark sized for the output image
    const wmSvg    = makeWatermarkSvg(targetWidth)
    const wmMeta   = await sharp(wmSvg).metadata()
    const wmWidth  = wmMeta.width  ?? 200
    const wmHeight = wmMeta.height ?? 40

    // Composite watermark at bottom-right with a small margin
    const margin = Math.round(targetWidth * 0.015)
    const outputMeta = await resized.clone().toBuffer({ resolveWithObject: true })
    const outputHeight = outputMeta.info.height

    await resized
      .composite([{
        input: wmSvg,
        left: targetWidth  - wmWidth  - margin,
        top:  outputHeight - wmHeight - margin,
        blend: 'over',
      }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outputPath)

    const sizeMB = ((await sharp(outputPath).metadata()).size ?? 0) / 1_000_000
    console.log(`  ✓ ${filename.padEnd(35)} ${srcWidth}px → ${targetWidth}px  (~${sizeMB.toFixed(1)} MB)`)
  }

  console.log('\nDone. Files written to public/bestPics-web/')
  console.log('\nNext steps:')
  console.log('  1. Update src/data/photos.js — change each `file` value from')
  console.log('     "filename.jpg"  →  "bestPics-web/filename.jpg"')
  console.log('  2. git add public/bestPics-web/ src/data/photos.js')
  console.log('  3. git commit -m "Add watermarked web images"')
  console.log('  4. git push  →  Vercel auto-deploys')
}

run().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
