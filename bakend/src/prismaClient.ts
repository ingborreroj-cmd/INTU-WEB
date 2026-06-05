import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const defaultDbPath = path.resolve(__dirname, '../prisma/db/intuweb_db.sqlite');
// Normalize the path to use forward slashes for Prisma on Windows.
const normalizedDefaultPath = defaultDbPath.replace(/\\/g, '/');
let databaseUrl = process.env.DATABASE_URL || `file:${normalizedDefaultPath}`;
if (databaseUrl.startsWith('file:')) {
  const trimmedUrl = databaseUrl.slice(5);
  const normalizedUrl = trimmedUrl.replace(/\\/g, '/');
  databaseUrl = `file:${normalizedUrl}`;
}
process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient();

export default prisma;
