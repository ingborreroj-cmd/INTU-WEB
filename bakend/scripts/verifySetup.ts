import dotenv from 'dotenv';
import prisma from '../src/prismaClient';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

async function main() {
  const dbPath = path.resolve(__dirname, '..', 'prisma', 'db', 'intuweb_db.sqlite');
  console.log('Checking backend environment...');
  console.log(`DB path: ${dbPath}`);
  console.log(`DB file exists: ${fs.existsSync(dbPath) ? 'yes' : 'no'}`);

  await prisma.$connect();
  const adminCount = await prisma.admin.count();
  const heroCount = await prisma.heroItem.count();
  const newsCount = await prisma.newsItem.count();
  console.log(`Connected to SQLite database.`);
  console.log(`Admins: ${adminCount}`);
  console.log(`Hero items: ${heroCount}`);
  console.log(`News items: ${newsCount}`);
  await prisma.$disconnect();
  console.log('Backend verification completed successfully.');
}

main().catch((error) => {
  console.error('Backend verification failed:', error);
  process.exit(1);
});
