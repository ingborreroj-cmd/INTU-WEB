import React, { useState } from 'react';
import { Save, X, RefreshCw, Type, Plus, Trash2, Upload, FileImage, Link2, Calendar } from 'lucide-react';
import { NewsItem, DEFAULT_NEWS } from '../data/newsData';

interface NewsAdminModalProps {
  news: NewsItem[];
  onSave: (updatedNews: NewsItem[]) => void;
  onClose: () => void;
}

const NewsAdminModal: React.FC<NewsAdminModalProps> = ({ news, onSave, onClose }) => {
  const [editedNews, setEditedNews] = useState<NewsItem[]>(JSON.parse(JSON.stringify(news)));

  const handleInputChange = (index: number, field: keyof NewsItem, value: string) => {
    const updated = [...editedNews];
    updated[index] = { ...updated[index], [field]: value };
    setEditedNews(updated);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert('La imagen de la noticia supera los 2.5MB. Reduzca la resolución antes de subirla.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleInputChange(index, 'image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddNews = () => {
    const newArticle: NewsItem = {
      id: Date.now(),
      image: '',
      date: new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: 'Título de la Nota de Prensa Oficial',
      source: 'Prensa INTU',
      url: '#'
    };
    setEditedNews([...editedNews, newArticle]);
  };

  const handleRemoveNews = (index: number) => {
    if (editedNews.length <= 1) {
      alert('Debe permanecer al menos una (1) noticia destacada en el portal.');
      return;
    }
    if (window.confirm('¿Confirma que desea retirar esta noticia de la cartelera informativa?')) {
      setEditedNews(editedNews.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] p-6 md:p-8 max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border-t-4 border-[#b8860b]">
        
        <div className="flex justify-between items-center mb-4 border-b pb-3 shrink-0">
          <div>
            <h2 className="text-xl font-montserrat font-extrabold text-[#003366] tracking-tight">Sala de Prensa y Actualidad</h2>
            <p className="text-xs text-slate-500 mt-0.5">Editor del panel informativo y enlaces de redirección institucional</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-600 transition-colors"><X size={22} /></button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 my-3 scrollbar-thin">
          {editedNews.map((item, idx) => (
            <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b8860b]">Noticia #{idx + 1}</span>
                <button onClick={() => handleRemoveNews(idx)} className="text-slate-400 hover:text-red-600 text-xs font-semibold flex items-center gap-1">
                  <Trash2 size={14} /> Retirar Noticia
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Calendar size={12} /> Fecha Publicación</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={item.date} onChange={(e) => handleInputChange(idx, 'date', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Type size={12} /> Fuente / Origen</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={item.source} onChange={(e) => handleInputChange(idx, 'source', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Type size={12} /> Enlace de Titular (Máx 2 líneas)</label>
                    <textarea rows={2} className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={item.title} onChange={(e) => handleInputChange(idx, 'title', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><Link2 size={12} /> URL del artículo completo (Prensa Oficial)</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#b8860b]" value={item.url} onChange={(e) => handleInputChange(idx, 'url', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1"><FileImage size={12} /> Imagen de la Tarjeta</label>
                    <label className="flex flex-col items-center justify-center w-full h-14 border border-dashed rounded-xl cursor-pointer bg-white hover:bg-slate-50 border-slate-300 hover:border-[#b8860b] transition-all">
                      <span className="text-xs text-slate-500 font-medium px-2 text-center flex items-center gap-2"><Upload size={14} /> Reemplazar imagen de cabecera</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                    </label>
                  </div>
                </div>

                <div className="bg-slate-200/40 rounded-xl p-2 flex flex-col items-center justify-center border min-h-[140px] md:min-h-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">Vista Previa</span>
                  <div className="w-full h-full rounded-xl bg-cover bg-center border border-white shadow-md relative overflow-hidden" style={{ backgroundImage: item.image ? `url("${item.image}")` : 'none' }}>
                    {!item.image && <div className="h-full flex items-center justify-center text-[11px] text-slate-400 bg-slate-100 rounded-xl">Sin miniatura</div>}
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 p-2 text-[11px] text-white truncate font-medium">{item.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleAddNews} className="w-full py-3 border-2 border-dashed rounded-xl font-bold text-xs text-slate-500 hover:text-[#b8860b] hover:border-[#b8860b] transition-colors flex items-center justify-center gap-1">
            <Plus size={16} /> Agregar Nueva Tarjeta Informativa
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-3 shrink-0">
          <button onClick={() => { if(window.confirm('¿Revertir a los artículos históricos cargados de fábrica?')) setEditedNews(JSON.parse(JSON.stringify(DEFAULT_NEWS))); }} className="text-slate-400 hover:text-red-600 text-xs font-medium flex items-center gap-1 self-center sm:self-auto"><RefreshCw size={12} /> Cargar noticias por defecto</button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={onClose} className="w-1/2 sm:w-24 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200">Cerrar</button>
            <button onClick={() => onSave(editedNews)} className="w-1/2 sm:w-40 bg-[#003366] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#b8860b] shadow-lg transition-all flex items-center justify-center gap-1.5"><Save size={14} /> Publicar Prensa</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsAdminModal;