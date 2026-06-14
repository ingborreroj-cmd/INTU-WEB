# IntuWeb Backend

Backend scaffold for Intu Web using Express + TypeScript + Prisma (PostgreSQL).

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
Asegúrate de que `DATABASE_URL` apunte a PostgreSQL y de ejecutar los comandos desde `bakend` usando el env global de la raíz (`../.env`).

Antes de ejecutar las migraciones, comprueba que PostgreSQL esté en ejecución y que la base de datos `intuweb` exista. Si no existe, créala con:

```bash
createdb intuweb
```

o con:

```bash
psql -U postgres -c "CREATE DATABASE intuweb;"
```

Si tu usuario `postgres` no tiene contraseña, usa una URL de conexión como:

```bash
postgresql://postgres@localhost:5432/intuweb?schema=public
```

Nota: para que el panel de administración pueda crear nuevos admins, configura `ENABLE_ADMIN_REGISTER=true` en el `.env` global.

Create the first admin user:

```bash
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Verify backend setup:

```bash
npm run verify-setup
```

Production deployment:

```bash
cd "../"
npx --prefix bakend prisma migrate deploy --schema bakend/prisma/schema.prisma
```

DB connection: read from `DATABASE_URL` in the global `.env`.

Notes:
- `JWT_SECRET` must be strong for production.
- Do not commit `.env` with real credentials.
