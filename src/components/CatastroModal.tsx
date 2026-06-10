import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import catastroData from '../data/services_castro_data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CatastroModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[18px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3 className="text-2xl font-montserrat font-extrabold text-[#273376]">{catastroData.title}</h3>
            <p className="text-sm text-slate-600 mt-1">Información oficial sobre el Catastro Popular</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-red-500 p-2">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h4 className="font-bold text-[#273376] mb-2">¿QUÉ ES EL CATASTRO POPULAR?</h4>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{catastroData.definition}</p>
          </section>

          <section>
            <h4 className="font-bold text-[#273376] mb-3">Características que lo hacen único</h4>
            <ul className="space-y-3">
              {catastroData.features.map((f, idx) => (
                <li key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#FFC907]">
                  <h5 className="font-semibold text-[#273376]">{f.title}</h5>
                  <p className="text-sm text-slate-700 mt-1">{f.content}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-[#273376] mb-2">¿Por qué es importante para tu Comuna?</h4>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{catastroData.importance}</p>
          </section>

          <section>
            <h4 className="font-bold text-[#273376] mb-2">Reflexión Comunal</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{catastroData.reflection}</p>
          </section>

          <section>
            <h4 className="font-bold text-[#273376] mb-2">Ideas para redes sociales</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {catastroData.socialIdeas.map((idea, i) => (
                <li key={i}>{idea}</li>
              ))}
            </ul>
          </section>

          <div className="pt-4">
            <button onClick={onClose} className="bg-[#273376] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#FFC907] transition-all">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatastroModal;
