import fs from 'fs';
import path from 'path';

export const UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'uploads');

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
