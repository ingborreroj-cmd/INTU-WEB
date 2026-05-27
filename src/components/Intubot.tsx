import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, HelpCircle } from 'lucide-react';

const INTUBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: '¡Hola! Soy el Asistente Virtual del INTU. Puedo ayudarte con información sobre trámites, requisitos y guiarte paso a paso. ¿Qué necesitas saber?'}
  ]);
  const [input, setInput] = useState('');
  const [conversationState, setConversationState] = useState<{
    activeFlow: string | null;
    step: number;
    data: Record<string, any>;
  }>({ activeFlow: null, step: 0, data: {} });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Flujos de conversación para trámites
  const CONVERSATION_FLOWS = {
    'titulo_tierra': {
      steps: [
        { question: '¿Estás censado por un Comité de Tierra Urbana (CTU)?', key: 'censado_ctu', options: ['Sí', 'No'] },
        { question: '¿Tienes copia de tu cédula de identidad?', key: 'cedula', options: ['Sí', 'No'] },
        { question: '¿Posees documento de ocupación previa de la tierra?', key: 'ocupacion_previa', options: ['Sí', 'No'] },
        { question: '¿Dónde está ubicada tu propiedad? (Estado/Ciudad)', key: 'ubicacion', type: 'text' },
        { question: '¿Cuántas familias conforman tu comunidad?', key: 'familias', type: 'number' }
      ],
      finalMessage: 'Gracias por la información. Basado en tus respuestas, te recomendamos los siguientes pasos para obtener tu Título de Adjudicación de Tierras. Acude a la sede del INTU más cercana con los documentos requeridos.'
    },
    'ctu_formacion': {
      steps: [
        { question: '¿Cuántas familias hay en tu comunidad?', key: 'familias_comunidad', type: 'number' },
        { question: '¿Han realizado una asamblea constitutiva?', key: 'asamblea', options: ['Sí', 'No'] },
        { question: '¿Tienen un croquis del sector?', key: 'croquis', options: ['Sí', 'No'] },
        { question: '¿Cuál es el nombre de tu comunidad?', key: 'nombre_comunidad', type: 'text' }
      ],
      finalMessage: 'Para conformar un CTU, necesitas al menos 15 familias y realizar una asamblea constitutiva avalada por el INTU. Te ayudaremos en el proceso.'
    }
  };

  // Base de datos de respuestas simples extraídas de los trámites
  const FAQ_DATA = [
    {
      keywords: ['título', 'tierra', 'propiedad', 'regularización'],
      response: "Para tramitar tu título de propiedad necesitas copia de cédula, carpeta oficio, documento de ocupación y constancia de residencia. ¿Quieres saber el siguiente paso?",
      action: 'start_flow',
      flow: 'titulo_tierra'
    },
    {
      keywords: ['local comercial', 'local', 'comercial', 'regularizar'],
      response: "Para regularizar un local comercial debes llevar la documentación requerida a la gerencia estatal y completar el proceso de asesoría. ¿Quieres más detalles sobre los documentos?"
    },
    {
      keywords: ['ctu', 'comité', 'comite', 'formar', 'conformar'],
      response: "Para formar un CTU necesitas una asamblea constitutiva y un grupo organizado de vecinos. El INTU te guía con los pasos y los requisitos básicos.",
      action: 'start_flow',
      flow: 'ctu_formacion'
    },
    {
      keywords: ['requisitos', 'documentos', 'papeles', 'necesito'],
      response: "Los requisitos suelen incluir cédula, constancia de residencia, croquis del sector y aval del CTU o comité local. ¿Para qué trámite es tu consulta?"
    },
    {
      keywords: ['tramites', 'procedimientos', 'que puedo hacer', 'servicios'],
      response: "El INTU ofrece trámites como título de tierras, regularización de locales comerciales, formación de CTU y asesoría técnica. Puedes preguntar por cualquiera de ellos."
    },
    {
      keywords: ['sede', 'donde queda', 'ubicación', 'direccion', 'oficina'],
      response: "Nuestra sede principal está en Caracas y también operamos a través de gerencias estadales. Indica tu estado y te oriento mejor."
    },
    {
      keywords: ['costo', 'pago', 'precio', 'cuanto cuesta'],
      response: "Los trámites del INTU no generan costos directos de gestión. Si necesitas, te explico qué documentos llevar."
    },
    {
      keywords: ['tiempo', 'cuanto tarda', 'duracion'],
      response: "Los tiempos dependen del trámite y de los documentos completos. En general, la respuesta oficial se libera una vez que entregas toda la documentación."
    },
    {
      keywords: ['telefono', 'llamar', 'contacto'],
      response: "Puedes consultarnos usando el chat o visitar la sede del INTU. También está disponible el canal de atención telefónica oficial."
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Bloqueo de scroll del body cuando la ventana de chat esté abierta
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const processResponse = (userText: string) => {
    const text = userText.toLowerCase();

    // Si estamos en un flujo activo, procesar la respuesta del usuario
    if (conversationState.activeFlow) {
      const flow = CONVERSATION_FLOWS[conversationState.activeFlow as keyof typeof CONVERSATION_FLOWS];
      const currentStep = flow.steps[conversationState.step];

      // Guardar la respuesta del usuario
      setConversationState(prev => ({
        ...prev,
        data: { ...prev.data, [currentStep.key]: userText },
        step: prev.step + 1
      }));

      // Si hay más pasos, hacer la siguiente pregunta
      if (conversationState.step + 1 < flow.steps.length) {
        setTimeout(() => {
          const nextStep = flow.steps[conversationState.step + 1];
          setMessages(prev => [...prev, { role: 'bot', text: nextStep.question }]);
        }, 600);
      } else {
        // Flujo completado
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'bot', text: flow.finalMessage }]);
          setConversationState({ activeFlow: null, step: 0, data: {} });
        }, 600);
      }
      return;
    }

    // Buscar coincidencia en FAQ
    const match = FAQ_DATA.find(item => 
      item.keywords.some(key => text.includes(key))
    );

    setTimeout(() => {
      const botText = match 
        ? match.response 
        : "Lo siento, no tengo información específica sobre eso. Te sugiero acudir a la sede más cercana o llamar al 0800-MINHVI. ¿En qué más puedo ayudarte?";
      
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);

      // Si hay una acción, ejecutarla
      if (match?.action === 'start_flow' && match.flow) {
        setTimeout(() => {
          const flow = CONVERSATION_FLOWS[match.flow as keyof typeof CONVERSATION_FLOWS];
          if (flow) {
            setConversationState({ activeFlow: match.flow, step: 0, data: {} });
            setMessages(prev => [...prev, { role: 'bot', text: flow.steps[0].question }]);
          }
        }, 1200);
      }
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
            {conversationState.activeFlow ? (
              (() => {
                const flow = CONVERSATION_FLOWS[conversationState.activeFlow as keyof typeof CONVERSATION_FLOWS];
                const currentStep = flow.steps[conversationState.step];
                if (currentStep?.options) {
                  return currentStep.options.map(option => (
                    <QuickOption key={option} text={option} />
                  ));
                }
                return null;
              })()
            ) : (
              <>
                <QuickOption text="Título de tierra" />
                <QuickOption text="Regularizar local" />
                <QuickOption text="Formar CTU" />
                <QuickOption text="Requisitos" />
                <QuickOption text="Sedes" />
              </>
            )}
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