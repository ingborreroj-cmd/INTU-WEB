import React, { useState } from 'react';
import { Save, X, RefreshCw, Type, Plus, Trash2, Upload, FileImage } from 'lucide-react';
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

  // LÓGICA CLAVE: Convierte la imagen cargada localmente a Base64 para guardarla en LocalStorage
  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación opcional de tamaño para no saturar el LocalStorage (Límite sugerido ~2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen es muy pesada. Intente subir una foto optimizada de menos de 2MB para asegurar un rendimiento óptimo de la web.');
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
      imageUrl: '', // Inicia vacío para obligar a cargar una imagen
      label: 'Nuevo logro del INTU',
      caption: 'Describa brevemente el impacto de esta jornada o anuncio.'
    };
    setEditedSlides([...editedSlides, newSlide]);
  };

  const handleRemoveSlide = (index: number) => {
    if (editedSlides.length <= 1) {
      alert('El carrusel requiere al menos una (1) diapositiva activa.');
      return;
    }
    if (window.confirm('¿Desea eliminar esta diapositiva?')) {
      setEditedSlides(editedSlides.filter((_, idx) => idx !== index));
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Restaurar los valores de fábrica? Se perderán las fotos cargadas.')) {
      setEditedSlides(DEFAULT_SLIDES);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border-t-8 border-[#b8860b]">
        
        <div className="flex justify-between items-center mb-4 border-b pb-4 shrink-0">
          <div>
            <h2 className="text-2xl font-montserrat font-bold text-[#003366]">Gestor del Carrusel Principal</h2>
            <p className="text-xs text-slate-500 mt-1">Cargue imágenes directamente desde su equipo sin escribir código ni rutas</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 p-1"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar my-4">
          {editedSlides.map((slide, idx) => (
            <div key={slide.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-4">
              
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">Diapositiva #{idx + 1}</span>
                <button onClick={() => handleRemoveSlide(idx)} className="text-slate-400 hover:text-red-600 p-1 flex items-center gap-1 text-xs font-semibold">
                  <Trash2 size={15} /> Eliminar
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* TEXTOS (Columna izquierda/centro) */}
                <div className="md:col-span-2 space-y-3">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><Type size={14} className="text-[#003366]" /> Título</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#b8860b]" 
                      value={slide.label}
                      onChange={(e) => handleInputChange(idx, 'label', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><Type size={14} className="text-[#003366]" /> Descripción</label>
                    <textarea 
                      rows={2} 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#b8860b]" 
                      value={slide.caption}
                      onChange={(e) => handleInputChange(idx, 'caption', e.target.value)}
                    />
                  </div>

                  {/* CONTROL DE SELECCIÓN DE ARCHIVO LOCAL */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <FileImage size={14} className="text-[#003366]" /> Foto de Fondo
                    </label>
                    <div className="relative flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-slate-50 hover:border-[#b8860b] transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={20} className="text-slate-400 mb-1" />
                          <p className="text-xs text-slate-500 font-medium px-2 text-center">
                            {slide.imageUrl ? '✓ Imagen cargada. Haga clic para cambiarla.' : 'Haga clic para buscar una imagen en su computadora'}
                          </p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(idx, e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* VISUALIZADOR EN TIEMPO REAL */}
                <div className="flex flex-col justify-between items-center bg-slate-200/40 rounded-xl p-3 border border-slate-200/60 min-h-[140px] md:min-h-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Vista Previa</span>
                  <div 
                    className="w-full h-full rounded-lg bg-cover bg-center shadow-md relative border border-white"
                    style={{ backgroundImage: slide.imageUrl ? `url("${slide.imageUrl}")` : 'none' }}
                  >
                    {!slide.imageUrl && (
                      <div className="absolute inset-0 bg-slate-100/80 flex flex-center items-center justify-center text-slate-400 text-xs font-medium text-center p-2">
                        Falta cargar imagen
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

          <button
            onClick={handleAddSlide}
            className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-600 rounded-2xl font-bold text-sm hover:border-[#b8860b] hover:text-[#b8860b] hover:bg-amber-50/10 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Agregar Nueva Diapositiva
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-4 shrink-0">
          <button onClick={handleReset} className="px-4 py-2 text-slate-400 rounded-xl font-medium text-xs hover:text-red-600 transition-colors flex items-center gap-1.5">
            <RefreshCw size={13} /> Restablecer originales
          </button>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={onClose} className="w-1/2 sm:w-28 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Cerrar
            </button>
            <button 
              onClick={() => onSave(editedSlides)} 
              className="w-1/2 sm:w-48 bg-[#003366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#b8860b] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Aplicar a la Web
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroAdminModal;