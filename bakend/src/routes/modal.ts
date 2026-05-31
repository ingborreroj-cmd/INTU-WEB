import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';
import { upload } from '../utils/multerConfig';
import { deleteFileIfExists } from '../utils/fileHelpers';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const modal = await prisma.modal.findFirst();
    return res.json(modal);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el modal' });
  }
});

router.put('/', ensureAdmin, upload.single('background'), async (req, res) => {
  try {
    const { title, body, active } = req.body;
    const existing = await prisma.modal.findFirst();
    let backgroundPath: string | undefined = existing?.backgroundPath ?? undefined;

    if (req.file) {
      if (existing?.backgroundPath) {
        deleteFileIfExists(existing.backgroundPath);
      }
      backgroundPath = `/uploads/${req.file.filename}`;
    }

    const dataToSave = {
      title: title || undefined, // Si viene vacío, no sobreescribe con ""
      body: body || undefined,
      active: active === 'true' || active === true, // Soporta tanto el string de FormData como booleano real
      backgroundPath
    };

    // 3. Actualizar o Crear
    if (existing) {
      const updated = await prisma.modal.update({
        where: { id: existing.id },
        data: dataToSave
      });
      return res.json(updated);
    }

    const created = await prisma.modal.create({
      data: {
        title: title || "Modal de Bienvenida", // Valor por defecto si es creación pura
        body: body || "",
        active: active === 'true' || active === true,
        backgroundPath: backgroundPath || ""
      }
    });
    return res.json(created);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al procesar el modal' });
  }
});

export default router;