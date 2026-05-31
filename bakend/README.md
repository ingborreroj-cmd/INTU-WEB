# IntuWeb Backend

Backend scaffold for Intu Web using Express + TypeScript + Prisma (SQLite).

Quick start:

1. Copy `.env.example` to `.env` and adjust values (especially `JWT_SECRET`).
2. Install dependencies and apply Prisma migrations:

```bash
cd bakend
npm install
npx prisma generate
npx prisma migrate dev --name init
# If the schema has changed later, run:
# npx prisma migrate dev --name add-news-fields
npm run dev
```

Create the first admin user:

```bash
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Verify backend setup:

```bash
npm run verify-setup
```

DB location: `bakend/prisma/db/intuweb_db.sqlite`
