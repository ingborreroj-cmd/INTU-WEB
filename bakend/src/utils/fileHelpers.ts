import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'uploads');
const optimizationJobs = new Map<string, Promise<string>>();

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function deleteFileIfExists(relativePath?: string) {
  if (!relativePath) return;
  const cleaned = relativePath.replace(/^\//, '');
  const filePath = path.resolve(UPLOAD_DIR, '..', cleaned);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function isValidImageMimeType(mime: string) {
  return ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(mime);
}

export function saveBase64Image(dataUrl: string, prefix = 'file') {
  const regex = /^data:(.+);base64,(.+)$/;
  const matches = dataUrl.match(regex);
  if (!matches) return undefined;
  const mime = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const extension = mime.split('/')[1] || 'png';
  const fileName = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}.${extension}`;
  ensureUploadDir();
  const targetPath = path.join(UPLOAD_DIR, fileName);
  fs.writeFileSync(targetPath, buffer);
  return `/uploads/${fileName}`;
}

export async function optimizeUploadedImage(fileName: string): Promise<string | null> {
  const safeFileName = path.basename(fileName);
  if (safeFileName !== fileName) return null;

  const sourcePath = path.join(UPLOAD_DIR, safeFileName);
  if (!fs.existsSync(sourcePath)) return null;
  if (safeFileName.endsWith('.optimized.webp')) return safeFileName;

  const outputName = `${path.parse(safeFileName).name}.optimized.webp`;
  const outputPath = path.join(UPLOAD_DIR, outputName);
  if (fs.existsSync(outputPath)) return outputName;

  const activeJob = optimizationJobs.get(safeFileName);
  if (activeJob) return activeJob;

  const job = sharp(sourcePath)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath)
    .then(() => outputName)
    .catch((error) => {
      console.warn(`Unable to optimize uploaded image ${safeFileName}:`, error);
      return safeFileName;
    })
    .finally(() => optimizationJobs.delete(safeFileName));

  optimizationJobs.set(safeFileName, job);
  return job;
}
