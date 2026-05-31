import multer from 'multer';
import path from 'path';
import { ensureUploadDir, isValidImageMimeType, UPLOAD_DIR } from './fileHelpers';

ensureUploadDir();

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname) || `.${file.mimetype.split('/')[1]}`;
      cb(null, `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`);
    }
  }),
  fileFilter: (_req, file, cb) => {
    if (!isValidImageMimeType(file.mimetype)) {
      return cb(new Error('Solo se permiten imágenes PNG, JPG o WEBP')); 
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
