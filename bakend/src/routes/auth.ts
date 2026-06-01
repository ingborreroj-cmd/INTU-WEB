import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';
import dotenv from 'dotenv';
import { ensureAdmin } from '../middlewares/auth';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const router = Router();
const ENABLE_ADMIN_REGISTER = process.env.ENABLE_ADMIN_REGISTER !== 'false';

router.post('/register', ensureAdmin, async (req, res) => {
  if (!ENABLE_ADMIN_REGISTER) return res.status(404).json({ message: 'Registration disabled' });
  const { name, lastName, email, username, phone, position, password } = req.body;
  if (!name || !lastName || !email || !username || !phone || !position || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const existing = await prisma.admin.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return res.status(400).json({ message: 'Email or username already in use' });
    const hash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { name, lastName, email, username, phone, position, password: hash },
    });
    return res.json({ id: admin.id, email: admin.email, username: admin.username });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, email, username, password } = req.body;
  const credential = identifier || email || username;
  if (!credential || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    console.log('[auth.login] attempt for', credential);
    const admin = await prisma.admin.findFirst({ where: { OR: [{ email: credential }, { username: credential }] } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '8h' });
    const isSecureCookie = process.env.NODE_ENV === 'production' || ['localhost', '127.0.0.1', '::1'].includes(req.hostname);
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'none' as const,
      secure: isSecureCookie,
    };
    res.cookie('token', token, cookieOptions);
    return res.json({ token, id: admin.id, email: admin.email, username: admin.username });
  } catch (err) {
    console.error('[auth.login] error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', async (req, res) => {
  const isSecureCookie = process.env.NODE_ENV === 'production' || ['localhost', '127.0.0.1', '::1'].includes(req.hostname);
  res.clearCookie('token', {
    sameSite: 'none',
    secure: isSecureCookie,
  });
  res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  if (!token) return res.status(200).json({ authenticated: false });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const admin = await prisma.admin.findUnique({ where: { id: payload.id } });
    if (!admin) return res.status(200).json({ authenticated: false });
    return res.json({
      authenticated: true,
      id: admin.id,
      email: admin.email,
      username: admin.username,
      name: admin.name,
      lastName: admin.lastName,
      phone: admin.phone,
      position: admin.position,
    });
  } catch (err) {
    return res.status(200).json({ authenticated: false });
  }
});

export default router;
