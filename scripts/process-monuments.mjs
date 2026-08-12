/**
 * One-off: photo → pure white background + VIDIA-red detailed illustration.
 * Background removal via edge flood-fill (sky/lawn), then red duotone.
 * Usage: node scripts/process-monuments.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, "..", "public", "img");

const RED = { r: 0xe1, g: 0x06, b: 0x00 };
const SHADOW = { r: 0x5c, g: 0x02, b: 0x00 };

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function colorDist(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function isSkyLike(r, g, b) {
  const L = luminance(r, g, b);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (min > 205 && max - min < 50) return true;
  // Pale haze / soft cloud
  if (L > 155 && max - min < 48 && b >= r - 8) return true;
  // Blue / cyan sky — including deep navy (Eiffel top: ~27,50,81)
  const blueIsMax = b >= g && b > r;
  const blueLead = b - r;
  if (blueIsMax && blueLead >= 18 && b >= 45 && L < 210) return true;
  if (b >= 90 && b >= g - 12 && b > r + 8 && L > 55) return true;
  if (b > 130 && b >= r && blueLead > 16) return true;
  return false;
}

function isLawnLike(r, g, b) {
  const L = luminance(r, g, b);
  if (g > 48 && g > r * 1.08 && g > b * 1.05) return true;
  if (g >= r && g >= b && (g - Math.min(r, b)) > 14 && L < 200 && g > 40) {
    return true;
  }
  return false;
}

function toRedIllustration(r, g, b) {
  let L = luminance(r, g, b) / 255;
  L = Math.pow(Math.min(1, Math.max(0, (L - 0.04) / 0.92)), 0.9);

  if (L > 0.93) return [255, 255, 255];

  let outR;
  let outG;
  let outB;
  if (L < 0.42) {
    const t = L / 0.42;
    outR = lerp(SHADOW.r, RED.r, t);
    outG = lerp(SHADOW.g, RED.g, t);
    outB = lerp(SHADOW.b, RED.b, t);
  } else {
    const t = (L - 0.42) / 0.58;
    outR = lerp(RED.r, 255, t);
    outG = lerp(RED.g, 255, t);
    outB = lerp(RED.b, 255, t);
  }
  return [Math.round(outR), Math.round(outG), Math.round(outB)];
}

/**
 * Flood-fill from image borders: mark connected sky/lawn as background.
 * Seeds = border pixels that look like sky/lawn, plus aggressive top band.
 */
function buildBackgroundMask(data, width, height, channels, mode) {
  const n = width * height;
  const mask = new Uint8Array(n); // 1 = background
  const queue = new Int32Array(n);
  let qh = 0;
  let qt = 0;

  const trySeed = (x, y) => {
    const idx = y * width + x;
    if (mask[idx]) return;
    const i = idx * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const ok =
      isSkyLike(r, g, b) || (mode === "eiffel" && isLawnLike(r, g, b));
    if (!ok) return;
    mask[idx] = 1;
    queue[qt++] = idx;
  };

  // Seed entire border
  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  // Extra: top band any sky-like pixel (catches enclosed sky pockets at top)
  const topBand = Math.floor(height * (mode === "eiffel" ? 0.28 : 0.18));
  for (let y = 0; y < topBand; y++) {
    for (let x = 0; x < width; x++) {
      trySeed(x, y);
    }
  }

  // For Eiffel: also seed bottom lawn band
  if (mode === "eiffel") {
    const y0 = Math.floor(height * 0.72);
    for (let y = y0; y < height; y++) {
      for (let x = 0; x < width; x += 2) {
        trySeed(x, y);
      }
    }
  }

  // Sample average of seeded border colors for chroma continuity
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let sc = 0;
  for (let i = 0; i < qt; i++) {
    const idx = queue[i];
    const p = idx * channels;
    sr += data[p];
    sg += data[p + 1];
    sb += data[p + 2];
    sc++;
  }
  const avgR = sc ? sr / sc : 120;
  const avgG = sc ? sg / sc : 160;
  const avgB = sc ? sb / sc : 210;

  const threshold = mode === "eiffel" ? 78 : 72;

  while (qh < qt) {
    const idx = queue[qh++];
    const x = idx % width;
    const y = (idx - x) / width;

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const nidx = ny * width + nx;
      if (mask[nidx]) continue;
      const p = nidx * channels;
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];

      const sky = isSkyLike(r, g, b);
      const lawn = mode === "eiffel" && isLawnLike(r, g, b);
      const nearAvg = colorDist(r, g, b, avgR, avgG, avgB) < threshold;
      // Bright haze / pale distance
      const pale =
        luminance(r, g, b) > 185 && Math.max(r, g, b) - Math.min(r, g, b) < 45;

      if (sky || lawn || (nearAvg && luminance(r, g, b) > 95) || pale) {
        // Don't eat into dark monument structure
        const L = luminance(r, g, b);
        if (L < 55 && !sky && !lawn) continue;
        // Protect saturated warm stone / metal (low blue relative)
        if (r > b + 35 && r > g && L < 170 && !lawn) continue;

        mask[nidx] = 1;
        queue[qt++] = nidx;
      }
    }
  }

  // Dilate mask slightly to clear sky fringes around towers
  const dilate = new Uint8Array(n);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (mask[idx]) {
        dilate[idx] = 1;
        continue;
      }
      if (
        mask[idx - 1] ||
        mask[idx + 1] ||
        mask[idx - width] ||
        mask[idx + width]
      ) {
        const p = idx * channels;
        const L = luminance(data[p], data[p + 1], data[p + 2]);
        // Only dilate into light fringe, not dark structure
        if (L > 140 || isSkyLike(data[p], data[p + 1], data[p + 2])) {
          dilate[idx] = 1;
        }
      }
    }
  }
  return dilate;
}

async function processOne(inputName, outputName, mode) {
  const input = path.join(imgDir, inputName);
  const output = path.join(imgDir, outputName);

  const { data, info } = await sharp(input)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const mask = buildBackgroundMask(data, width, height, channels, mode);
  const out = Buffer.alloc(width * height * 3);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * channels;
      const o = idx * 3;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (mask[idx]) {
        out[o] = 255;
        out[o + 1] = 255;
        out[o + 2] = 255;
        continue;
      }

      // Soften residual blue fringe toward white
      const blueFringe = smoothstep(
        0,
        1,
        (b - Math.max(r, g) + 8) / 40,
      ) * smoothstep(100, 175, luminance(r, g, b));

      const [rr, gg, bb] = toRedIllustration(r, g, b);
      out[o] = Math.round(lerp(rr, 255, blueFringe));
      out[o + 1] = Math.round(lerp(gg, 255, blueFringe));
      out[o + 2] = Math.round(lerp(bb, 255, blueFringe));
    }
  }

  await sharp(out, { raw: { width, height, channels: 3 } })
    .png({ compressionLevel: 9 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`OK ${outputName} ${meta.width}x${meta.height} (${mode})`);
}

await processOne("big-ben.jpg", "big-ben-red.png", "bigben");
await processOne("eiffel-tower.jpg", "eiffel-tower-red.png", "eiffel");
console.log("DONE");
