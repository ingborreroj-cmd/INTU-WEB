import { Router } from 'express';
import path from 'path';
import { optimizeUploadedImage, UPLOAD_DIR } from '../utils/fileHelpers';

const router = Router();

router.get('/:filename', async (req, res) => {
  const fileName = await optimizeUploadedImage(req.params.filename);
  if (!fileName) return res.status(404).json({ message: 'Image not found' });

  const filePath = path.join(UPLOAD_DIR, fileName);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return res.sendFile(filePath);
});

export default router;