import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const router = Router();
const ENABLE_ADMIN_REGISTER = process.env.ENABLE_ADMIN_REGISTER !== 'false';

router.post('/register', async (req, res) => {
  if (!ENABLE_ADMIN_REGISTER) return res.status(404).json({ message: 'Registration disabled' });
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email in use' });
    const hash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({ data: { name, email, password: hash } });
    return res.json({ id: admin.id, email: admin.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    console.log('[auth.login] attempt for', email);
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '8h' });
    const isSecureCookie = process.env.NODE_ENV === 'production' || ['localhost', '127.0.0.1', '::1'].includes(req.hostname);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: isSecureCookie,
    });
    return res.json({ id: admin.id, email: admin.email });
  } catch (err) {
    console.error('[auth.login] error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
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
    return res.json({ authenticated: true, id: admin.id, email: admin.email, name: admin.name });
  } catch (err) {
    return res.status(200).json({ authenticated: false });
  }
});

export default router;
