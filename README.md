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




4. Confirma que las dependencias se agregaron a `package.json` y `package-lock.json`.

---

## 3.3 ¿Dónde ejecutar cada comando?

- Comandos del frontend (`npm install`, `npm run dev`, `npm run build`) se ejecutan desde la raíz del proyecto: `INTU WEB`.
- Comandos del backend que inician el servidor se ejecutan desde `INTU WEB/bakend`.
- Comandos de Prisma deben ejecutarse desde la raíz del proyecto usando el backend local con `npx --prefix bakend ...`, para que se cargue el único `.env` global.
- Si tu terminal ya está en `INTU WEB/bakend`, usa primero `cd ..` o ejecuta Prisma con rutas relativas internas (`./prisma/schema.prisma`).
- No ejecutes `npx --prefix bakend prisma ... --schema bakend/prisma/schema.prisma` desde `INTU WEB/bakend`, porque el comando añadirá otra carpeta `bakend/` a la ruta y fallará con "file or directory not found".

Ejemplo desde la raíz:

```bash
cd "INTU WEB"
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
``` 

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
verifica estar en la ruta correcta sin bakend

```bash
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
```

Esto usa la versión de Prisma instalada en `bakend` y carga el `.env` global de la raíz.

La base de datos generada quedará en `bakend/prisma/db/intuweb_db.db`.



---

## 5. Crear usuario admin, SE EJECUTA DESDE LA RUTA DEL BAKEND INTU WEB/BAKEND

```bash
cd bakend
npm run create-admin -- --email admin@example.com --password Secret123 --name "INTU Admin"
```

Además de `name`, puedes usar estos datos opcionales para el usuario admin:

- `--lastName` para el apellido.
- `--username` para asignar un nombre de usuario de inicio de sesión.
- `--phone` para el teléfono de contacto.
- `--position` para el cargo o rol dentro del sistema.

> Para iniciar sesión usa el `email` o el `username`, junto con la `password` que pasaste al crear el admin.

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

> Importante: este bloque asume que el terminal está en la raíz `INTU WEB`.
> Si tu terminal ya está en `INTU WEB/bakend`, primero sube a la raíz con `cd ..` o usa rutas locales como:
>
> ```bash
> # desde INTU WEB/bakend
> npx prisma generate --schema ./prisma/schema.prisma
> npx prisma migrate dev --schema ./prisma/schema.prisma --name init
> ```
>
> Si no lo haces, el comando `npx --prefix bakend prisma ... --schema bakend/prisma/schema.prisma` intentará leer `bakend/bakend/prisma/schema.prisma` y fallará.
>
> El backend siempre usa el único `.env` en la raíz del proyecto. No crees ni uses `bakend/.env`.

```bash
# 
cd "INTU WEB"
# Genera Prisma usando la versión instalada en bakend y el env global de la raíz
npx --prefix bakend prisma generate --schema bakend/prisma/schema.prisma
npx --prefix bakend prisma migrate dev --schema bakend/prisma/schema.prisma --name init
# Luego entra al backend para iniciar el servidor
cd bakend
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