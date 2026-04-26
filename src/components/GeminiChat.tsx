
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: '¡Hola! Soy el Asistente Virtual del INTU. ¿En qué puedo ayudarte hoy respecto a la regularización de tierras o trámites institucionales?'}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Correctly initializing GoogleGenAI according to @google/genai guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Eres el Asistente Virtual del Instituto Nacional de Tierras Urbanas (INTU) de Venezuela. Debes responder de forma institucional, amable y clara sobre procesos de regularización de tierras, Comités de Tierra Urbana (CTU) y trámites relacionados con el derecho a la ciudad. Usa un tono patriótico y servicial.",
        }
      });

      const botText = response.text || "Lo siento, no pude procesar tu solicitud. Por favor, intenta de nuevo o contacta a nuestras sedes.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Hubo un error de conexión. Por favor contacta al 0800-MINHVI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#003366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce hover:animate-none"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-[25px] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-fade-up">
          {/* Header */}
          <div className="bg-[#003366] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#b8860b] p-2 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Asistente INTU</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/70 uppercase font-bold">En línea</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-[#003366] text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <Loader2 className="animate-spin text-[#b8860b]" size={16} />
                  <span className="text-xs text-gray-400 italic font-medium">Procesando...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Escribe tu consulta aquí..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#003366] hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;