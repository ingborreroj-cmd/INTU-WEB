import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';
import { upload } from '../utils/multerConfig';
import { deleteFileIfExists, saveBase64Image } from '../utils/fileHelpers';

const router = Router();

router.get('/', async (req, res) => {
  const items = await prisma.heroItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  res.json(items);
});

router.post('/', ensureAdmin, upload.single('image'), async (req, res) => {
  const { title, subtitle, order, active } = req.body as any;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const parsedOrder = Number(order);
  const safeOrder = Number.isSafeInteger(parsedOrder) && parsedOrder >= 0 && parsedOrder <= 100000 ? parsedOrder : 0;
  const created = await prisma.heroItem.create({ data: { title, subtitle, imagePath, order: safeOrder, active: active === 'true' } });
  res.json(created);
});

// Bulk replace hero items. Expects JSON array in body: [{ title, subtitle, imageData (dataURL)?, order, active }]
router.put('/bulk', ensureAdmin, async (req, res) => {
  const items = req.body as any[];
  await prisma.heroItem.deleteMany({});
  const created: any[] = [];
  for (let idx = 0; idx < items.length; idx += 1) {
    const it = items[idx];
    let imagePath: string | undefined = undefined;
    if (it.imageData && typeof it.imageData === 'string') {
      if (it.imageData.startsWith('data:')) {
        imagePath = saveBase64Image(it.imageData, 'hero');
      } else {
        imagePath = it.imageData;
      }
    }
    const parsedOrder = Number(it.order);
    const safeOrder = Number.isSafeInteger(parsedOrder) && parsedOrder >= 0 && parsedOrder <= 100000 ? parsedOrder : idx + 1;
    const c = await prisma.heroItem.create({
      data: {
        title: it.title || '',
        subtitle: it.subtitle || '',
        imagePath,
        order: safeOrder,
        active: !!it.active,
      },
    });
    created.push(c);
  }
  res.json(created);
});

router.put('/:id', ensureAdmin, upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid hero id' });
  const { title, subtitle, order, active } = req.body as any;
  const existing = await prisma.heroItem.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: 'Not found' });
  let imagePath = existing.imagePath;
  if (req.file) {
    if (existing.imagePath) deleteFileIfExists(existing.imagePath);
    imagePath = `/uploads/${req.file.filename}`;
  }
  const parsedOrder = Number(order);
  const safeOrder = Number.isSafeInteger(parsedOrder) && parsedOrder >= 0 && parsedOrder <= 100000 ? parsedOrder : existing.order;
  const updated = await prisma.heroItem.update({ where: { id }, data: { title, subtitle, imagePath, order: safeOrder, active: active === 'true' } });
  res.json(updated);
});

router.delete('/:id', ensureAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid hero id' });
  await prisma.heroItem.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
