# INTU WEB

Guía rápida para instalar y ejecutar el sistema completo en local.

---

## 1. Qué contiene este repositorio

- `src/`: frontend en **React + TypeScript** con Vite.
- `bakend/`: backend en **Express + TypeScript + Prisma + SQLite**.
- `public/`: activos estáticos usados por el frontend.

---

## 2. Requisitos previos

- Node.js instalado (versión 18+ recomendada).
- npm disponible en el sistema.

---

## 3. Instalación inicial

> Nota: este repositorio usa un único archivo de entorno global:
> - `./.env` para las variables del frontend / Vite y para las variables del backend y Prisma.

### 3.1 Frontend

```bash
cd "c:/Users/DPain/Desktop/Prototipos web intu/INTU WEB"
npm install
```

### 3.2 Backend

```bash
cd "c:/Users/DPain/Desktop/Prototipos web intu/INTU WEB/bakend"
npm install
```

### 3.3 Dependencias del proyecto (PASO MANUAL)

Paso a paso:

1. Abre una terminal en la raíz del proyecto:

```bash
cd "c:/Users/DPain/Desktop/Prototipos web intu/INTU WEB"
```

2. Instala las dependencias de producción que necesita el frontend y backend:

```bash
npm install @prisma/client @vis.gl/react-google-maps bcrypt cookie-parser cors dotenv express express-rate-limit helmet jsonwebtoken leaflet lucide-react multer react react-dom react-leaflet react-router-dom
```

3. Instala las dependencias de desarrollo necesarias para TypeScript, Vite, ESLint y Prisma:

```bash
npm install -D @types/bcrypt @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/leaflet @types/react @types/react-dom @types/multer @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-react eslint prisma ts-node-dev typescript vite
```

4. Confirma que las dependencias se agregaron a `package.json` y `package-lock.json`.


---

## 4. Configurar backend

1. Copiar el archivo de ejemplo global de entorno:

```bash
cd "c:/Users/DPain/Desktop/Prototipos web intu/INTU WEB"
# macOS / Linux / Git Bash
cp .env.example .env
# Windows PowerShell
Copy-Item .env.example .env
# cmd
copy .env.example .env
```

2. Instalar las dependencias del backend:

```bash
cd bakend
npm install
cd ..
```

3. Generar el cliente Prisma y aplicar la migración usando el env global de la raíz:

```bash
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
```

Esto usa la versión de Prisma instalada en `bakend` y carga el `.env` global de la raíz.

La base de datos generada quedará en `bakend/prisma/db/intuweb_db.db`.

> Nota: en el env global de la raíz, usa `DATABASE_URL=file:./db/intuweb_db.db`.

---

## 5. Crear usuario admin

```bash
cd bakend
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Además de `name`, puedes usar estos datos opcionales para el usuario admin:

- `--lastName` para el apellido.
- `--username` para asignar un nombre de usuario de inicio de sesión.
- `--phone` para el teléfono de contacto.
- `--position` para el cargo o rol dentro del sistema.

Ejemplo completo:

```bash
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU" --lastName "Admin" --username "intuadmin" --phone "0414-1234567" --position "Administrador"
```

---

## 6. Ejecutar en modo desarrollo

Debes tener **dos terminales abiertas** simultáneamente: una para el frontend (raíz del proyecto) y otra para el backend (carpeta `bakend`). A continuación los comandos recomendados.

Terminal 1 — Frontend (desde la raíz del repositorio):

```bash
# Sitúate en la raíz del proyecto
cd "INTU WEB"
# Inicia el servidor de desarrollo del frontend
npm run dev
```

Terminal 2 — Backend (desde la carpeta `bakend`):

```bash
# Abre un segundo terminal y entra en la carpeta del backend
cd "INTU WEB/bakend"
# (solo la primera vez) instala dependencias y genera Prisma
npm install
npx prisma generate
# Ejecuta migraciones si aún no se ha creado la DB local
npx prisma migrate dev --name init
# Inicia el servidor de desarrollo del backend
npm run dev
```

Ambos servidores deben quedar ejecutándose al mismo tiempo. El frontend escucha por defecto en `http://localhost:5173` y el backend en `http://localhost:4000`.

## 7. URLs principales

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`
 - Admin (panel de administración): `http://localhost:5173/admin` (login en `/admin/login`)

---

## 8. Notas importantes

- No subas el archivo `.env` al repositorio.
- Usa un valor seguro en `JWT_SECRET`.
- En producción, desactiva o protege el endpoint `/admin/auth/register`.
- Si el backend está en otra máquina, actualiza `ALLOWED_ORIGINS` en el archivo raíz `.env`.

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