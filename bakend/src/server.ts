import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { UPLOAD_DIR } from './utils/fileHelpers';

dotenv.config();

// Warn if critical env vars are missing or left as defaults
const _jwtSecret = process.env.JWT_SECRET || 'change_this_secret';
if (_jwtSecret === 'change_this_secret') {
  // eslint-disable-next-line no-console
  console.warn('WARNING: JWT_SECRET is using the default placeholder. Change JWT_SECRET in bakend/.env before production.');
}

import authRoutes from './routes/auth';
import modalRoutes from './routes/modal';
import heroRoutes from './routes/hero';
import newsRoutes from './routes/news';

const app = express();
const PORT = Number(process.env.PORT) || 4000; 

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [
  'http://localhost:5173', 
  'http://127.0.0.1:5173',
  'http://localhost:4000'
];

// Configuración de seguridad para desarrollo/producción local
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 🔥 SOLUCIÓN AL PAYLOAD ERROR: Ampliamos el límite de tamaño a 50mb para JSON y formularios URL-encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

// Configuración de CORS con soporte para cookies
app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Servir archivos estáticos (Imágenes subidas de noticias/hero)
app.use('/uploads', express.static(UPLOAD_DIR));

// Rutas de la API
app.use('/admin/auth', authRoutes);
app.use('/admin/modal', modalRoutes);
app.use('/admin/hero', heroRoutes);
app.use('/admin/news', newsRoutes);

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'INTU backend is running. Use /health or /admin routes.',
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

// Escucha forzada en IPv4/IPv6 para entorno Windows
app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});