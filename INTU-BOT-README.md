# INTU Bot - Integración con Gemini

Esta guía describe cómo funciona el proxy del INTU Bot, qué archivos son relevantes y qué variables de entorno se deben configurar.

## Archivos clave

- `bakend/src/llmProviders/gemini.ts`: adaptador que construye la petición a Gemini y extrae la respuesta.
- `bakend/src/llmProviders/index.ts`: selecciona el proveedor según `LLM_PROVIDER`.
- `bakend/src/routes/intuBot.ts`: ruta POST que expone la API del bot.
- `src/components/Intubot.tsx`: componente que envía el historial de chat al backend.

## Rutas disponibles en el backend

El backend monta la ruta del bot en varias rutas:

- `/intu-bot`
- `/api/intu-bot`
- `/{ADMIN_PATH}/intu-bot`

El frontend actual usa la ruta `${API}/intu-bot`, donde `API` viene de `VITE_API_URL`.

## Variables de entorno

- `LLM_PROVIDER`: proveedor LLM, actualmente `gemini`.
- `GEMINI_API_KEY`: clave de Gemini.
- `LLM_TEMPERATURE`: temperatura del modelo (por defecto `0.7`).
- `LLM_TOP_P`: top-p (por defecto `0.95`).
- `LLM_MAX_TOKENS`: máximo de tokens de salida (por defecto `450`).

> Estas variables se deben definir en el `.env` de la raíz del proyecto.

## Formato esperado del payload

El backend recibe el historial en `history`:

```json
{
  "history": [
    { "role": "user", "parts": [{ "text": "..." }] },
    { "role": "model", "parts": [{ "text": "..." }] }
  ]
}
```

En el frontend, `src/components/Intubot.tsx` envía esta estructura con roles `user` y `model`.

## Flujo de la petición

1. El cliente envía el historial completo a `/intu-bot`.
2. El backend valida `body.history`.
3. `getProviderAdapter()` selecciona el adaptador `gemini`.
4. El adaptador llama a Gemini y procesa la respuesta.
5. El backend responde con `{ reply: text, raw }`.

## Detalles del adaptador Gemini

- Usa la URL de la API de Gemini.
- Construye el prompt con un mensaje de sistema para que el asistente responda como representante del INTU.
- Envía la petición con `instances` y `parameters`.
- Extrae el texto principal de la respuesta de Gemini.

## Manejo de errores

- Si falta `GEMINI_API_KEY`, la petición falla con un error claro.
- Si Gemini devuelve un error HTTP, el backend responde con `500`.
- Si `history` no está presente o está vacío, el backend responde con `400`.

## Prueba rápida

1. Configura las variables en `.env`:

```text
GEMINI_API_KEY=tu_clave_gemini
LLM_PROVIDER=gemini
```

2. Inicia el backend:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB\bakend"
npm run dev
```

3. Inicia el frontend:

```powershell
cd "c:\Users\DPain\Desktop\Prototipos web intu\INTU WEB"
npm run dev
```

4. Abre el sitio y prueba el INTU Bot.

## Recomendaciones

- Mantén `GEMINI_API_KEY` fuera del repositorio.
- Protege las rutas si el bot no debe ser público.
- Ajusta el `rateLimit` en el backend si necesitas controlar el tráfico.
- Revisa que `JWT_SECRET` no sea el valor por defecto.

## Extensiones futuras

- Añadir adaptadores para otros proveedores como `openai`.
- Guardar contexto o persistencia de conversaciones.
- Mejorar la UI del chat con streaming o respuestas en tiempo real.


