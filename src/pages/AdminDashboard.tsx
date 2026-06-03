import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  RefreshCw,
  Upload,
  Plus,
  Trash2,
  ImagePlus,
  ArrowLeftCircle,
  Bell,
  CheckCircle,
  Settings,
} from 'lucide-react';
import { heroService } from '../services/heroService';
import { newsService } from '../services/newsService';
import { adminService } from '../services/adminService';
import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';
import { NewsItem, DEFAULT_NEWS } from '../data/newsData';


interface AdminFormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  username: string;
  password: string;
}

const DEFAULT_ADMIN_FORM: AdminFormData = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  username: '',
  password: '',
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  // modal removed: modal state and preview removed

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [officialNews, setOfficialNews] = useState<NewsItem[]>([]);
  const [newAdminData, setNewAdminData] = useState<AdminFormData>(DEFAULT_ADMIN_FORM);
  const [adminRegisterStatus, setAdminRegisterStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [slides, news, official] = await Promise.all([
          heroService.getSlides(),
          newsService.getNews(),
          newsService.getOfficialNews(),
        ]);

        setHeroSlides(slides.length > 0 ? slides : DEFAULT_SLIDES);
        setNewsItems(news.length > 0 ? news : DEFAULT_NEWS);
        setOfficialNews(official);
      } catch (error) {
        console.error('Error cargando datos de administración:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // modal handlers removed

  const handleHeroChange = (index: number, field: keyof HeroSlide, value: string) => {
    setHeroSlides((current) => {
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleHeroFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      alert('La imagen excede los 2.5MB. Suba un archivo optimizado.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleHeroChange(index, 'imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addHeroSlide = () => {
    setHeroSlides((current) => [
      ...current,
      {
        id: Date.now(),
        imageUrl: '',
        label: 'Nuevo logro institucional',
        caption: 'Describe el impacto de esta gestión.',
      },
    ]);
  };

  const removeHeroSlide = (index: number) => {
    if (heroSlides.length <= 1) {
      alert('Debe existir al menos una diapositiva.');
      return;
    }
    setHeroSlides((current) => current.filter((_, idx) => idx !== index));
  };

  const handleNewsChange = (index: number, field: keyof NewsItem, value: string) => {
    setNewsItems((current) => {
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleNewsFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      alert('La imagen de la noticia supera los 2.5MB. Reduzca la resolución.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleNewsChange(index, 'image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addNewsItem = () => {
    setNewsItems((current) => [
      ...current,
      {
        id: Date.now(),
        image: '',
        date: new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' }),
        title: 'Nueva noticia destacada',
        source: 'Prensa INTU',
        url: '#',
      },
    ]);
  };

  const removeNewsItem = (index: number) => {
    if (newsItems.length <= 1) {
      alert('Debe permanecer al menos una noticia destacada.');
      return;
    }
    setNewsItems((current) => current.filter((_, idx) => idx !== index));
  };

  const handleOfficialNewsChange = (index: number, field: keyof NewsItem, value: string) => {
    setOfficialNews((current) => {
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleOfficialFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      alert('La imagen de la noticia supera los 2.5MB. Reduzca la resolución.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleOfficialNewsChange(index, 'image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNewAdminChange = (field: keyof AdminFormData, value: string) => {
    setNewAdminData((current) => ({ ...current, [field]: value }));
  };

  const registerAdmin = async () => {
    if (!newAdminData.name || !newAdminData.lastName || !newAdminData.email || !newAdminData.phone || !newAdminData.position || !newAdminData.username || !newAdminData.password) {
      setAdminRegisterStatus('Todos los campos son obligatorios.');
      return;
    }

    try {
      await adminService.registerAdmin(newAdminData);
      setAdminRegisterStatus('Administrador creado correctamente.');
      setNewAdminData(DEFAULT_ADMIN_FORM);
    } catch (error: any) {
      setAdminRegisterStatus(error?.message || 'Error al crear el administrador.');
    }
  };

  const addOfficialNewsItem = () => {
    setOfficialNews((current) => [
      ...current,
      {
        id: Date.now(),
        image: '',
        date: new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' }),
        title: 'Nuevo comunicado oficial',
        source: 'Prensa INTU',
        url: '#',
        content: 'Describe el comunicado institucional aquí.',
      },
    ]);
  };

  const removeOfficialNewsItem = (index: number) => {
    if (officialNews.length <= 1) {
      alert('Debe permanecer al menos una noticia oficial.');
      return;
    }
    setOfficialNews((current) => current.filter((_, idx) => idx !== index));
  };

  // saveModal removed

  const saveHero = async (notify = true): Promise<boolean> => {
    setSavingSection('hero');
    try {
      const ok = await heroService.saveSlides(heroSlides);
      if (notify) {
        if (ok) alert('Hero guardado correctamente.');
        else alert('Error al guardar el Hero.');
      }
      if (ok) {
        const refreshed = await heroService.getSlides();
        setHeroSlides(refreshed.length > 0 ? refreshed : DEFAULT_SLIDES);
      }
      return ok;
    } catch (error) {
      console.error('Error guardando Hero:', error);
      if (notify) alert('Error al guardar el Hero.');
      return false;
    } finally {
      setSavingSection(null);
    }
  };

  const saveNews = async (notify = true): Promise<boolean> => {
    setSavingSection('news');
    try {
      const ok = await newsService.saveNews(newsItems);
      if (notify) {
        if (ok) alert('Noticias guardadas correctamente.');
        else alert('Error al guardar las noticias.');
      }
      if (ok) {
        const refreshed = await newsService.getNews();
        setNewsItems(refreshed.length > 0 ? refreshed : DEFAULT_NEWS);
      }
      return ok;
    } catch (error) {
      console.error('Error guardando noticias:', error);
      if (notify) alert('Error al guardar las noticias.');
      return false;
    } finally {
      setSavingSection(null);
    }
  };

  const saveOfficialNews = async (notify = true): Promise<boolean> => {
    setSavingSection('official');
    try {
      const ok = await newsService.saveOfficialNews(officialNews);
      if (notify) {
        if (ok) alert('Noticias oficiales guardadas correctamente.');
        else alert('Error al guardar noticias oficiales.');
      }
      if (ok) {
        const refreshed = await newsService.getOfficialNews();
        setOfficialNews(refreshed);
      }
      return ok;
    } catch (error) {
      console.error('Error guardando noticias oficiales:', error);
      if (notify) alert('Error al guardar noticias oficiales.');
      return false;
    } finally {
      setSavingSection(null);
    }
  };

  const saveAll = async () => {
    setSavingSection('all');
    const results = await Promise.allSettled([
      saveHero(false),
      saveNews(false),
      saveOfficialNews(false),
    ]);
    const failed = results.filter(
      (result) => result.status === 'rejected' || (result.status === 'fulfilled' && result.value === false)
    );
    if (failed.length === 0) {
      alert('Todos los cambios se guardaron correctamente.');
    } else {
      alert('Algunos cambios no se guardaron. Revisa cada sección.');
    }
    setSavingSection(null);
  };

  const resetHero = () => {
    if (window.confirm('¿Desea restaurar las diapositivas predeterminadas del Hero?')) {
      setHeroSlides(JSON.parse(JSON.stringify(DEFAULT_SLIDES)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-[#003366]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#003366] border-t-[#b8860b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] px-4 py-8 sm:px-6 lg:px-10 text-[#003366]">
      
      {/* Página completa del dashboard admin */}
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b8860b] font-bold">Panel global</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Administración unificada</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Desde aquí puedes modificar los slides del Hero y todas las noticias en una sola ventana.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-[#003366] bg-white px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
            >
              <ArrowLeftCircle size={18} /> Volver al sitio
            </button>
            <button
              type="button"
              onClick={saveAll}
              disabled={savingSection === 'all'}
              className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'all' ? 'Guardando todo...' : 'Guardar todo'}
            </button>
          </div>
        </div>

        {/* Navegación rápida entre secciones internas del dashboard */}
        <div className="flex flex-wrap gap-3 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          {['hero', 'news', 'official', 'admin'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#003366] hover:text-white"
            >
              {section === 'hero' && 'Hero'}
              {section === 'news' && 'Noticias'}
              {section === 'official' && 'Noticias Oficiales'}
              {section === 'admin' && 'Administradores'}
            </a>
          ))}
        </div>

        {/* Sección de edición del carrusel Hero principal */}
        <section id="hero" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#003366]/10 px-4 py-2 text-sm font-semibold text-[#003366]">
                <ImagePlus size={16} /> Hero
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#003366]">Slides del Hero</h2>
              <p className="mt-2 text-sm text-slate-500">Edita cada diapositiva del carrusel principal.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetHero}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <RefreshCw size={16} /> Restaurar predeterminados
              </button>
              <button
                type="button"
                onClick={() => saveHero()}
                disabled={savingSection === 'hero'}
                className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} /> {savingSection === 'hero' ? 'Guardando...' : 'Guardar Hero'}
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {heroSlides.map((slide, idx) => (
              <div key={slide.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#003366]">Diapositiva #{idx + 1}</h3>
                    <p className="mt-1 text-sm text-slate-500">Edite el texto y la imagen de esta tarjeta.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHeroSlide(idx)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[2fr_1fr]">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Título</label>
                      <input
                        type="text"
                        value={slide.label}
                        onChange={(e) => handleHeroChange(idx, 'label', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Subtítulo</label>
                      <textarea
                        rows={3}
                        value={slide.caption}
                        onChange={(e) => handleHeroChange(idx, 'caption', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#b8860b] hover:bg-slate-50">
                        <span className="flex items-center gap-2">
                          <Upload size={14} /> {slide.imageUrl ? 'Cambiar imagen' : 'Cargar imagen'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleHeroFileChange(idx, e)} />
                      </label>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-center">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Vista previa</span>
                    <div
                      className="mt-4 min-h-[210px] overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: slide.imageUrl ? `url('${slide.imageUrl}')` : 'none' }}
                    >
                      {!slide.imageUrl && (
                        <div className="flex h-full min-h-[210px] items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">
                          Sin imagen seleccionada
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addHeroSlide}
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#b8860b] hover:text-[#b8860b]"
            >
              <Plus size={16} /> Agregar nueva diapositiva
            </button>
          </div>
        </section>

        {/* Sección para gestionar noticias públicas o destacadas */}
        <section id="news" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#003366]/10 px-4 py-2 text-sm font-semibold text-[#003366]">
                <Settings size={16} /> Noticias Globales
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#003366]">Noticias públicas/ Actualizaciones</h2>
              <p className="mt-2 text-sm text-slate-500">Actualiza titulares, enlaces e imágenes de la sección de prensa.</p>
            </div>
            <button
              type="button"
              onClick={() => saveNews()}
              disabled={savingSection === 'news'}
              className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'news' ? 'Guardando...' : 'Guardar noticias'}
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {newsItems.map((item, idx) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#003366]">Noticia #{idx + 1}</h3>
                    <p className="mt-1 text-sm text-slate-500">Edita los datos que se muestran en la sección de noticias.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNewsItem(idx)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[2fr_1fr]">
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fecha</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => handleNewsChange(idx, 'date', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fuente</label>
                        <input
                          type="text"
                          value={item.source}
                          onChange={(e) => handleNewsChange(idx, 'source', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Titular</label>
                      <textarea
                        rows={3}
                        value={item.title}
                        onChange={(e) => handleNewsChange(idx, 'title', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Enlace</label>
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => handleNewsChange(idx, 'url', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#b8860b] hover:bg-slate-50">
                        <span className="flex items-center gap-2">
                          <Upload size={14} /> {item.image ? 'Cambiar imagen' : 'Cargar imagen'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleNewsFileChange(idx, e)} />
                      </label>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-center">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Vista previa</span>
                    <div
                      className="mt-4 min-h-[220px] overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: item.image ? `url('${item.image}')` : 'none' }}
                    >
                      {!item.image && (
                        <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">
                          Sin miniatura cargada
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-left text-sm leading-6 text-slate-700">
                      <p className="font-semibold">Resumen</p>
                      <p>{item.title || 'Sin titular todavía.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addNewsItem}
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#b8860b] hover:text-[#b8860b]"
            >
              <Plus size={16} /> Agregar noticia destacada
            </button>
          </div>
        </section>

        {/* Sección para editar comunicados y noticias oficiales */}
        <section id="official" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#b8860b]/10 px-4 py-2 text-sm font-semibold text-[#b8860b]">
                <CheckCircle size={16} /> Noticias Oficiales
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#003366]">Comunicados institucionales</h2>
              <p className="mt-2 text-sm text-slate-500">Gestiona las noticias oficiales desde el mismo panel.</p>
            </div>
            <button
              type="button"
              onClick={() => saveOfficialNews()}
              disabled={savingSection === 'official'}
              className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'official' ? 'Guardando...' : 'Guardar oficiales'}
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {officialNews.map((item, idx) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#003366]">Noticia oficial #{idx + 1}</h3>
                    <p className="mt-1 text-sm text-slate-500">Completa los campos oficiales que aparecerán en portada.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOfficialNewsItem(idx)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[2fr_1fr]">
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fecha</label>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => handleOfficialNewsChange(idx, 'date', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fuente</label>
                        <input
                          type="text"
                          value={item.source || ''}
                          onChange={(e) => handleOfficialNewsChange(idx, 'source', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Titular</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleOfficialNewsChange(idx, 'title', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Contenido</label>
                      <textarea
                        rows={4}
                        value={item.content || ''}
                        onChange={(e) => handleOfficialNewsChange(idx, 'content', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">URL</label>
                      <input
                        type="text"
                        value={item.url || ''}
                        onChange={(e) => handleOfficialNewsChange(idx, 'url', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#b8860b] hover:bg-slate-50">
                        <span className="flex items-center gap-2">
                          <Upload size={14} /> {item.image ? 'Cambiar imagen' : 'Cargar imagen'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleOfficialFileChange(idx, e)} />
                      </label>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-center">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Vista previa</span>
                    <div
                      className="mt-4 min-h-[220px] overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: item.image ? `url('${item.image}')` : 'none' }}
                    >
                      {!item.image && (
                        <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">
                          Sin imagen cargada
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-left text-sm leading-6 text-slate-700">
                      <p className="font-semibold">Resumen</p>
                      <p>{item.content ? item.content.slice(0, 120) + (item.content.length > 120 ? '...' : '') : 'Sin contenido.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addOfficialNewsItem}
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#b8860b] hover:text-[#b8860b]"
            >
              <Plus size={16} /> Agregar noticia oficial
            </button>
          </div>
        </section>

        {/* Sección para registrar nuevos usuarios administradores */}
        <section id="admin" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#003366]/10 px-4 py-2 text-sm font-semibold text-[#003366]">
                <Settings size={16} /> Administradores
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#003366]">Registrar nuevo administrador</h2>
              <p className="mt-2 text-sm text-slate-500">
                Crea un nuevo administrador con nombre, apellido, correo, teléfono, cargo, usuario y contraseña.
              </p>
            </div>
            <button
              type="button"
              onClick={registerAdmin}
              className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67]"
            >
              <Save size={16} /> Registrar admin
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
              <input
                type="text"
                value={newAdminData.name}
                onChange={(e) => handleNewAdminChange('name', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Apellido</label>
              <input
                type="text"
                value={newAdminData.lastName}
                onChange={(e) => handleNewAdminChange('lastName', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Correo</label>
              <input
                type="email"
                value={newAdminData.email}
                onChange={(e) => handleNewAdminChange('email', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={newAdminData.phone}
                onChange={(e) => handleNewAdminChange('phone', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cargo</label>
              <input
                type="text"
                value={newAdminData.position}
                onChange={(e) => handleNewAdminChange('position', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
              <input
                type="text"
                value={newAdminData.username}
                onChange={(e) => handleNewAdminChange('username', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={newAdminData.password}
                onChange={(e) => handleNewAdminChange('password', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
              />
            </div>
          </div>

          {adminRegisterStatus && (
            <p className="mt-6 text-sm text-slate-700">{adminRegisterStatus}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
