INTU Bot - Integración LLM (Gemini)

Resumen

Este documento describe cómo está implementado el backend proxy para el `INTU Bot` y cómo cambiar el proveedor LLM (actualmente preparado para `gemini`). Contiene instrucciones para usar, configurar y extender el sistema.

Archivos añadidos

- `bakend/src/llmProviders/gemini.ts`  — Adaptador básico para llamar a la API de Gemini.
- `bakend/src/llmProviders/index.ts`  — Selector de adaptador según `LLM_PROVIDER`.
- `bakend/src/routes/intuBot.ts`     — Ruta POST `/api/intu-bot` y `/admin/intu-bot` que actúa como proxy.
- `src/components/Intubot.tsx`       — Actualizado para enviar mensajes a `/api/intu-bot`.

Variables de entorno necesarias

- `LLM_PROVIDER` — Nombre del proveedor. Ejemplo: `gemini` (por defecto).
- `GEMINI_API_KEY` — API key para Gemini.
- `GEMINI_API_URL` — (Opcional) Endpoint de Gemini. Por defecto se usa `https://api.gemini.example/v1/generate`.
- `LLM_MAX_TOKENS` — (Opcional) Límite de tokens por respuesta. Default `512`.
- `LLM_TEMPERATURE` — (Opcional) Temperatura/aleatoriedad. Default `0.2`.

Cómo funciona

1. El frontend envía un POST a `/api/intu-bot` con el cuerpo:

```json
{
  "messages": [{ "role": "user|assistant|system", "content": "..." }],
  "conversationId": "optional-id"
}
```

2. El backend selecciona el adaptador según `LLM_PROVIDER` y llama `sendMessage(messages, { conversationId })`.
3. El adaptador hace la llamada a la API del proveedor, normaliza la respuesta y devuelve `{ text, raw }`.
4. El backend retorna `{ reply: text, raw }` al frontend.

Notas de implementación

- El adaptador `gemini.ts` es un esqueleto: la forma exacta de la petición y la respuesta depende de la API real de Gemini. Actualiza `GEMINI_API_URL` y el parseo de `json` para adaptarlo a la estructura real (por ejemplo `json.output` o `json.choices`).
- El archivo `bakend/src/llmProviders/index.ts` selecciona `gemini` por defecto. Para añadir proveedores, crea `bakend/src/llmProviders/<provider>.ts` que exporte `sendMessage(messages, opts)` y añade el case en `getProviderAdapter()`.

Seguridad y producción

- Protege la ruta con autenticación si no quieres que sea pública. Actualmente está disponible en `/api/intu-bot` y `/admin/intu-bot`.
- Añade rate limiting y logs de uso para monitorizar consumo.
- No comites tus claves en el repositorio; usa un archivo `.env` local o variables de entorno en despliegue.

Pruebas rápidas

1. Configura variables de entorno localmente:

```powershell
$env:GEMINI_API_KEY = "sk-..."
$env:LLM_PROVIDER = "gemini"
```

2. Inicia backend desde `bakend` y frontend en la raíz del proyecto.
3. Abre la web y prueba preguntas en el `INTUBot`.

Soporte futuro

- Streaming: implementar SSE o respuestas chunked para mostrar la respuesta en tiempo real.
- Persistencia: añadir `BotConversation` en Prisma para almacenar contexto de conversaciones si se desea mantener estado entre sesiones.
- Adaptadores: añadir `openai.ts`, `deepseek.ts` siguiendo el patrón de `gemini.ts`.

Contacto

Si necesitas que implemente el adaptador real para Gemini o que añada persistencia/streaming, dime y lo hago.
