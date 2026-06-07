# Backend INTU

1. Copiar `.env.example` a `.env` en la raíz del proyecto.
2. Instalar dependencias:
   - `cd bakend`
   - `npm install`
3. Generar Prisma usando el env global:
   - `cd .. && npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma`
4. Crear la base de datos local:
   - `cd .. && npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init`
5. Iniciar en desarrollo:
   - `npm run dev`
6. Crear admin:
   - `npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"`

Notas:
- Cambia `JWT_SECRET` por un valor seguro.
- Protege o desactiva `/admin/auth/register` en producción.
