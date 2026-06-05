import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import prisma from '../src/prismaClient';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const HASH_REGEX = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

async function main() {
  await prisma.$connect();
  const admins = await prisma.admin.findMany();
  if (admins.length === 0) {
    console.log('No admin records found.');
    return;
  }

  let updatedCount = 0;
  for (const admin of admins) {
    if (!HASH_REGEX.test(admin.password)) {
      console.log(`Rehashing admin id=${admin.id} email=${admin.email}`);
      const hash = await bcrypt.hash(admin.password, 10);
      await prisma.admin.update({ where: { id: admin.id }, data: { password: hash } });
      updatedCount += 1;
    } else {
      console.log(`Already hashed: id=${admin.id} email=${admin.email}`);
    }
  }

  console.log(`Completed. Admins updated: ${updatedCount}`);
}

main()
  .catch((err) => {
    console.error('Failed to rehash admins:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
