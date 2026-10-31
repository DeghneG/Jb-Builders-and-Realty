// Re-encodes /public/images with mozjpeg (visually lossless, q88), caps long edge at 2400px,
// strips metadata, and only replaces a file when the result is smaller.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "public/images";
let before = 0;
let after = 0;

for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  const src = fs.readFileSync(p);
  before += src.length;
  const out = await sharp(src)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  if (out.length < src.length) {
    fs.writeFileSync(p, out);
    after += out.length;
  } else {
    after += src.length;
  }
}
console.log(`images: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
