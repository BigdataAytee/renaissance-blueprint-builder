/**
 * One-off image optimisation for src/assets.
 *
 * Converts every .jpg/.png under src/assets to WebP (quality 80), resizing to
 * sensible maximum widths, and rewrites the logo mark as a small transparent
 * WebP. Originals are copied to asset-backup/ (gitignored) before deletion.
 *
 * `sharp` is not a project dependency — install it just for this run:
 *   bun add -d sharp && bun scripts/optimize-images.mjs && bun remove sharp
 */
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH ?? "sharp");

const ASSETS = path.resolve("src/assets");
const BACKUP = path.resolve("asset-backup");

// Slide imagery is only ever shown in cards and carousels, so it can be smaller.
const maxWidthFor = (rel) =>
  rel.startsWith("service-slides/") || rel.startsWith("sector-slides/") ? 1000 : 1600;

async function* walk(dir, base = dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full, base);
    else yield path.relative(base, full);
  }
}

const bytes = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

let before = 0;
let after = 0;
let converted = 0;

for await (const rel of walk(ASSETS)) {
  const ext = path.extname(rel).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const src = path.join(ASSETS, rel);
  const out = path.join(ASSETS, rel.slice(0, -ext.length) + ".webp");
  const backup = path.join(BACKUP, rel);

  await fs.mkdir(path.dirname(backup), { recursive: true });
  await fs.copyFile(src, backup);

  const stat = await fs.stat(src);
  before += stat.size;

  const isLogo = rel === "logo-mark.png";
  const pipeline = sharp(src).resize({
    width: isLogo ? 256 : maxWidthFor(rel),
    withoutEnlargement: true,
  });

  await pipeline.webp(isLogo ? { quality: 90, alphaQuality: 100 } : { quality: 80 }).toFile(out);

  after += (await fs.stat(out)).size;
  await fs.rm(src);
  converted += 1;
  console.log(`${rel} → ${path.basename(out)}`);
}

console.log(`\n${converted} images converted`);
console.log(`before: ${bytes(before)}  after: ${bytes(after)}`);
