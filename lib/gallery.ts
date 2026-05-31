import fs from "fs";
import path from "path";

export interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
  width: number;
  height: number;
}

const GALLERY_DIR = path.join(process.cwd(), "public", "photo-gallery");
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

function filenameToAlt(filename: string): string {
  const name = path.parse(filename).name;
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getImageDimensions(filePath: string): { width: number; height: number } {
  try {
    const buffer = fs.readFileSync(filePath);

    if (buffer[0] === 0x89 && buffer[1] === 0x50) {
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) break;
        const marker = buffer[offset + 1];
        if (marker === 0xc0 || marker === 0xc2) {
          return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
        }
        const len = buffer.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    }

    if (
      buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
    ) {
      const chunkHeader = buffer.toString("ascii", 12, 16);
      if (chunkHeader === "VP8X") {
        const w = buffer.readUIntLE(24, 3) + 1;
        const h = buffer.readUIntLE(27, 3) + 1;
        return { width: w, height: h };
      } else if (chunkHeader === "VP8L") {
        if (buffer[20] === 0x2f) {
          const val = buffer.readUInt32LE(21);
          const w = (val & 0x3fff) + 1;
          const h = ((val >> 14) & 0x3fff) + 1;
          return { width: w, height: h };
        }
      } else if (chunkHeader === "VP8 ") {
        if (buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) {
          const w = buffer.readUInt16LE(26) & 0x3fff;
          const h = buffer.readUInt16LE(28) & 0x3fff;
          return { width: w, height: h };
        }
      }

      const vp8xIndex = buffer.indexOf("VP8X");
      if (vp8xIndex !== -1 && vp8xIndex + 15 < buffer.length) {
        const w = buffer.readUIntLE(vp8xIndex + 12, 3) + 1;
        const h = buffer.readUIntLE(vp8xIndex + 15, 3) + 1;
        return { width: w, height: h };
      }

      const vp8lIndex = buffer.indexOf("VP8L");
      if (vp8lIndex !== -1 && vp8lIndex + 9 < buffer.length) {
        const chunkLength = buffer.readUInt32LE(vp8lIndex + 4);
        const startOffset = vp8lIndex + 8;
        for (let i = startOffset; i < startOffset + chunkLength && i < buffer.length; i++) {
          if (buffer[i] === 0x2f && i + 4 < buffer.length) {
            const val = buffer.readUInt32LE(i + 1);
            const w = (val & 0x3fff) + 1;
            const h = ((val >> 14) & 0x3fff) + 1;
            return { width: w, height: h };
          }
        }
      }

      const vp8Index = buffer.indexOf("VP8 ");
      if (vp8Index !== -1 && vp8Index + 15 < buffer.length) {
        const chunkLength = buffer.readUInt32LE(vp8Index + 4);
        const startOffset = vp8Index + 8;
        for (let i = startOffset; i < startOffset + chunkLength - 5 && i < buffer.length; i++) {
          if (buffer[i] === 0x9d && buffer[i + 1] === 0x01 && buffer[i + 2] === 0x2a) {
            const w = buffer.readUInt16LE(i + 3) & 0x3fff;
            const h = buffer.readUInt16LE(i + 5) & 0x3fff;
            return { width: w, height: h };
          }
        }
      }
    }
  } catch { }
  return { width: 800, height: 600 };
}

let cachedImages: GalleryImage[] | null = null;

export function getGalleryImages(): GalleryImage[] {
  if (cachedImages) return cachedImages;

  if (!fs.existsSync(GALLERY_DIR)) {
    cachedImages = [];
    return cachedImages;
  }

  const files = fs.readdirSync(GALLERY_DIR);

  cachedImages = files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    })
    .sort()
    .map((file) => {
      const dims = getImageDimensions(path.join(GALLERY_DIR, file));
      return {
        src: `/photo-gallery/${file}`,
        alt: filenameToAlt(file),
        filename: file,
        width: dims.width,
        height: dims.height,
      };
    });

  return cachedImages;
}
