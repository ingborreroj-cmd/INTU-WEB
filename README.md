# 🚀 INTU WEB 2.0 - Manual Técnico

¡Bienvenido al repositorio oficial del proyecto **INTU WEB 2.0**. Esta plataforma representa la evolución digital del Instituto Nacional de Tierras Urbanas, fusionando robustez de backend (Django) con una interfaz moderna y reactiva.

---

## 🏗️ 1. Introducción
El proyecto **INTU WEB 2.0** es una plataforma moderna desarrollada para optimizar la gestión del Instituto Nacional de Tierras Urbanas. Utiliza una arquitectura de frontend basada en **React y TypeScript**, diseñada para integrarse perfectamente en el ecosistema existente (Python/Django) mediante componentes modulares y una interfaz inteligente potenciada por IA.

---

## 🛠️ 2. Arquitectura Tecnológica (Stack)
El desarrollo se fundamenta en las siguientes herramientas:

* **Lenguaje:** `TypeScript (TSX)` - Seguridad mediante tipado estático.
* **Librería Principal:** `React 19` - Interfaz declarativa y modular.
* **Estilos:** `Tailwind CSS` - Diseño responsivo y moderno.
* **Iconografía:** `Lucide-React` - Vectores ligeros y personalizables.
* **Inteligencia Artificial:** `SDK Google Generative AI (@google/genai)` - Motor de respuestas inteligentes.

---

## ⚙️ 3. Configuración del Entorno
Para el correcto funcionamiento local, asegúrate de tener instalado **Node.js**.

### Comandos Esenciales de Terminal
| Acción | Comando |
| :--- | :--- |
| **Instalar dependencias** | `npm install` |
| **Modo Desarrollo** | `npm run dev` |
| **Compilar para Producción** | `npm run build` |

### Librerías Requeridas
| Paquete | Versión | Función |
| :--- | :--- | :--- |
| `react` | `^19.0.0` | Núcleo de la interfaz |
| `lucide-react` | `^0.563.0` | Iconos del sistema |
| `@google/genai` | `^1.38.0` | Motor de IA (Gemini) |
| `vite` | `^6.0.0` | Compilación rápida |

---

## 🧩 4. Análisis de Componentes Principales

### 🏠 4.1. Estructura Global (`index.html`)
Es el punto de anclaje. Define los colores institucionales mediante variables CSS:
* **Azul Primario:** `#003366`
* **Dorado Acento:** `#b8860b`
* **Tipografía:** Montserrat (títulos) y Roboto (cuerpo).

### ℹ️ 4.2. Componente: `About` (Nuestra Razón de Ser)
* **Ubicación:** `components/About.tsx`
* **Funcionalidad:** Misión y visión con diseño asimétrico.
* **Técnica:** Diseño flexible (`flex-col lg:flex-row`) para adaptabilidad total.
* **Destacado:** Badge flotante: *"10+ años de logros"*.

### 📞 4.3. Componente: `Contact` (Módulo de Interacción)
* **Ubicación:** `components/Contact.tsx`
* **Lógica:** Componente controlado (Hook `useState`).
* **Flujo:** Al enviar, cambia el estado `submitted` a `true`, activando la animación `animate-fade-up` de éxito.



## 🛡️ 5. Guía de Mantenimiento y Seguridad

* **🔐 API Keys:** La llave de `Google GenAI` **debe** almacenarse en un archivo `.env` y nunca subirse a repositorios públicos.
* **🔄 Actualizaciones:** Ejecutar `npm update` periódicamente para mantener las dependencias de seguridad al día.
* **🖼️ Imágenes:** Actualmente el proyecto usa `picsum.photos` para rellenos visuales. Se deben sustituir por los activos institucionales en la carpeta `/public`.

---
*Documentación generada para INTU Web 2.0 - 2026*
