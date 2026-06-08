export interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export interface GeminiResponse {
  text: string;
  raw?: any;
}

export async function sendMessage(messages: Message[], opts?: { conversationId?: string }): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateText?key=${apiKey}`;

  const systemPrompt = "Eres el asistente virtual oficial del Instituto Nacional de Tierras Urbanas (INTU). Responde en español de forma clara, precisa y profesional. Si la consulta requiere explicación, ofrece un párrafo completo con la información esencial, ejemplos prácticos y pasos concretos. Evita respuestas demasiado cortas; responde con la extensión necesaria para resolver la duda sin irte por las ramas. Si no puedes ayudar, di brevemente que solo puedes dar información del INTU.";

  const promptText = [
    `Sistema: ${systemPrompt}`,
    ...messages.map(message => {
      const roleLabel = message.role === 'user' ? 'Usuario' : 'INTUBot';
      return `${roleLabel}: ${message.parts.map(part => part.text).join(' ')}`;
    }),
    'INTUBot:'
  ].join('\n\n');

  const payload = {
    instances: [
      {
        content: [
          {
            type: 'text',
            text: promptText
          }
        ]
      }
    ],
    parameters: {
      temperature: Number(process.env.LLM_TEMPERATURE || 0.7),
      topP: Number(process.env.LLM_TOP_P || 0.95),
      maxOutputTokens: Number(process.env.LLM_MAX_TOKENS || 450)
    }
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const json = await res.json();

  const text =
    json?.candidates?.[0]?.content?.map((item: any) => item.text || item.parts?.[0]?.text || '')?.join('') ||
    json?.candidates?.[0]?.output?.text ||
    json?.outputText ||
    json?.predictions?.[0]?.content?.map((item: any) => item.text || item.parts?.[0]?.text || '')?.join('') ||
    json?.outputs?.[0]?.content?.map((item: any) => item.text || item.parts?.[0]?.text || '')?.join('') ||
    json?.outputs?.[0]?.message?.content?.map((item: any) => item.text || item.parts?.[0]?.text || '')?.join('') ||
    'Lo siento, no pude procesar una respuesta.';

  return { text, raw: json };
}