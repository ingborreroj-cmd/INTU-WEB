import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { UPLOAD_DIR } from './utils/fileHelpers';

dotenv.config();

const _jwtSecret = process.env.JWT_SECRET || 'change_this_secret';
if (_jwtSecret === 'change_this_secret') {
  console.warn('WARNING: JWT_SECRET is using the default placeholder. Change JWT_SECRET in bakend/.env before production.');
}

import authRoutes from './routes/auth';
import heroRoutes from './routes/hero';
import newsRoutes from './routes/news';
import intuBotRoutes from './routes/intuBot';

const app = express();
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

app.use('/admin/auth', authRoutes);
app.use('/admin/hero', heroRoutes);
app.use('/admin/news', newsRoutes);

app.use('/intu-bot', intuBotRoutes);
app.use('/api/intu-bot', intuBotRoutes);
app.use('/admin/intu-bot', intuBotRoutes);

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
    console.error(`ERROR: Port ${PORT} is already in use. Stop the process using that port or change PORT in bakend/.env.`);
    process.exit(1);
  }

  console.error('Server failed to start:', error);
  process.exit(1);
});