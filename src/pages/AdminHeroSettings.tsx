import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw, Type, Plus, Trash2, Upload, FileImage } from 'lucide-react';
import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';
import { heroService } from '../services/heroService';
import { ADMIN_ACCESS_KEY } from '../constants/admin';


const AdminHeroSettings: React.FC = () => {
  const [editedSlides, setEditedSlides] = useState<HeroSlide[]>([]);
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
    const loadSlides = async () => {
      const persistedData = await heroService.getSlides();
      setEditedSlides(persistedData);
      setLoading(false);
    };
    loadSlides();
  }, [isAuthorized]);

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
      caption: 'Ingrese la descripción del impacto de esta gestión.',
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

  const handleSave = async () => {
    setSaving(true);
    const successfullySaved = await heroService.saveSlides(editedSlides);
    setSaving(false);
    if (successfullySaved) {
      alert('Configuración del Hero guardada correctamente.');
      navigate('/');
    } else {
      alert('Error de E/S en persistencia local. Intente nuevamente.');
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Desea restaurar las diapositivas predeterminadas?')) {
      setEditedSlides(JSON.parse(JSON.stringify(DEFAULT_SLIDES)));
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
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Configuración del Hero</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Modifique los títulos, descripciones e imágenes del carrusel principal sin afectar la experiencia del homepage.
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
          {editedSlides.map((slide, idx) => (
            <div key={slide.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#003366]">Diapositiva #{idx + 1}</h2>
                  <p className="mt-1 text-sm text-slate-500">Los cambios se aplican al guardarse.</p>
                </div>
                <button
                  onClick={() => handleRemoveSlide(idx)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Type size={14} /> Título Principal
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b]"
                      value={slide.label}
                      onChange={(e) => handleInputChange(idx, 'label', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Type size={14} /> Subtítulo descriptivo
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#b8860b] whitespace-normal break-words"
                      value={slide.caption}
                      onChange={(e) => handleInputChange(idx, 'caption', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <FileImage size={14} /> Imagen de Fondo
                    </label>
                    <label className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 transition hover:border-[#b8860b] hover:bg-slate-50">
                      <span className="flex items-center gap-2">
                        <Upload size={14} /> {slide.imageUrl ? 'Cambiar imagen' : 'Cargar imagen'}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(idx, e)} />
                    </label>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-center">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Vista previa</span>
                  <div
                    className="mt-4 min-h-[215px] overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat border border-slate-200"
                    style={{ backgroundImage: slide.imageUrl ? `url("${slide.imageUrl}")` : 'none' }}
                  >
                    {!slide.imageUrl && (
                      <div className="flex h-full min-h-[215px] items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">
                        Sin imagen seleccionada
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-left text-sm leading-6 text-slate-700 whitespace-normal break-words">
                    <strong>Título:</strong> {slide.label}
                  </p>
                  <p className="mt-2 text-left text-sm leading-6 text-slate-600 whitespace-normal break-words">
                    <strong>Subtítulo:</strong> {slide.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddSlide}
            className="rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#b8860b] hover:text-[#b8860b]"
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <Plus size={16} /> Agregar nueva diapositiva
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RefreshCw size={16} /> Restaurar valores predeterminados
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3a67] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} /> {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroSettings;
