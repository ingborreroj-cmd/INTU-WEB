import prisma from '../src/prismaClient';

async function main() {
  const admins = await prisma.admin.findMany();
  console.log('Admins:', admins);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
