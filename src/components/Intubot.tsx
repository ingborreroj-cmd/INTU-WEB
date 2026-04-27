import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, HelpCircle } from 'lucide-react';

const INTUBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: '¡Hola! Soy el Asistente Virtual del INTU. ¿En qué puedo ayudarte hoy? Selecciona una opción o escribe tu duda.'}
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Base de datos de Preguntas Frecuentes
  const FAQ_DATA = [
    {
      keywords: ['título', 'tierra', 'propiedad', 'regularización'],
      response: "Para obtener tu Título de Adjudicación de Tierras, debes estar censado por un Comité de Tierra Urbana (CTU) y presentar copia de cédula y documento de ocupación previa."
    },
    {
      keywords: ['ctu', 'comité', 'comite', 'organizarse'],
      response: "Los CTU son la organización base. Para conformar uno, necesitas al menos 15 familias de tu comunidad y realizar una asamblea constitutiva avalada por el INTU."
    },
    {
      keywords: ['sede', 'donde queda', 'ubicación', 'direccion'],
      response: "Nuestra sede principal está en Caracas, Av. Francisco de Miranda, Edif. Minhvi. También tenemos gerencias estadales en todo el país."
    },
    {
      keywords: ['requisitos', 'documentos', 'papeles'],
      response: "Los requisitos básicos son: 1. Carta de residencia, 2. Copia de Cédula, 3. Croquis del sector y 4. Aval del CTU de tu comunidad."
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processResponse = (userText: string) => {
    const text = userText.toLowerCase();
    const match = FAQ_DATA.find(item => 
      item.keywords.some(key => text.includes(key))
    );

    setTimeout(() => {
      const botText = match 
        ? match.response 
        : "Lo siento, no tengo información específica sobre eso. Te sugiero acudir a la sede más cercana o llamar al 0800-MINHVI.";
      
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    }, 600);
  };

  const handleSend = (textOverride?: string) => {
    const msgToSend = textOverride || input.trim();
    if (!msgToSend) return;

    setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
    if (!textOverride) setInput('');
    
    processResponse(msgToSend);
  };

  const QuickOption = ({ text }: { text: string }) => (
    <button 
      onClick={() => handleSend(text)}
      className="text-[11px] bg-white border border-[#003366]/20 text-[#003366] px-3 py-1.5 rounded-full hover:bg-[#003366] hover:text-white transition-colors font-bold"
    >
      {text}
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
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
                  <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">FAQ Interactivo</span>
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
            <div ref={chatEndRef} />
          </div>

          {/* Sugerencias Rápidas */}
          <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-2 border-t border-gray-100">
            <QuickOption text="Título de Tierra" />
            <QuickOption text="¿Qué es un CTU?" />
            <QuickOption text="Requisitos" />
            <QuickOption text="Ubicación" />
          </div>

          {/* Input de Texto */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Escribe tu duda aquí..."
                className="flex-grow pl-4 pr-10 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()}
                className="p-3 bg-[#003366] text-white rounded-xl hover:bg-[#b8860b] transition-all"
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