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

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = {
    parts: [{ text: "Eres el asistente virtual oficial del Instituto Nacional de Tierras Urbanas (INTU). Tu objetivo es guiar a los usuarios de forma amable, concisa y directa sobre trámites de regularización de tierras, requisitos y comités de tierra urbana (CTU). Responde estrictamente en español. Si te preguntan sobre temas completamente ajenos a la institución, indica cortésmente que solo puedes asistir con información del INTU." }]
  };

  const payload = {
    contents: messages,
    systemInstruction: systemInstruction,
    generationConfig: {
      temperature: Number(process.env.LLM_TEMPERATURE || 0.3),
      maxOutputTokens: Number(process.env.LLM_MAX_TOKENS || 512)
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
  
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, no pude procesar una respuesta.';

  return { text, raw: json };
}