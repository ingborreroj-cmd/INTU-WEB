import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw, Type, Plus, Trash2, Upload, FileImage, Calendar, Link2 } from 'lucide-react';
import { NewsItem } from '../data/newsData';
import { newsService } from '../services/newsService';
import { ADMIN_ACCESS_KEY } from '../constants/admin';

const AdminOfficialNews: React.FC = () => {
  const [editedNews, setEditedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = prompt('Ingrese clave técnica del INTU:');
    if (token === ADMIN_ACCESS_KEY) {
      setIsAuthorized(true);
    } else {
      if (token !== null) {
        alert('Credenciales no autorizadas.');
      }
      navigate('/');
    }
    setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (!isAuthorized) return;

    const loadNews = async () => {
      const persistedData = await newsService.getOfficialNews();
      setEditedNews(persistedData);
      setLoading(false);
    };

    loadNews();
  }, [isAuthorized]);

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
      title: 'Nuevo artículo oficial',
      source: 'Prensa INTU',
      url: '#',
      content: 'Escriba aquí el cuerpo completo de la noticia oficial.'
    };
    setEditedNews([...editedNews, newArticle]);
  };

  const handleRemoveNews = (index: number) => {
    if (editedNews.length <= 1) {
      alert('Debe permanecer al menos una (1) noticia oficial en el portal.');
      return;
    }
    if (window.confirm('¿Confirma que desea retirar esta noticia oficial?')) {
      setEditedNews(editedNews.filter((_, idx) => idx !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const successfullySaved = await newsService.saveOfficialNews(editedNews);
      if (successfullySaved) {
        alert('Noticias oficiales guardadas correctamente.');
        navigate('/');
      } else {
        alert('Error guardando noticias oficiales en el almacenamiento local.');
      }
    } catch (error) {
      console.error('Error guardando noticias oficiales:', error);
      alert('Ocurrió un error al procesar las noticias oficiales.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Desea vaciar las noticias oficiales y comenzar desde cero?')) {
      setEditedNews([]);
    }
  };

  if (!authChecked) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] text-[#003366]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#003366] border-t-[#b8860b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#003366] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b8860b] font-bold">Administración</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Editor de Noticias Oficiales</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Genere noticias institucionales completas sin afectar los enlaces de prensa externa.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-full border border-[#003366] bg-white px-5 py-2.5 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
          >
            Volver al inicio
          </button>
        </div>

        <div className="grid gap-6">
          {editedNews.map((item, idx) => (
            <div key={item.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#003366]">Noticia oficial #{idx + 1}</h2>
                  <p className="mt-1 text-sm text-slate-500">Complete el título, contenido y los metadatos oficiales.</p>
                </div>
                <button
                  onClick={() => handleRemoveNews(idx)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={14} /> Retirar
                </button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Calendar size={14} /> Fecha de publicación
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        value={item.date}
                        onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Type size={14} /> Fuente / Origen
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        value={item.source}
                        onChange={(e) => handleInputChange(idx, 'source', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Type size={14} /> Titular de la noticia
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      value={item.title}
                      onChange={(e) => handleInputChange(idx, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Type size={14} /> Contenido oficial
                    </label>
                    <textarea
                      rows={5}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b] whitespace-normal break-words"
                      value={item.content || ''}
                      onChange={(e) => handleInputChange(idx, 'content', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Link2 size={14} /> URL / Enlace opcional
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      value={item.url}
                      onChange={(e) => handleInputChange(idx, 'url', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <FileImage size={14} /> Imagen de portada
                    </label>
                    <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#b8860b] hover:bg-slate-50">
                      <span className="flex items-center gap-2">
                        <Upload size={14} /> {item.image ? 'Cambiar imagen' : 'Cargar imagen'}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                    </label>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-center">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Vista previa rápida</span>
                  <div
                    className="mt-4 min-h-[220px] overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat border border-slate-200"
                    style={{ backgroundImage: item.image ? `url("${item.image}")` : 'none' }}
                  >
                    {!item.image && (
                      <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">
                        Sin imagen cargada
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-left text-sm leading-6 text-slate-700 whitespace-normal break-words">
                    <p className="font-semibold">Resumen:</p>
                    <p>{item.content ? item.content.slice(0, 130) + (item.content.length > 130 ? '...' : '') : 'Sin contenido todavía.'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddNews}
            className="rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#b8860b] hover:text-[#b8860b]"
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <Plus size={16} /> Agregar noticia oficial
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RefreshCw size={16} /> Vaciar noticias oficiales
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} /> {saving ? 'Guardando...' : 'Guardar noticias oficiales'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOfficialNews;
