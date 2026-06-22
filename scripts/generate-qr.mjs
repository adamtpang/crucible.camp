/**
 * Generate QR codes for the owned short links.
 *   npm run qr            # uses SITE_URL or https://crucible.camp
 *   SITE_URL=https://crucible.camp npm run qr
 *
 * Outputs PNG + SVG to public/qr/. Print door.png for the on-site walk-in QR;
 * share rsvp.png anywhere. Both encode the tracked redirect routes.
 *
 * Requires the `qrcode` dev dependency (already in package.json).
 */
import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = (process.env.SITE_URL || "https://crucible.camp").replace(/\/+$/, "");

const targets = {
  door: `${base}/door`,
  rsvp: `${base}/rsvp`,
};

const outDir = "public/qr";
const color = { dark: "#0a0c11", light: "#ffffff" };

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(targets)) {
  await QRCode.toFile(path.join(outDir, `${name}.png`), url, {
    width: 1024,
    margin: 2,
    color,
    errorCorrectionLevel: "M",
  });
  const svg = await QRCode.toString(url, { type: "svg", margin: 2, color });
  await writeFile(path.join(outDir, `${name}.svg`), svg);
  console.log(`✓ ${name.padEnd(5)} → ${url}   (public/qr/${name}.png · ${name}.svg)`);
}

console.log("\nDone. Print public/qr/door.png at the door; share /rsvp everywhere.");
