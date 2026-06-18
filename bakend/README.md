# IntuWeb Backend

Backend del proyecto INTU WEB con Express + TypeScript + Prisma para PostgreSQL.

## Pasos de configuración

### 1. Copiar el entorno global

Desde la raíz del proyecto:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
Copy-Item .env.example .env
```

> El backend carga el archivo `.env` que está en la raíz del repositorio.

### 2. Instalar dependencias

```powershell
cd bakend
npm install
```

### 3. Generar Prisma y aplicar migraciones

Desde la raíz del proyecto:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
```

### 4. Crear la base de datos si no existe

```powershell
createdb intuweb
```

o:

```powershell
psql -U postgres -c "CREATE DATABASE intuweb;"
```

Si tu usuario `postgres` no tiene contraseña, usa:

```text
postgresql://postgres@localhost:5432/intuweb?schema=public
```

### 5. Iniciar el servidor backend

```powershell
cd bakend
npm run dev
```

## Scripts útiles

- `npm run dev`: inicia el backend con `ts-node-dev`.
- `npm run build`: compila TypeScript en `dist/`.
- `npm run start`: ejecuta el backend compilado.
- `npm run create-admin`: crea un admin.
- `npm run verify-setup`: comprueba la conexión con la base de datos y el estado básico.

## Crear un usuario admin

```powershell
cd bakend
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Desde la raíz del proyecto también puedes ejecutar:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Opciones opcionales:

- `--lastName`
- `--username`
- `--phone`
- `--position`

## Verificar el backend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend npm run verify-setup
```

## Notas importantes

- El esquema Prisma en `bakend/prisma/schema.prisma` usa `env("DATABASE_URL")`.
- `DATABASE_URL` debe estar definido en el `.env` de la raíz.
- `JWT_SECRET` debe ser seguro en producción.
- No comites `.env` con credenciales reales.
- Si usas el bot INTU, configura `GEMINI_API_KEY` y `LLM_PROVIDER=gemini` en el `.env`.

## Despliegue en producción

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend prisma migrate deploy --schema bakend/prisma/schema.prisma
```
