import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { UPLOAD_DIR } from './utils/fileHelpers';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const _jwtSecret = process.env.JWT_SECRET || 'change_this_secret';
if (_jwtSecret === 'change_this_secret') {
  console.warn('WARNING: JWT_SECRET is using the default placeholder. Change JWT_SECRET in the project root .env before production.');
}

import authRoutes from './routes/auth';
import heroRoutes from './routes/hero';
import newsRoutes from './routes/news';
import intuBotRoutes from './routes/intuBot';
import adminsRoutes from './routes/admins';

const app = express();

app.set('trust proxy', 1);

const PORT = Number(process.env.PORT) || 4000; 

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [
  'http://localhost:5173', 
  'http://127.0.0.1:5173',
  'http://localhost:4000'
];

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.use('/uploads', express.static(UPLOAD_DIR));

// Admin path configurable via root .env -> ADMIN_PATH (example: ADMIN_PATH=secret-admin)
let ADMIN_PATH = process.env.ADMIN_PATH || 'admin';
ADMIN_PATH = String(ADMIN_PATH).replace(/^\//, '').replace(/\/$/, '');
const ADMIN_BASE = `/${ADMIN_PATH}`;

app.use(`${ADMIN_BASE}/auth`, authRoutes);
app.use(`${ADMIN_BASE}/hero`, heroRoutes);
app.use(`${ADMIN_BASE}/news`, newsRoutes);
app.use(`${ADMIN_BASE}`, adminsRoutes);

app.use('/intu-bot', intuBotRoutes);
app.use('/api/intu-bot', intuBotRoutes);
app.use(`${ADMIN_BASE}/intu-bot`, intuBotRoutes);

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'INTU backend is running. Use /health or /admin routes.',
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error: any) => {
  if (error?.code === 'EADDRINUSE') {
    console.error(`ERROR: Port ${PORT} is already in use. Stop the process using that port or change PORT in the project root .env.`);
    process.exit(1);
  }

  console.error('Server failed to start:', error);
  process.exit(1);
});
