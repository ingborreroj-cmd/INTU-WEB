INTU Bot - integración con Gemini

Este documento explica cómo está montado el proxy de backend para el `INTU Bot`, qué archivos son los relevantes y qué variables de entorno usa. El foco actual está en el adaptador de Gemini.

Archivos clave

- `bakend/src/llmProviders/gemini.ts` — Adaptador que construye la petición para Gemini y extrae la respuesta.
- `bakend/src/llmProviders/index.ts` — Selector de proveedor según `LLM_PROVIDER`.
- `bakend/src/routes/intuBot.ts` — Ruta POST que expone el bot como API.
- `src/components/Intubot.tsx` — Componente del chat que envía el historial al backend.

Rutas disponibles

La ruta del bot está montada en el servidor en:

- `/intu-bot`
- `/api/intu-bot`
- `/admin/intu-bot`

El frontend usa `/api/intu-bot`.

Variables de entorno

- `LLM_PROVIDER` — Proveedor de LLM. Actualmente solo `gemini`.
- `GEMINI_API_KEY` — Clave para acceder a la API de Gemini.
- `LLM_TEMPERATURE` — Temperatura del modelo. Valor por defecto `0.7`.
- `LLM_TOP_P` — Valor de top-p para la generación. Valor por defecto `0.95`.
- `LLM_MAX_TOKENS` — Máximo de tokens de salida. Valor por defecto `450`.

Formato del payload

El backend espera un cuerpo con el historial en `history`:

```json
{
  "history": [
    { "role": "user", "parts": [{ "text": "..." }] },
    { "role": "model", "parts": [{ "text": "..." }] }
  ]
}
```

En el frontend se construye ese historial usando `{ role: 'user' | 'model', parts: [{ text }] }`.

Internamente el backend convierte ese historial en un prompt de texto y llama a Gemini con `instances` y `parameters`, que es el formato compatible con la API actual.

Flujo de la petición

1. El cliente envía el historial completo a `/api/intu-bot`.
2. El backend lee `body.history` y valida que sea un arreglo no vacío.
3. `getProviderAdapter()` selecciona el adaptador para `gemini`.
4. El adaptador llama a Gemini, procesa la respuesta y devuelve `{ text, raw }`.
5. El backend responde con `{ reply: text, raw }`.

Detalles del adaptador de Gemini

- Usa la URL fija: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateText?key=${GEMINI_API_KEY}`.
- Construye el prompt con un mensaje de sistema para que el asistente responda como representante del INTU.
- Envía los mensajes en el formato que espera Gemini.
- Extrae el texto principal de `json.candidates[0].content`, `json.candidates[0].output.text` o `json.outputText`.

Manejo de errores

- Si falta `GEMINI_API_KEY`, el adaptador falla con un mensaje claro.
- Si Gemini devuelve un error HTTP, el backend registra el fallo y responde con `500`.
- Si la solicitud de frontend no incluye `history` o está vacío, el backend responde `400`.

Recomendaciones para producción

- Mantén `GEMINI_API_KEY` fuera del repositorio y en un `.env` local o en las variables de entorno del despliegue.
- Protege las rutas del bot si no deben ser públicas.
- Ajusta `rateLimit` y agrega registros de uso para monitorear acceso y consumo.
- Revisa `JWT_SECRET` en el archivo raíz `.env` para no dejar el valor por defecto.

Prueba rápida

1. Define las variables de entorno:

```powershell
$env:GEMINI_API_KEY = "sk-..."
$env:LLM_PROVIDER = "gemini"
```

2. Arranca el backend desde `bakend`.
3. Arranca el frontend desde la raíz del proyecto.
4. Abre el chat del INTU Bot y prueba una consulta.

Extensión futura

- Añadir adaptadores para otros proveedores como `openai`.
- Implementar persistencia de conversaciones si se quiere guardar contexto entre sesiones.
- Mejorar el UI del chat con respuestas en tiempo real o streaming.


