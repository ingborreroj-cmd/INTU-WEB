import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { API } from '../services/apiUtils';

// Definición estricta de la estructura que espera la API de Gemini
interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const INTUBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Historial local para renderizar en la interfaz (interfaz limpia para el usuario)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy el Asistente Virtual del INTU. Puedo ayudarte con información sobre trámites, requisitos de tierras urbanas y comités. ¿Qué necesitas saber?' }
  ]);

  // Historial estructurado que se le enviará a Gemini en el formato correcto
  const [apiHistory, setApiHistory] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: '¡Hola! Soy el Asistente Virtual del INTU. Puedo ayudarte con información sobre trámites, requisitos de tierras urbanas y comités. ¿Qué necesitas saber?' }] }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Bloqueo de scroll del body cuando la ventana de chat esté abierta
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const handleSend = async (textOverride?: string) => {
    const msgToSend = textOverride || input.trim();
    if (!msgToSend || isLoading) return;

    // 1. Actualizar interfaz con el mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
    if (!textOverride) setInput('');
    
    // 2. Encender estado de carga (reemplaza el texto "Pensando..." por un spinner elegante)
    setIsLoading(true);

    // 3. Preparar el nuevo mensaje en el formato exacto de Gemini
    const newUserMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: msgToSend }]
    };

    // Combinamos el historial existente con el nuevo mensaje del usuario
    const updatedHistory = [...apiHistory, newUserMessage];

    try {
      // 4. Petición a tu servidor backend
      const res = await fetch(`${API}/intu-bot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedHistory }) // Enviamos el historial completo estructurado
      });

      if (!res.ok) throw new Error('Error en la API del bot');

      const json = await res.json();
      const reply = json?.reply || 'Lo siento, en este momento no puedo procesar tu solicitud.';

      // 5. Si todo sale bien, añadimos la respuesta a la interfaz y al historial de la API
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setApiHistory([...updatedHistory, { role: 'model', parts: [{ text: reply }] }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Disculpa, tengo problemas para conectar con el servidor en este momento. Por favor, inténtalo más tarde.'
      }]);
    } finally {
      setIsLoading(false); // Apagar el estado de carga
    }
  };

  const QuickOption = ({ text }: { text: string }) => (
    <button 
      onClick={() => handleSend(text)}
      disabled={isLoading}
      className="text-[11px] bg-white border border-[#003366]/20 text-[#003366] px-3 py-1.5 rounded-full hover:bg-[#003366] hover:text-white transition-colors font-bold disabled:opacity-50"
    >
      {text}
    </button>
  );

  return (
    <div className="fixed bottom-20 right-6 z-[60]">
      {/* Botón Flotante */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#003366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce hover:animate-none border-2 border-white"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[25px] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-fade-up">
          {/* Header */}
          <div className="bg-[#003366] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#b8860b] p-2 rounded-xl rotate-3 shadow-lg">
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

          {/* Área de Mensajes */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#003366] text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {/* Spinner de carga cuando la IA está pensando */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 text-gray-400 text-xs font-semibold pl-2">
                <Loader2 size={16} className="animate-spin text-[#b8860b]" />
                INTUBot está procesando...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Sugerencias Rápidas Fijas */}
          <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-2 border-t border-gray-100">
            <QuickOption text="Título de tierra" />
            <QuickOption text="Regularizar local comercial" />
            <QuickOption text="Formar un CTU" />
            <QuickOption text="Requisitos generales" />
            <QuickOption text="Ubicación de Sedes" />
          </div>

          {/* Input de Texto */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                placeholder={isLoading ? "Espera un momento..." : "Escribe tu duda aquí..."}
                disabled={isLoading}
                className="flex-grow pl-4 pr-10 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all font-medium disabled:opacity-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="p-3 bg-[#003366] text-white rounded-xl hover:bg-[#b8860b] transition-all disabled:opacity-50"
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