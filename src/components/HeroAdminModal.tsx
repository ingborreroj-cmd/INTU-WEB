import React, { useState, useEffect } from 'react';
import { Save, X, RefreshCw, Type, Plus, Trash2, Upload, FileImage } from 'lucide-react';
import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';

interface AdminModalProps {
  slides: HeroSlide[];
  onSave: (updatedSlides: HeroSlide[]) => void;
  onClose: () => void;
}

const HeroAdminModal: React.FC<AdminModalProps> = ({ slides, onSave, onClose }) => {
  const [editedSlides, setEditedSlides] = useState<HeroSlide[]>(JSON.parse(JSON.stringify(slides)));

  // Bloqueo de scroll del body mientras el modal de administrador del Hero esté abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleInputChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...editedSlides];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSlides(updated);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert('La imagen excede los 2.5MB. Suba un archivo optimizado para no ralentizar la carga web.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleInputChange(index, 'imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now(),
      imageUrl: '',
      label: 'Nuevo Logro Institucional',
      caption: 'Ingrese la descripción del impacto de esta gestión.'
    };
    setEditedSlides([...editedSlides, newSlide]);
  };

  const handleRemoveSlide = (index: number) => {
    if (editedSlides.length <= 1) {
      alert('Debe existir al menos una (1) diapositiva para no romper la composición visual.');
      return;
    }
    if (window.confirm('¿Desea dar de baja esta diapositiva del carrusel de inicio?')) {
      setEditedSlides(editedSlides.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] p-6 md:p-8 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border-t-4 border-[#b8860b]">
        
        <div className="flex justify-between items-center mb-4 border-b pb-3 shrink-0">
          <div>
            <h2 className="text-xl font-montserrat font-extrabold text-[#003366] tracking-tight">Consola de Control del Hero</h2>
            <p className="text-xs text-slate-500 mt-0.5">Gestión de multimedia y mensajería institucional en tiempo real</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-600 transition-colors"><X size={22} /></button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 my-3 scrollbar-thin">
          {editedSlides.map((slide, idx) => (
            <div key={slide.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b8860b]">Sección #{idx + 1}</span>
                <button onClick={() => handleRemoveSlide(idx)} className="text-slate-400 hover:text-red-600 text-xs font-semibold flex items-center gap-1">
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Type size={12} /> Título Superior</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={slide.label} onChange={(e) => handleInputChange(idx, 'label', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Type size={12} /> Subtítulo descriptivo</label>
                    <textarea rows={2} className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={slide.caption} onChange={(e) => handleInputChange(idx, 'caption', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><FileImage size={12} /> Archivo de Imagen</label>
                    <label className="flex flex-col items-center justify-center w-full h-16 border border-dashed rounded-xl cursor-pointer bg-white hover:bg-slate-50 border-slate-300 hover:border-[#b8860b] transition-all">
                      <span className="text-xs text-slate-500 font-medium px-2 text-center flex items-center gap-2"><Upload size={14} /> {slide.imageUrl ? 'Cambiar archivo seleccionado' : 'Cargar imagen del equipo'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                    </label>
                  </div>
                </div>

                <div className="bg-slate-200/40 rounded-xl p-2 flex flex-col items-center justify-center border min-h-[120px] md:min-h-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Muestra</span>
                  <div className="w-full h-full rounded-lg bg-cover bg-center border border-white shadow-sm" style={{ backgroundImage: slide.imageUrl ? `url("${slide.imageUrl}")` : 'none' }}>
                    {!slide.imageUrl && <div className="h-full flex items-center justify-center text-[11px] text-slate-400 bg-slate-100 rounded-lg">Falta multimedia</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleAddSlide} className="w-full py-3 border-2 border-dashed rounded-xl font-bold text-xs text-slate-500 hover:text-[#b8860b] hover:border-[#b8860b] transition-colors flex items-center justify-center gap-1">
            <Plus size={16} /> Incorporar Nueva Diapositiva
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-3 shrink-0">
          <button onClick={() => { if(window.confirm('¿Volver a la configuración por defecto?')) setEditedSlides(JSON.parse(JSON.stringify(DEFAULT_SLIDES))); }} className="text-slate-400 hover:text-red-600 text-xs font-medium flex items-center gap-1 self-center sm:self-auto"><RefreshCw size={12} /> Revertir modificaciones</button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={onClose} className="w-1/2 sm:w-24 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200">Cerrar</button>
            <button onClick={() => onSave(editedSlides)} className="w-1/2 sm:w-40 bg-[#003366] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#b8860b] shadow-lg transition-all flex items-center justify-center gap-1.5"><Save size={14} /> Aplicar Cambios</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroAdminModal;