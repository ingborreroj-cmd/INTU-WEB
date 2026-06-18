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
import { surveyService, SurveyQuestion, SurveyStatsQuestion } from '../services/surveyService';
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
  const [selectedSection, setSelectedSection] = useState<'all'|'hero'|'news'|'official'|'admin'|'survey'>('all');

  // modal removed: modal state and preview removed

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [officialNews, setOfficialNews] = useState<NewsItem[]>([]);
  const [newAdminData, setNewAdminData] = useState<AdminFormData>(DEFAULT_ADMIN_FORM);
  const [adminRegisterStatus, setAdminRegisterStatus] = useState<string | null>(null);
  const [showAdminCreatedModal, setShowAdminCreatedModal] = useState(false);
  const [adminsList, setAdminsList] = useState<any[]>([]);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([]);
  const [surveyStats, setSurveyStats] = useState<SurveyStatsQuestion[]>([]);
  const [surveyTotalResponses, setSurveyTotalResponses] = useState(0);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveyError, setSurveyError] = useState<string | null>(null);
  const [newSurveyQuestion, setNewSurveyQuestion] = useState<Partial<SurveyQuestion>>({
    label: '',
    type: 'radio',
    options: [''],
    order: 0,
    active: true,
  });
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);
  const [editingAdminData, setEditingAdminData] = useState<Partial<AdminFormData> | null>(null);

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
        // fetch admins list if endpoint available
        try {
          const admins = await adminService.getAdmins();
          setAdminsList(admins || []);
        } catch (e) {
          // ignore if backend doesn't expose admin list
          console.warn('Could not fetch admins list:', e);
        }

        try {
          const [questions, stats] = await Promise.all([
            surveyService.getAdminQuestions(),
            surveyService.getStats(),
          ]);
          setSurveyQuestions(questions);
          setSurveyStats(stats.questions || []);
          setSurveyTotalResponses(stats.totalResponses || 0);
        } catch (error) {
          console.warn('Could not fetch survey admin data:', error);
        }
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
      setShowAdminCreatedModal(true);
      // refresh list
      try {
        const admins = await adminService.getAdmins();
        setAdminsList(admins || []);
      } catch (err) { console.warn('refresh admins failed', err); }
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
        createdBy: 'Equipo INTU',
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

  const refreshSurveyAdminData = async () => {
    setSurveyLoading(true);
    setSurveyError(null);
    try {
      const [questions, stats] = await Promise.all([
        surveyService.getAdminQuestions(),
        surveyService.getStats(),
      ]);
      setSurveyQuestions(questions);
      setSurveyStats(stats.questions || []);
      setSurveyTotalResponses(stats.totalResponses || 0);
    } catch (error: any) {
      console.error('Error cargando datos de encuestas:', error);
      setSurveyError(error?.message || 'No se pudieron cargar los datos de encuestas.');
    } finally {
      setSurveyLoading(false);
    }
  };

  const handleSurveyQuestionChange = (index: number, field: keyof SurveyQuestion, value: any) => {
    setSurveyQuestions((current) => {
      const next = [...current];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSurveyQuestionOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setSurveyQuestions((current) => {
      const next = [...current];
      const question = next[questionIndex];
      const options = Array.isArray(question.options) ? [...question.options] : [];
      options[optionIndex] = value;
      next[questionIndex] = { ...question, options };
      return next;
    });
  };

  const addSurveyQuestionOption = (questionIndex: number) => {
    setSurveyQuestions((current) => {
      const next = [...current];
      const question = next[questionIndex];
      const options = Array.isArray(question.options) ? [...question.options, ''] : [''];
      next[questionIndex] = { ...question, options };
      return next;
    });
  };

  const removeSurveyQuestionOption = (questionIndex: number, optionIndex: number) => {
    setSurveyQuestions((current) => {
      const next = [...current];
      const question = next[questionIndex];
      const options = Array.isArray(question.options) ? [...question.options] : [];
      options.splice(optionIndex, 1);
      next[questionIndex] = { ...question, options };
      return next;
    });
  };

  const createSurveyQuestion = async () => {
    if (!newSurveyQuestion.label?.trim()) {
      alert('El texto de la pregunta es obligatorio.');
      return;
    }
    if (newSurveyQuestion.type === 'radio' && (!newSurveyQuestion.options || newSurveyQuestion.options.length === 0)) {
      alert('Agrega al menos una opción para preguntas de tipo radio.');
      return;
    }

    setSavingSection('survey');
    try {
      await surveyService.createQuestion({
        label: newSurveyQuestion.label,
        type: newSurveyQuestion.type as 'radio' | 'text',
        options: newSurveyQuestion.options?.filter((opt) => opt.trim().length > 0),
        order: Number(newSurveyQuestion.order) || 0,
        active: newSurveyQuestion.active !== false,
      });
      setNewSurveyQuestion({ label: '', type: 'radio', options: [''], order: surveyQuestions.length + 1, active: true });
      await refreshSurveyAdminData();
      alert('Pregunta de encuesta creada correctamente.');
    } catch (error: any) {
      alert(error?.message || 'Error al crear la pregunta de la encuesta.');
    } finally {
      setSavingSection(null);
    }
  };

  const saveSurveyQuestion = async (question: SurveyQuestion) => {
    setSavingSection('survey');
    try {
      await surveyService.updateQuestion(question.id, {
        label: question.label,
        type: question.type as 'radio' | 'text',
        options: Array.isArray(question.options) ? question.options : [],
        order: question.order,
        active: question.active,
      });
      await refreshSurveyAdminData();
      alert('Pregunta actualizada correctamente.');
    } catch (error: any) {
      alert(error?.message || 'Error al actualizar la pregunta de la encuesta.');
    } finally {
      setSavingSection(null);
    }
  };

  const deleteSurveyQuestion = async (questionId: number) => {
    if (!window.confirm('¿Eliminar esta pregunta de la encuesta? Esta acción no se puede deshacer.')) return;
    setSavingSection('survey');
    try {
      await surveyService.deleteQuestion(questionId);
      await refreshSurveyAdminData();
      alert('Pregunta eliminada correctamente.');
    } catch (error: any) {
      alert(error?.message || 'Error al eliminar la pregunta de la encuesta.');
    } finally {
      setSavingSection(null);
    }
  };

  // Admins management: edit, save, delete
  const startEditAdmin = (admin: any) => {
    setEditingAdminId(admin.id);
    setEditingAdminData({ name: admin.name, lastName: admin.lastName, email: admin.email, phone: admin.phone, position: admin.position, username: admin.username });
  };

  const cancelEditAdmin = () => {
    setEditingAdminId(null);
    setEditingAdminData(null);
  };

  const saveEditAdmin = async () => {
    if (!editingAdminId || !editingAdminData) return;
    try {
      await adminService.updateAdmin(editingAdminId, editingAdminData as any);
      const admins = await adminService.getAdmins();
      setAdminsList(admins || []);
      cancelEditAdmin();
      alert('Administrador actualizado');
    } catch (err: any) {
      alert(err?.message || 'Error al actualizar administrador');
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!confirm('¿Eliminar este administrador? Esta acción es irreversible.')) return;
    try {
      await adminService.deleteAdmin(id);
      const admins = await adminService.getAdmins();
      setAdminsList(admins || []);
      alert('Administrador eliminado');
    } catch (err: any) {
      alert(err?.message || 'Error eliminando administrador');
    }
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
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-[#273376]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#273376] border-t-[#FFC907]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] px-4 py-8 sm:px-6 lg:px-10 text-[#273376]">
      
      {/* Página completa del dashboard admin */}
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFC907] font-bold">Panel global</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Administración unificada</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Desde aquí puedes modificar los slides del Hero y todas las noticias en una sola ventana.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-[#273376] bg-white px-5 py-3 text-sm font-semibold text-[#273376] transition hover:bg-[#273376] hover:text-white"
            >
              <ArrowLeftCircle size={18} /> Volver al sitio
            </button>
            <button
              type="button"
              onClick={saveAll}
              disabled={savingSection === 'all'}
              className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'all' ? 'Guardando todo...' : 'Guardar todo'}
            </button>
          </div>
        </div>

        {/* Navegación rápida entre secciones internas del dashboard (muestra solo la sección seleccionada) */}
        <div className="flex flex-wrap gap-3 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          {[
            { key: 'all', label: 'Mostrar todo' },
            { key: 'hero', label: 'Hero' },
            { key: 'news', label: 'Noticias Nacionales' },
            { key: 'official', label: 'Noticias INTU' },
            { key: 'survey', label: 'Encuestas' },
            { key: 'admin', label: 'Administradores' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedSection(item.key as any)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedSection === item.key ? 'bg-[#273376] text-white border-[#273376]' : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-[#273376] hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sección de edición del carrusel Hero principal */}
        {(selectedSection === 'all' || selectedSection === 'hero') && (
          <section id="hero" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#273376]/10 px-4 py-2 text-sm font-semibold text-[#273376]">
                <ImagePlus size={16} /> Hero
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#273376]">Slides del Hero</h2>
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
                className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
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
                    <h3 className="text-lg font-bold text-[#273376]">Diapositiva #{idx + 1}</h3>
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
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Subtítulo</label>
                      <textarea
                        rows={3}
                        value={slide.caption}
                        onChange={(e) => handleHeroChange(idx, 'caption', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#FFC907] hover:bg-slate-50">
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
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#FFC907] hover:text-[#FFC907]"
            >
              <Plus size={16} /> Agregar nueva diapositiva
            </button>
          </div>
          </section>
        )}

        {/* Sección para gestionar noticias públicas o destacadas */}
        {(selectedSection === 'all' || selectedSection === 'news') && (
          <section id="news" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#273376]/10 px-4 py-2 text-sm font-semibold text-[#273376]">
                <Settings size={16} /> Noticias Nacionales
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#273376]">Noticias Nacionales</h2>
              <p className="mt-2 text-sm text-slate-500">Actualiza titulares, enlaces e imágenes de la sección de prensa.</p>
            </div>
            <button
              type="button"
              onClick={() => saveNews()}
              disabled={savingSection === 'news'}
              className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'news' ? 'Guardando...' : 'Guardar noticias'}
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {newsItems.map((item, idx) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#273376]">Noticia #{idx + 1}</h3>
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
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fuente</label>
                        <input
                          type="text"
                          value={item.source}
                          onChange={(e) => handleNewsChange(idx, 'source', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Titular</label>
                      <textarea
                        rows={3}
                        value={item.title}
                        onChange={(e) => handleNewsChange(idx, 'title', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Enlace</label>
                      <input
                        type="text"
                        value={item.url}
                        placeholder="https://ejemplo.com"
                        onChange={(e) => handleNewsChange(idx, 'url', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#FFC907] hover:bg-slate-50">
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
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#FFC907] hover:text-[#FFC907]"
            >
              <Plus size={16} /> Agregar noticia destacada
            </button>
          </div>
          </section>
        )}

        {/* Sección para editar comunicados y noticias oficiales */}
        {(selectedSection === 'all' || selectedSection === 'official') && (
          <section id="official" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC907]/10 px-4 py-2 text-sm font-semibold text-[#FFC907]">
                <CheckCircle size={16} /> Noticias INTU
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#273376]">Comunicados institucionales</h2>
              <p className="mt-2 text-sm text-slate-500">Gestiona las noticias oficiales desde el mismo panel.</p>
            </div>
            <button
              type="button"
              onClick={() => saveOfficialNews()}
              disabled={savingSection === 'official'}
              className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} /> {savingSection === 'official' ? 'Guardando...' : 'Guardar oficiales'}
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {officialNews.map((item, idx) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#273376]">Noticia oficial #{idx + 1}</h3>
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
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Fuente</label>
                        <input
                          type="text"
                          value={item.source || ''}
                          onChange={(e) => handleOfficialNewsChange(idx, 'source', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Titular</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleOfficialNewsChange(idx, 'title', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">URL</label>
                        <input
                          type="text"
                          value={item.url || ''}
                          placeholder="https://ejemplo.com"
                          onChange={(e) => handleOfficialNewsChange(idx, 'url', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Creado por</label>
                        <input
                          type="text"
                          value={item.createdBy || ''}
                          onChange={(e) => handleOfficialNewsChange(idx, 'createdBy', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Contenido del modal</label>
                      <textarea
                        rows={6}
                        value={item.content || ''}
                        onChange={(e) => handleOfficialNewsChange(idx, 'content', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Imagen</label>
                      <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#FFC907] hover:bg-slate-50">
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
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addOfficialNewsItem}
              className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#FFC907] hover:text-[#FFC907]"
            >
              <Plus size={16} /> Agregar noticia oficial
            </button>
          </div>
          </section>
        )}

        {(selectedSection === 'all' || selectedSection === 'survey') && (
          <section id="survey" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#273376]/10 px-4 py-2 text-sm font-semibold text-[#273376]">
                  <Bell size={16} /> Encuestas
                </div>
                <h2 className="mt-4 text-2xl font-bold text-[#273376]">Preguntas de encuesta</h2>
                <p className="mt-2 text-sm text-slate-500">Administra preguntas, opciones y revisa estadísticas en tiempo real.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={refreshSurveyAdminData}
                  disabled={surveyLoading}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw size={16} /> {surveyLoading ? 'Actualizando...' : 'Actualizar datos'}
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-[#273376]">Nueva pregunta</h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Texto de la pregunta</label>
                      <input
                        type="text"
                        value={newSurveyQuestion.label || ''}
                        onChange={(e) => setNewSurveyQuestion((prev) => ({ ...prev, label: e.target.value }))}
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                        <select
                          value={newSurveyQuestion.type}
                          onChange={(e) => setNewSurveyQuestion((prev) => ({ ...prev, type: e.target.value as 'radio' | 'text', options: e.target.value === 'radio' ? prev.options || [''] : [] }))}
                          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        >
                          <option value="radio">Opción múltiple</option>
                          <option value="text">Respuesta abierta</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Orden</label>
                        <input
                          type="number"
                          min={0}
                          value={newSurveyQuestion.order ?? 0}
                          onChange={(e) => setNewSurveyQuestion((prev) => ({ ...prev, order: Number(e.target.value) }))}
                          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                        />
                      </div>
                    </div>

                    {newSurveyQuestion.type === 'radio' && (
                      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-700">Opciones</p>
                        {newSurveyQuestion.options?.map((option, optionIndex) => (
                          <div key={`${option}-${optionIndex}`} className="flex items-center gap-3">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => setNewSurveyQuestion((prev) => {
                                const nextOptions = Array.isArray(prev.options) ? [...prev.options] : [];
                                nextOptions[optionIndex] = e.target.value;
                                return { ...prev, options: nextOptions };
                              })}
                              className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                            />
                            <button
                              type="button"
                              onClick={() => setNewSurveyQuestion((prev) => {
                                const nextOptions = Array.isArray(prev.options) ? [...prev.options] : [];
                                nextOptions.splice(optionIndex, 1);
                                return { ...prev, options: nextOptions };
                              })}
                              className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                            >Eliminar</button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setNewSurveyQuestion((prev) => ({ ...prev, options: Array.isArray(prev.options) ? [...prev.options, ''] : [''] }))}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >Agregar opción</button>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={newSurveyQuestion.active !== false}
                          onChange={(e) => setNewSurveyQuestion((prev) => ({ ...prev, active: e.target.checked }))}
                          className="h-4 w-4 rounded border-slate-300 text-[#273376] focus:ring-[#273376]"
                        />
                        Activa esta pregunta
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={createSurveyQuestion}
                      disabled={savingSection === 'survey'}
                      className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save size={16} /> Crear pregunta
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {surveyQuestions.length === 0 && (
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                      No hay preguntas cargadas todavía.
                    </div>
                  )}
                  {surveyQuestions.map((question, index) => (
                    <div key={question.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#273376]">Pregunta #{index + 1}</p>
                          <p className="text-sm text-slate-600">ID: {question.id}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => saveSurveyQuestion(question)}
                            disabled={savingSection === 'survey'}
                            className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a] disabled:cursor-not-allowed disabled:opacity-60"
                          >Guardar cambios</button>
                          <button
                            type="button"
                            onClick={() => deleteSurveyQuestion(question.id)}
                            disabled={savingSection === 'survey'}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >Eliminar</button>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Etiqueta</label>
                          <input
                            type="text"
                            value={question.label}
                            onChange={(e) => handleSurveyQuestionChange(index, 'label', e.target.value)}
                            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                            <select
                              value={question.type}
                              onChange={(e) => handleSurveyQuestionChange(index, 'type', e.target.value)}
                              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                            >
                              <option value="radio">Opción múltiple</option>
                              <option value="text">Respuesta abierta</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Orden</label>
                            <input
                              type="number"
                              min={0}
                              value={question.order}
                              onChange={(e) => handleSurveyQuestionChange(index, 'order', Number(e.target.value))}
                              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                            />
                          </div>
                        </div>
                        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={question.active}
                            onChange={(e) => handleSurveyQuestionChange(index, 'active', e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-[#273376] focus:ring-[#273376]"
                          />
                          Activar pregunta
                        </label>
                        {question.type === 'radio' && (
                          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4">
                            <p className="text-sm font-semibold text-slate-700">Opciones</p>
                            {Array.isArray(question.options) && question.options.map((option, optionIndex) => (
                              <div key={`${question.id}-${optionIndex}`} className="flex items-center gap-3">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleSurveyQuestionOptionChange(index, optionIndex, e.target.value)}
                                  className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSurveyQuestionOption(index, optionIndex)}
                                  className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                >Eliminar</button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addSurveyQuestionOption(index)}
                              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >Agregar opción</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#273376]">Estadísticas de encuesta</h3>
                <p className="mt-2 text-sm text-slate-500">Total de respuestas registradas: {surveyTotalResponses}</p>
                {surveyError && <p className="mt-4 text-sm text-red-600">{surveyError}</p>}
                <div className="mt-6 space-y-4">
                  {surveyStats.length === 0 && (
                    <p className="text-sm text-slate-500">Aún no hay respuestas registradas o no hay preguntas activas.</p>
                  )}
                  {surveyStats.map((stat) => (
                    <div key={stat.questionId} className="rounded-3xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-800">{stat.label}</p>
                      <p className="text-sm text-slate-500 mb-3">Respuestas totales: {stat.totalResponses}</p>
                      {stat.type === 'text' ? (
                        <div className="space-y-2">
                          {stat.latestResponses?.length ? stat.latestResponses.map((item, idx) => (
                            <p key={idx} className="text-sm text-slate-600">• {item}</p>
                          )) : <p className="text-sm text-slate-500">No hay respuestas de texto disponibles.</p>}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {Object.entries(stat.optionCounts).map(([option, count]) => (
                            <div key={option} className="flex justify-between text-sm text-slate-600">
                              <span>{option}</span>
                              <span>{count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sección para registrar nuevos usuarios administradores */}
        {(selectedSection === 'all' || selectedSection === 'admin') && (
          <section id="admin" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#273376]/10 px-4 py-2 text-sm font-semibold text-[#273376]">
                <Settings size={16} /> Administradores
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#273376]">Registrar nuevo administrador</h2>
              <p className="mt-2 text-sm text-slate-500">
                Crea un nuevo administrador con nombre, apellido, correo, teléfono, cargo, usuario y contraseña.
              </p>
            </div>
            <button
              type="button"
              onClick={registerAdmin}
              className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a]"
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
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Apellido</label>
              <input
                type="text"
                value={newAdminData.lastName}
                onChange={(e) => handleNewAdminChange('lastName', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Correo</label>
              <input
                type="email"
                value={newAdminData.email}
                onChange={(e) => handleNewAdminChange('email', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={newAdminData.phone}
                onChange={(e) => handleNewAdminChange('phone', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cargo</label>
              <input
                type="text"
                value={newAdminData.position}
                onChange={(e) => handleNewAdminChange('position', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
              <input
                type="text"
                value={newAdminData.username}
                onChange={(e) => handleNewAdminChange('username', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={newAdminData.password}
                onChange={(e) => handleNewAdminChange('password', e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#FFC907]"
              />
            </div>
          </div>

          {adminRegisterStatus && (
            <p className="mt-6 text-sm text-slate-700">{adminRegisterStatus}</p>
          )}
          {/* List existing admins */}
          <div className="mt-8">
            <h4 className="text-lg font-bold text-[#273376] mb-4">Administradores existentes</h4>
            <div className="space-y-3">
              {adminsList.length === 0 && <p className="text-sm text-slate-500">No hay administradores registrados o no se pudo cargar la lista.</p>}
              {adminsList.map((adm) => (
                <div key={adm.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    {editingAdminId === adm.id ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre</label>
                          <input placeholder="Nombre" className="w-full rounded-2xl border p-2" value={editingAdminData?.name || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), name: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Apellido</label>
                          <input placeholder="Apellido" className="w-full rounded-2xl border p-2" value={editingAdminData?.lastName || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), lastName: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Correo</label>
                          <input placeholder="correo@ejemplo.com" className="w-full rounded-2xl border p-2" value={editingAdminData?.email || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), email: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Usuario</label>
                          <input placeholder="usuario" className="w-full rounded-2xl border p-2" value={editingAdminData?.username || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), username: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono</label>
                          <input placeholder="0414-1234567" className="w-full rounded-2xl border p-2" value={editingAdminData?.phone || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), phone: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Cargo</label>
                          <input placeholder="Cargo" className="w-full rounded-2xl border p-2" value={editingAdminData?.position || ''} onChange={(e) => setEditingAdminData((s) => ({ ...(s||{}), position: e.target.value }))} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold text-slate-800 truncate">{adm.name} {adm.lastName} <span className="text-xs text-slate-500">({adm.username})</span></p>
                        <p className="text-sm text-slate-600">{adm.email} • {adm.phone} • {adm.position}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {editingAdminId === adm.id ? (
                      <>
                        <button onClick={saveEditAdmin} className="inline-flex items-center gap-2 rounded-full bg-[#273376] px-3 py-2 text-sm font-semibold text-white">Guardar</button>
                        <button onClick={cancelEditAdmin} className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditAdmin(adm)} className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold">Editar</button>
                        <button onClick={() => handleDeleteAdmin(adm.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">Eliminar</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}
      </div>

      {showAdminCreatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Administrador creado</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              El administrador se ha registrado correctamente.
            </p>
            <button
              type="button"
              onClick={() => setShowAdminCreatedModal(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#273376] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2f5a]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
