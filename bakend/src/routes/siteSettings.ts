import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';
import { upload } from '../utils/multerConfig';
import { deleteFileIfExists } from '../utils/fileHelpers';

const router = Router();
const SETTINGS_ID = 1;

router.get('/navbar-logo', async (_req, res) => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
    res.json({ logoPath: settings?.navbarLogoPath ?? null });
  } catch (error) {
    console.error('[site-settings.navbar-logo.get] error:', error);
    res.status(500).json({ message: 'No se pudo cargar el logo del navbar.' });
  }
});

router.put('/navbar-logo', ensureAdmin, upload.single('image'), async (req, res) => {
  try {
    const existing = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
    const shouldRemove = req.body.remove === 'true';

    if (!req.file && !shouldRemove) {
      return res.status(400).json({ message: 'Selecciona una imagen para guardar.' });
    }

    const logoPath = shouldRemove ? null : `/uploads/${req.file!.filename}`;
    const settings = await prisma.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, navbarLogoPath: logoPath },
      update: { navbarLogoPath: logoPath },
    });

    if (existing?.navbarLogoPath && existing.navbarLogoPath !== logoPath) {
      deleteFileIfExists(existing.navbarLogoPath);
    }

    res.json({ logoPath: settings.navbarLogoPath });
  } catch (error) {
    console.error('[site-settings.navbar-logo.update] error:', error);
    res.status(500).json({ message: 'No se pudo guardar el logo del navbar.' });
  }
});

export default router;