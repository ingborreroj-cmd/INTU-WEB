# INTU WEB

Documentación completa para instalar, configurar y ejecutar el frontend y backend en local.

---

## 1. Estructura del repositorio

- `src/`: frontend en React + TypeScript con Vite.
- `public/`: activos estáticos del frontend.
- `bakend/`: backend en Express + TypeScript + Prisma + PostgreSQL.
- `bakend/prisma/`: esquema y migraciones de Prisma.
- `bakend/src/`: código backend.
- `bakend/scripts/`: utilidades como creación de admin y verificación.

---

## 2. Requisitos previos

- Node.js 18 o superior.
- npm.
- PostgreSQL instalado y en ejecución.
- Un archivo `.env` en la raíz del proyecto.
- Permisos para crear la base de datos `intuweb`.

---

## 3. Configuración de entorno

Copia el archivo de ejemplo a `.env` en la raíz del proyecto.

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
Copy-Item .env.example .env
```

> El backend y el frontend usan el mismo `.env` de la raíz.
> Vite solo expone variables que comienzan con `VITE_`.

### 3.1 Variables importantes en `.env`

- `VITE_API_URL`: URL base del backend para el frontend (por defecto `http://localhost:4000`).
- `VITE_ADMIN_PATH`: ruta del administrador en el frontend.
- `ADMIN_PATH`: ruta del administrador en el backend.
- `DATABASE_URL`: cadena de conexión PostgreSQL.
- `JWT_SECRET`: clave secreta JWT.
- `ALLOWED_ORIGINS`: orígenes permitidos para CORS.
- `ENABLE_ADMIN_REGISTER`: habilita registro de administradores desde la API.
- `GEMINI_API_KEY`: clave para el INTU Bot.
- `LLM_PROVIDER`: proveedor LLM, actualmente `gemini`.
- `LLM_TEMPERATURE`: temperatura del modelo.
- `LLM_TOP_P`: top-p para la generación.
- `LLM_MAX_TOKENS`: máximo de tokens de salida.

> `ADMIN_PATH` y `VITE_ADMIN_PATH` deben coincidir exactamente para que el panel admin funcione.

### 3.2 Ejemplo de `DATABASE_URL`

- Con contraseña:
  `postgresql://postgres:YourPassword@localhost:5432/intuweb?schema=public`
- Sin contraseña:
  `postgresql://postgres@localhost:5432/intuweb?schema=public`

---

## 4. Instalación

### 4.1 Frontend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npm install
```

### 4.2 Backend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB\bakend"
npm install
```

---

## 5. Database y Prisma

### 5.1 Crear la base de datos

Si la base de datos `intuweb` no existe, créala:

```powershell
createdb intuweb
```

o:

```powershell
psql -U postgres -c "CREATE DATABASE intuweb;"
```

### 5.2 Generar Prisma y ejecutar migraciones

Desde la raíz del proyecto:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
```

### 5.3 Migraciones en producción

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend prisma migrate deploy --schema bakend/prisma/schema.prisma
```

---

## 6. Ejecución en desarrollo

### 6.1 Iniciar frontend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npm run dev
```

### 6.2 Iniciar backend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB\bakend"
npm run dev
```

### 6.3 Direcciones locales

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## 7. Administración del proyecto

### 7.1 Crear usuario admin

Desde `bakend`:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB\bakend"
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Desde la raíz del proyecto:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

### 7.2 Opciones adicionales para admin

- `--lastName`
- `--username`
- `--phone`
- `--position`

> El inicio de sesión se puede realizar con `email` o `username`, junto a la contraseña.

### 7.3 Rutas del panel admin

- Login de admin (por defecto): `http://localhost:5173/admin/login`
- Panel admin (por defecto): `http://localhost:5173/admin`

Si cambias `ADMIN_PATH` y `VITE_ADMIN_PATH`, usa la misma ruta personalizada en ambos.

---

## 8. INTU Bot

### 8.1 Rutas disponibles

El backend expone el bot en:

- `/intu-bot`
- `/api/intu-bot`
- `/${ADMIN_PATH}/intu-bot`

El frontend usa `VITE_API_URL/intu-bot`.

### 8.2 Variables necesarias

- `GEMINI_API_KEY`: clave Gemini.
- `LLM_PROVIDER=gemini`
- `LLM_TEMPERATURE`, `LLM_TOP_P`, `LLM_MAX_TOKENS`: opcionales.

---

## 9. Verificación y utilidades

### 9.1 Verificar backend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npx --prefix bakend npm run verify-setup
```

### 9.2 Build y preview frontend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npm run build
npm run preview
```

### 9.3 Build backend

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB\bakend"
npm run build
```

---

## 10. Notas importantes

- No subas el archivo `.env` al repositorio.
- Usa un valor seguro en `JWT_SECRET`.
- No crees ni uses un `.env` dentro de `bakend/`; el backend carga el `.env` de la raíz.
- `ADMIN_PATH` y `VITE_ADMIN_PATH` deben coincidir.
- Asegúrate de que PostgreSQL esté en ejecución antes de correr Prisma.
- Si el backend usa otro puerto, actualiza `PORT` y `VITE_API_URL`.
- Si hay errores de CORS, actualiza `ALLOWED_ORIGINS`.

---

## 11. Dependencias clave

### Frontend

- `react`
- `react-dom`
- `react-router-dom`
- `react-leaflet`
- `leaflet`
- `lucide-react`
- `@vis.gl/react-google-maps`

### Backend

- `express`
- `@prisma/client`
- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `express-rate-limit`
- `helmet`
- `jsonwebtoken`
- `multer`

### Desarrollo

- `typescript`
- `vite`
- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `@vitejs/plugin-react`
- `ts-node-dev`

---

## 12. Estructura de carpetas clave

- `src/components/`: componentes React.
- `src/pages/`: páginas de la aplicación.
- `src/services/`: utilidades de API y datos.
- `bakend/src/routes/`: rutas del backend.
- `bakend/prisma/`: esquema y migraciones.
- `bakend/scripts/`: scripts de utilidad.

---

## 13. Cómo probar el sistema

1. Arranca el backend.
2. Arranca el frontend.
3. Abre `http://localhost:5173`.
4. Accede al panel admin en `http://localhost:5173/admin/login`.

---

## 9. Dependencias principales

### Frontend

- `react`
- `react-dom`
- `react-router-dom`
- `react-leaflet`
- `leaflet`
- `lucide-react`
- `@vis.gl/react-google-maps`

### Backend

- `express`
- `prisma`
- `@prisma/client`
- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `express-rate-limit`
- `helmet`
- `jsonwebtoken`
- `multer`

### Desarrollo

- `typescript`
- `vite`
- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `@vitejs/plugin-react`
- `ts-node-dev`

---

## 10. Estructura de carpetas clave

- `src/components/`: componentes React.
- `src/pages/`: páginas de la app.
- `bakend/src/routes/`: rutas del API.
- `bakend/prisma/`: esquema y migraciones de base de datos.

---

## 11. Cómo probar el sistema

1. Arranca el backend.
2. Arranca el frontend.
3. Abre `http://localhost:5173`.
4. Para administrar el contenido, añade `/admin` al final de la URL del frontend e ingresa a `http://localhost:5173/admin`. Desde allí ve a `/admin/login` para iniciar sesión.

---