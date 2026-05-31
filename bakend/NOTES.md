Pasos para dejar el backend operativo (desarrollo):

1. Copiar variables de ejemplo:

```bash
cd bakend
cp .env.example .env
```

2. Instalar dependencias y generar cliente Prisma:

```bash
npm install
npx prisma generate
```

3. Ejecutar migración inicial (crea `db/intuweb_db.sqlite`):

```bash
npx prisma migrate dev --name init
```

4. Crear un usuario admin inicial (opciones):

- Ejecutar `POST /admin/auth/register` con `{ name, email, password }` desde Postman o Insomnia.
- O usar `npx prisma studio` y añadir manualmente un registro en la tabla `Admin`.

5. Iniciar servidor en modo desarrollo:

```bash
npm run dev
```

Notas de seguridad:
- Deshabilitar o proteger el endpoint `/admin/auth/register` en producción después de crear el primer admin.
- Cambiar `JWT_SECRET` por un valor seguro en `.env`.
- Considerar usar HTTPS y `SameSite` en cookies cuando esté en producción.
