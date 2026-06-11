import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';
import { upload } from '../utils/multerConfig';
import { deleteFileIfExists, saveBase64Image } from '../utils/fileHelpers';

const router = Router();

router.get('/', async (req, res) => {
  const section = req.query.section?.toString() || 'news';
  const items = await prisma.newsItem.findMany({ where: { active: true, section }, orderBy: { published: 'desc' } });
  res.json(items);
});

router.post('/', ensureAdmin, upload.single('image'), async (req, res) => {
  const { title, content, createdBy, published, date, source, url, active, section } = req.body as any;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const created = await prisma.newsItem.create({
    data: {
      title,
      content,
      createdBy,
      imagePath,
      date,
      source,
      url,
      published: published ? new Date(published) : undefined,
      section: section || 'news',
      active: active === 'true',
    },
  });
  res.json(created);
});

// Bulk replace news items for a specific section. Expects JSON array in body: [{ title, content, imageData (dataURL)?, date, source, url, published?, active }]
router.put('/bulk', ensureAdmin, async (req, res) => {
  const items = req.body as any[];
  const section = req.query.section?.toString() || 'news';

  // Only delete items that belong to the targeted section to avoid wiping other sections
  await prisma.newsItem.deleteMany({ where: { section } });

  const created: any[] = [];
  for (const it of items) {
    let imagePath: string | undefined = undefined;
    if (it.imageData && typeof it.imageData === 'string') {
      if (it.imageData.startsWith('data:')) {
        imagePath = saveBase64Image(it.imageData, 'news');
      } else {
        imagePath = it.imageData;
      }
    }
    const c = await prisma.newsItem.create({
      data: {
        title: it.title || '',
        content: it.content || '',
        createdBy: it.createdBy || undefined,
        imagePath,
        date: it.date || undefined,
        source: it.source || undefined,
        url: it.url || undefined,
        published: it.published ? new Date(it.published) : undefined,
        section,
        active: !!it.active,
      },
    });
    created.push(c);
  }
  res.json(created);
});

router.put('/:id', ensureAdmin, upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid news id' });
  const { title, content, createdBy, published, date, source, url, active, section } = req.body as any;
  const existing = await prisma.newsItem.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: 'Not found' });
  let imagePath = existing.imagePath;
  if (req.file) {
    if (existing.imagePath) deleteFileIfExists(existing.imagePath);
    imagePath = `/uploads/${req.file.filename}`;
  }
  const updated = await prisma.newsItem.update({
    where: { id },
    data: {
      title,
      content,
      createdBy,
      imagePath,
      date,
      source,
      url,
      published: published ? new Date(published) : undefined,
      section: section || existing.section,
      active: active === 'true',
    },
  });
  res.json(updated);
});

router.delete('/:id', ensureAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid news id' });
  await prisma.newsItem.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
