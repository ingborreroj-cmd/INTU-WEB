import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList, CheckCircle2, X, BarChart3 } from 'lucide-react';

interface SurveyQuestion {
  id: string;
  label: string;
  type: 'radio' | 'text';
  options?: string[];
  placeholder?: string;
}

const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'navigation',
    label: '¿Cómo calificarías la navegación del sitio web?',
    type: 'radio',
    options: ['Excelente', 'Buena', 'Aceptable', 'Difícil', 'Muy difícil'],
  },
  {
    id: 'useful_section',
    label: '¿Qué sección te pareció más útil?',
    type: 'radio',
    options: ['Inicio', 'Servicios', 'Trámites', 'Noticias', 'Contacto'],
  },
  {
    id: 'improvement',
    label: '¿Qué mejorarías en la página?',
    type: 'text',
    placeholder: 'Escribe una idea de mejora o sugerencia...',
  },
  {
    id: 'updates',
    label: '¿Te gustaría recibir noticias sobre actualizaciones del sitio?',
    type: 'radio',
    options: ['Sí', 'No'],
  },
];

const Encuestas: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const activeQuestion = useMemo(() => SURVEY_QUESTIONS[currentStep], [currentStep]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    const openListener = () => setIsOpen(true);
    window.addEventListener('openEncuesta', openListener as EventListener);
    return () => window.removeEventListener('openEncuesta', openListener as EventListener);
  }, []);

  const handleSelectOption = (value: string) => {
    setResponses(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const handleInputChange = (value: string) => {
    setResponses(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const handleNext = () => {
    if (!responses[activeQuestion.id]) return;
    if (currentStep + 1 < SURVEY_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
      return;
    }
    setSubmitted(true);
    localStorage.setItem('intu_web_survey', JSON.stringify({ answers: responses, date: new Date().toISOString() }));
  };

  const handleRestart = () => {
    setResponses({});
    setCurrentStep(0);
    setSubmitted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#FFC907] px-4 py-3 text-white shadow-2xl transition hover:scale-105"
        >
          <ClipboardList size={20} />
          Encuesta
        </button>
      )}

      {isOpen && (
        <div className="w-[320px] sm:w-[380px] rounded-[28px] border border-slate-200 bg-white shadow-2xl overflow-hidden animate-fade-up">
          <div className="flex items-center justify-between bg-[#273376] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-[#FFC907] p-2 rounded-xl shadow-lg">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#f8f1e0]">Encuesta</p>
                <h3 className="text-lg font-black">Opinión del sitio</h3>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition">
              <X size={18} />
            </button>
          </div>

          <div className="p-5">
            <div className="mb-4 rounded-3xl bg-[#f8fafc] p-4 text-sm text-slate-700">
              <p className="font-semibold">Responde estas preguntas rápidas.</p>
              <p className="mt-2 text-xs text-slate-500">Esta ventana es una base lista para ir ampliando más encuestas y opiniones.</p>
            </div>

            {submitted ? (
              <div className="space-y-4">
                <div className="rounded-3xl border border-[#273376]/10 bg-[#f8fafc] p-4 text-slate-700">
                  <p className="font-semibold text-[#273376]">¡Gracias por participar!</p>
                  <p className="mt-2 text-sm text-slate-600">Tus respuestas se guardaron localmente como base para mejoras futuras.</p>
                </div>
                <div className="space-y-3">
                  {SURVEY_QUESTIONS.map(question => (
                    <div key={question.id} className="rounded-3xl border border-slate-200 bg-white p-3 text-sm">
                      <p className="font-semibold text-slate-700">{question.label}</p>
                      <p className="mt-2 text-slate-600">{responses[question.id] || 'No respondida'}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleRestart}
                  className="w-full rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d2f5a] transition"
                >
                  Completar nuevamente
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-3">{activeQuestion.label}</p>
                  {activeQuestion.type === 'radio' && (
                    <div className="space-y-2">
                      {activeQuestion.options?.map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSelectOption(option)}
                          className={`w-full text-left rounded-2xl border px-4 py-3 text-sm transition ${responses[activeQuestion.id] === option ? 'border-[#273376] bg-[#273376] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  {activeQuestion.type === 'text' && (
                    <textarea
                      rows={4}
                      value={responses[activeQuestion.id] || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={activeQuestion.placeholder}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#273376] transition"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep > 0) setCurrentStep(currentStep - 1);
                    }}
                    disabled={currentStep === 0}
                    className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition disabled:opacity-60"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d2f5a] transition"
                  >
                    {currentStep + 1 < SURVEY_QUESTIONS.length ? 'Siguiente' : 'Enviar'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 px-5 py-3 bg-[#f8fafc] text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} />
              Base lista para incluir preguntas nuevas y más campos de encuesta.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encuestas;
