import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';
import dotenv from 'dotenv';
import path from 'path';
import { ensureAdmin } from '../middlewares/auth';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const router = Router();
const ENABLE_ADMIN_REGISTER = process.env.ENABLE_ADMIN_REGISTER !== 'false';

router.post('/register', ensureAdmin, async (req, res) => {
  if (!ENABLE_ADMIN_REGISTER) return res.status(403).json({ message: 'Registration disabled. Set ENABLE_ADMIN_REGISTER=true in the root .env to enable admin creation.' });
  const { name, lastName, email, username, phone, position, password } = req.body;
  if (!name || !lastName || !email || !username || !phone || !position || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const existing = await prisma.admin.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return res.status(400).json({ message: 'Email or username already in use' });
    const hash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { name, lastName, email, username, phone, position, password: hash, passwordChangedAt: new Date(), failedLoginAttempts: 0, lockedUntil: null },
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
    // Avoid logging credentials or identifiers to prevent sensitive data exposure
    const admin = await prisma.admin.findFirst({ where: { OR: [{ email: credential }, { username: credential }] } });
    if (!admin) return res.status(401).json({ message: 'Credenciales inválidas' });

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      const minutes = Math.max(1, Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 60000));
      return res.status(423).json({
        message: `Cuenta bloqueada temporalmente. Intenta nuevamente en ${minutes} minuto(s).`,
        lockedUntil: admin.lockedUntil,
      });
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      const failedAttempts = (admin.failedLoginAttempts || 0) + 1;
      const shouldLock = failedAttempts >= 5;
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedLoginAttempts: failedAttempts,
          lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null,
        },
      });

      if (shouldLock) {
        return res.status(423).json({ message: 'Cuenta bloqueada temporalmente por intentos fallidos. Intenta nuevamente en 15 minutos.' });
      }
      return res.status(401).json({
        message: `Credenciales inválidas. Intentos restantes: ${Math.max(0, 5 - failedAttempts)}.`,
        remainingAttempts: Math.max(0, 5 - failedAttempts),
      });
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });

    const passwordExpiresInMs = 90 * 24 * 60 * 60 * 1000;
    if (admin.passwordChangedAt && Date.now() - admin.passwordChangedAt.getTime() > passwordExpiresInMs) {
      return res.status(403).json({ code: 'PASSWORD_EXPIRED', message: 'Tu contraseña venció. Debes renovarla antes de iniciar sesión.' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '5m' });
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
