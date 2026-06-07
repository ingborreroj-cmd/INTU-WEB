# IntuWeb Backend

Backend scaffold for Intu Web using Express + TypeScript + Prisma (SQLite).

Quick start:

1. Copy the root `.env.example` to `.env` in the project root and adjust values (especially `JWT_SECRET`).
2. Install dependencies and apply Prisma migrations:

```bash
cd bakend
npm install
cd ..
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
cd bakend
npm run dev
```

El esquema Prisma en `bakend/prisma/schema.prisma` usa `url = env("DATABASE_URL")`.
Asegúrate de ejecutar los comandos desde `bakend` y usar el env global de la raíz (`../.env`).

Nota: para que el panel de administración pueda crear nuevos admins, configura `ENABLE_ADMIN_REGISTER=true` en el `.env` global.

Create the first admin user:

```bash
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Verify backend setup:

```bash
npm run verify-setup
```

DB location: `bakend/prisma/db/intuweb_db.db`
