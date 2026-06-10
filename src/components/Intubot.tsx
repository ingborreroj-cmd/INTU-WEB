import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { API } from '../services/apiUtils';

interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const INTUBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy el Asistente Virtual del INTU. Puedo ayudarte con información sobre trámites, requisitos de tierras urbanas y comités. ¿Qué necesitas saber?' }
  ]);

  const [apiHistory, setApiHistory] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: '¡Hola! Soy el Asistente Virtual del INTU. Puedo ayudarte con información sobre trámites, requisitos de tierras urbanas y comités. ¿Qué necesitas saber?' }] }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const handleSend = async (textOverride?: string) => {
    const msgToSend = textOverride || input.trim();
    if (!msgToSend || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
    if (!textOverride) setInput('');
    
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: msgToSend }]
    };

    const updatedHistory = [...apiHistory, newUserMessage];

    try {
      const res = await fetch(`${API}/intu-bot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedHistory })
      });

      if (!res.ok) throw new Error('Error en la API del bot');

      const json = await res.json();
      const reply = json?.reply || 'Lo siento, en este momento no puedo procesar tu solicitud.';

      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setApiHistory([...updatedHistory, { role: 'model', parts: [{ text: reply }] }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Disculpa, tengo problemas para conectar con el servidor en este momento. Por favor, inténtalo más tarde.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickOption = ({ text }: { text: string }) => (
    <button 
      onClick={() => handleSend(text)}
      disabled={isLoading}
      className="text-[11px] bg-white border border-[#273376]/20 text-[#273376] px-3 py-1.5 rounded-full hover:bg-[#273376] hover:text-white transition-colors font-bold disabled:opacity-50"
    >
      {text}
    </button>
  );

  return (
    <div className="fixed bottom-20 right-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#273376] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce hover:animate-none border-2 border-white"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[25px] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-fade-up">
          <div className="bg-[#273376] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#FFC907] p-2 rounded-xl rotate-3 shadow-lg">
                <Bot size={22} />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-tighter">INTUBot</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Asistente de IA</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 p-1.5 rounded-lg hover:bg-red-500 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#273376] text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start items-center gap-2 text-gray-400 text-xs font-semibold pl-2">
                <Loader2 size={16} className="animate-spin text-[#FFC907]" />
                INTUBot está procesando...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-2 border-t border-gray-100">
            <QuickOption text="Título de tierra" />
            <QuickOption text="Regularizar local comercial" />
            <QuickOption text="Formar un CTU" />
            <QuickOption text="Requisitos generales" />
            <QuickOption text="Ubicación de Sedes" />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                placeholder={isLoading ? "Espera un momento..." : "Escribe tu duda aquí..."}
                disabled={isLoading}
                className="flex-grow pl-4 pr-10 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#273376]/20 transition-all font-medium disabled:opacity-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="p-3 bg-[#273376] text-white rounded-xl hover:bg-[#FFC907] transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-2 font-bold uppercase tracking-widest">
              Instituto Nacional de Tierras Urbanas - 2026
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default INTUBot;