import dotenv from 'dotenv';
import prisma from '../src/prismaClient';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

async function main() {
  console.log('Checking backend environment...');
  console.log(`DATABASE_URL configured: ${process.env.DATABASE_URL ? 'yes' : 'no'}`);

  await prisma.$connect();
  const adminCount = await prisma.admin.count();
  const heroCount = await prisma.heroItem.count();
  const newsCount = await prisma.newsItem.count();
  console.log(`Connected to Prisma database.`);
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
