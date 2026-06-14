import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required in .env. Configure PostgreSQL before starting the backend.');
}

const prisma = new PrismaClient();

export default prisma;
