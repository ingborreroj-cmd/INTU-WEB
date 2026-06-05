import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import prisma from '../src/prismaClient';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

function getArg(name: string): string | undefined {
  const index = process.argv.findIndex(arg => arg === name);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return undefined;
}

const name = getArg('--name') || getArg('-n') || 'INTU Administrator';
const rawEmail = getArg('--email') || getArg('-e');
const rawPassword = getArg('--password') || getArg('-p');

// Mensaje de uso si faltan datos
if (!rawEmail || !rawPassword) {
  console.error('Usage: npm run create-admin -- --email admin@example.com --password secret123 [--name "Admin Name"]');
  process.exit(1);
}

// Forzamos a TypeScript a entender que a partir de aquí son strings reales gracias a la validación previa
const email: string = rawEmail;
const password: string = rawPassword;

async function main() {
  try {
    await prisma.$connect();
    
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      console.log(`Admin with email ${email} already exists (id=${existing.id}).`);
      return; // Usamos return en lugar de process.exit para que pase por el finally
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({ 
      data: { name, email, password: hash } 
    });
    
    console.log(`Created admin: id=${admin.id}, email=${admin.email}`);
  } catch (error) {
    console.error('create-admin failed:', error);
    process.exit(1);
  } finally {
    // El bloque finally asegura que la conexión se cierre SIEMPRE, ocurra un error o no
    await prisma.$disconnect();
  }
}

main();