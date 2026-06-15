import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin, AuthRequest } from '../middlewares/auth';
import bcrypt from 'bcrypt';

const router = Router();

// List all admins (protected)
router.get('/admins', ensureAdmin, async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, lastName: true, email: true, username: true, phone: true, position: true, createdAt: true },
      orderBy: { id: 'asc' }
    });
    res.json(admins);
  } catch (err) {
    console.error('[admins.list] error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an admin (protected)
router.put('/admins/:id', ensureAdmin, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

  const { name, lastName, email, username, phone, position, password } = req.body;

  try {
    const existing = await prisma.admin.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Admin not found' });

    const data: any = { name, lastName, email, username, phone, position };

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      data.password = hash;
    }

    const updated = await prisma.admin.update({ where: { id }, data });

    res.json({ id: updated.id, name: updated.name, lastName: updated.lastName, email: updated.email, username: updated.username, phone: updated.phone, position: updated.position });
  } catch (err) {
    console.error('[admins.update] error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an admin (protected) - prevents deleting yourself
router.delete('/admins/:id', ensureAdmin, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

  try {
    if (req.adminId && req.adminId === id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const existing = await prisma.admin.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Admin not found' });

    await prisma.admin.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error('[admins.delete] error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
