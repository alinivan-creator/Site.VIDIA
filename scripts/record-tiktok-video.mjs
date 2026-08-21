/**
 * Înregistrează conversația, apoi lipește 7s de card publicitar (logo + text).
 * Rulează: npm run record:tiktok
 */
import { chromium } from "playwright";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { execSync } from "node:child_process";
import { copyFile, mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "img");
const OUT_MP4 = path.join(OUT_DIR, "vidia-tiktok-ad.mp4");
const TMP_DIR = path.join(ROOT, ".tiktok-record-tmp");
const URL = process.env.RECORD_URL ?? "http://127.0.0.1:4173/tiktok-ad";

const WIDTH = 1080;
const HEIGHT = 1920;
const BANNER_SEC = 7;
const MAX_MS = 45000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ffmpegBin() {
  return ffmpegInstaller.path.replace(/\\/g, "/");
}

function runFfmpeg(args) {
  execSync(`"${ffmpegBin()}" ${args}`, { stdio: "inherit" });
}

function probeDuration(file) {
  try {
    execSync(`"${ffmpegBin()}" -i "${file.replace(/\\/g, "/")}"`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (err) {
    const text = `${err.stderr || ""} ${err.message || ""}`;
    const match = text.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (!match) throw new Error(`Nu am putut citi durata video: ${text.slice(0, 200)}`);
    return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  }
  throw new Error("Nu am putut citi durata video.");
}

async function main() {
  console.log(`Înregistrare TikTok de la ${URL} …`);
  await mkdir(OUT_DIR, { recursive: true });
  await rm(TMP_DIR, { recursive: true, force: true });
  await mkdir(TMP_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });

  const warmup = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
  });
  const warmPage = await warmup.newPage();
  await warmPage.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await warmPage.waitForSelector(".booking-sim-frame", { timeout: 30_000 });
  await warmup.close();

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: TMP_DIR,
      size: { width: WIDTH, height: HEIGHT },
    },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(60_000);
  const gotoAt = Date.now();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForSelector(".booking-sim-frame", { timeout: 30_000 });

  console.log("Aștept primul mesaj …");
  await page.waitForFunction(
    () => document.documentElement.dataset.bookingSimStarted === "1",
    { timeout: 15_000 },
  );
  const startedAt = Date.now();
  const startOffsetSec = Math.max(0, (startedAt - gotoAt) / 1000 - 0.35);

  console.log("Conversație în curs …");
  await page.waitForSelector(".tiktok-ad-capture.is-banner", { timeout: MAX_MS });
  await page.waitForFunction(() => {
    const el = document.querySelector(".tiktok-ad-banner");
    return el && getComputedStyle(el).opacity === "1";
  });
  console.log(
    `Banner vizibil la ${((Date.now() - startedAt) / 1000).toFixed(1)}s — țin 1,2s …`,
  );
  await sleep(1200);

  const bannerPng = path.join(TMP_DIR, "banner.png");
  await page.screenshot({
    path: bannerPng,
    type: "png",
  });
  await copyFile(bannerPng, path.join(OUT_DIR, "vidia-tiktok-endcard.png"));

  const video = page.video();
  await context.close();
  await browser.close();
  if (!video) throw new Error("Nu s-a generat video.");
  const webmPath = await video.path();

  const talkMp4 = path.join(TMP_DIR, "talk.mp4").replace(/\\/g, "/");
  const stillMp4 = path.join(TMP_DIR, "banner.mp4").replace(/\\/g, "/");
  const listFile = path.join(TMP_DIR, "concat.txt");
  const webm = webmPath.replace(/\\/g, "/");
  const banner = bannerPng.replace(/\\/g, "/");
  const out = OUT_MP4.replace(/\\/g, "/");

  console.log("Encodare conversație …");
  runFfmpeg(
    `-y -ss ${startOffsetSec.toFixed(2)} -i "${webm}" -c:v libx264 -preset veryfast -pix_fmt yuv420p -an "${talkMp4}"`,
  );

  console.log("Encodare banner 7s …");
  runFfmpeg(
    `-y -loop 1 -t ${BANNER_SEC} -i "${banner}" -vf "scale=${WIDTH}:${HEIGHT}:flags=lanczos" -c:v libx264 -preset veryfast -pix_fmt yuv420p -r 25 -an "${stillMp4}"`,
  );

  const talkDur = probeDuration(talkMp4);
  const fadeAt = Math.max(0.2, talkDur - 0.7);
  console.log(`Tranziție fade la ${fadeAt.toFixed(2)}s …`);

  try {
    runFfmpeg(
      `-y -i "${talkMp4}" -i "${stillMp4}" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.7:offset=${fadeAt.toFixed(2)}" -c:v libx264 -preset veryfast -pix_fmt yuv420p -movflags +faststart -an "${out}"`,
    );
  } catch {
    console.log("xfade indisponibil — concat simplu.");
    runFfmpeg(
      `-y -i "${talkMp4}" -i "${stillMp4}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -preset veryfast -pix_fmt yuv420p -movflags +faststart -an "${out}"`,
    );
  }

  await rm(TMP_DIR, { recursive: true, force: true });

  const info = await stat(OUT_MP4);
  console.log(`\n✓ MP4 TikTok: ${OUT_MP4}`);
  console.log(`  ${WIDTH}×${HEIGHT} · ${(info.size / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
