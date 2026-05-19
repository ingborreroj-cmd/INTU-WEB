import React, { useState } from 'react';
import { Save, X, RefreshCw, Image, Type } from 'lucide-react';
import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';

interface AdminModalProps {
  slides: HeroSlide[];
  onSave: (updatedSlides: HeroSlide[]) => void;
  onClose: () => void;
}

const HeroAdminModal: React.FC<AdminModalProps> = ({ slides, onSave, onClose }) => {
  const [editedSlides, setEditedSlides] = useState<HeroSlide[]>(slides);

  const handleInputChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...editedSlides];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSlides(updated);
  };

  const handleReset = () => {
    if (window.confirm('¿Seguro que deseas restaurar las imágenes y textos originales del INTU?')) {
      setEditedSlides(DEFAULT_SLIDES);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[30px] p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border-t-8 border-[#b8860b]">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-2xl font-montserrat font-bold text-[#003366]">Panel de Administración</h2>
            <p className="text-xs text-slate-500 mt-1">Modificación en tiempo real del carrusel principal</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 custom-scrollbar">
          {editedSlides.map((slide, idx) => (
            <div key={slide.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">Diapositiva #{idx + 1}</span>
              </div>
              
              <div className="space-y-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Type size={14} className="text-[#003366]" /> Título Principal
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#b8860b]" 
                  value={slide.label}
                  onChange={(e) => handleInputChange(idx, 'label', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Type size={14} className="text-[#003366]" /> Descripción Corta
                </label>
                <textarea 
                  rows={2} 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#b8860b]" 
                  value={slide.caption}
                  onChange={(e) => handleInputChange(idx, 'caption', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Image size={14} className="text-[#003366]" /> Ruta de la Imagen (`/assets/img/...`)
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white font-mono text-xs focus:outline-none focus:border-[#b8860b]" 
                  value={slide.imageUrl}
                  onChange={(e) => handleInputChange(idx, 'imageUrl', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 border-t pt-4">
          <button 
            onClick={handleReset}
            className="px-4 py-3 border border-dashed border-red-300 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2 order-3 sm:order-1"
          >
            <RefreshCw size={16} /> Restablecer originales
          </button>
          <div className="flex gap-3 w-full sm:justify-end order-1 sm:order-2">
            <button onClick={onClose} className="w-full sm:w-32 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Cancelar
            </button>
            <button 
              onClick={() => onSave(editedSlides)} 
              className="w-full sm:w-44 bg-[#003366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#b8860b] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
            >
              <Save size={16} /> Guardar Cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroAdminModal;