# Backend INTU

1. Copiar `.env.example` a `.env`
2. Instalar dependencias:
   - `cd bakend`
   - `npm install`
3. Generar Prisma:
   - `npx prisma generate`
4. Crear la base de datos local:
   - `npx prisma migrate dev --name init`
5. Iniciar en desarrollo:
   - `npm run dev`
6. Crear admin:
   - `npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"`

Notas:
- Cambia `JWT_SECRET` por un valor seguro.
- Protege o desactiva `/admin/auth/register` en producción.
