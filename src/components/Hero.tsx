import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Settings } from 'lucide-react';
import { HeroSlide, getActiveSlides } from '../data/heroSlides';
import HeroAdminModal from './HeroAdminModal';

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Carga inicial persistida
  useEffect(() => {
    setSlides(getActiveSlides());
  }, []);

  // Control dinámico del intervalo basado en la cantidad variable de diapositivas
  useEffect(() => {
    if (slides.length <= 1) return; // Si hay solo 1, no hace falta rotar

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides]);

  // Protección contra índices desbordados tras eliminar diapositivas activas
  const safeIndex = activeIndex >= slides.length ? 0 : activeIndex;
  const activeSlide = slides[safeIndex] || slides[0];

  const handleOpenAdmin = () => {
    const password = prompt('Ingrese la clave de Administrador del INTU para continuar:');
    if (password === '') {
      setIsAdminOpen(true);
    } else if (password !== null) {
      alert('Clave incorrecta. Acceso denegado.');
    }
  };

  const handleSaveAdmin = (updatedSlides: HeroSlide[]) => {
    localStorage.setItem('intu_hero_slides', JSON.stringify(updatedSlides));
    setSlides([...updatedSlides]); 
    setActiveIndex(0); // Reinicia siempre a la primera posición para verificar cambios
    setIsAdminOpen(false);
  };

  if (slides.length === 0) {
    return <div className="h-[85vh] bg-[#003366] flex items-center justify-center text-white font-montserrat">Cargando interfaz institucional...</div>;
  }

  return (
    <div className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden">
      
      {/* ACCESO GESTOR ADMINISTRATIVO */}
      <button 
        onClick={handleOpenAdmin}
        className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all shadow-lg hover:rotate-45 duration-300"
        title="Administrar Carrusel"
      >
        <Settings size={20} />
      </button>

      {/* RENDERIZADO DINÁMICO DE IMAGEN (Soporta links de Internet y locales) */}
      <div
        className="absolute inset-0 z-0 scale-105 transition-all duration-700 ease-out filter brightness-110 contrast-105"
        style={{
          backgroundImage: `url("${activeSlide.imageUrl}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/60 via-[#003366]/40 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-slate-950/15" />

      {/* TEXTOS */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#b8860b]/20 text-[#f6d07d] border border-[#b8860b]/30 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CheckCircle size={16} />
            Democratizando la propiedad del suelo
          </div>

          <h1 className="clamp-title font-montserrat font-extrabold text-white leading-tight mb-6 drop-shadow-2xl" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
            {activeSlide.label}
          </h1>

          <p className="text-white/95 text-lg md:text-xl font-light mb-10 max-w-2xl leading-relaxed drop-shadow-lg">
            {activeSlide.caption}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#servicios"
              className="bg-gradient-to-r from-[#b8860b] to-[#9a700a] hover:from-[#9a700a] hover:to-[#7a5a08] text-white px-8 py-4 rounded-[15px] font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl group transform hover:scale-105"
            >
              Nuestros Servicios
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#nosotros"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-[15px] font-bold text-lg text-center transition-all duration-300 hover:shadow-lg hover:bg-white/15"
            >
              Conoce el INTU
            </a>
          </div>
        </div>
      </div>

      {/* PAGINACIÓN DINÁMICA (Ajusta la cantidad de puntos según existan) */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full transition-all ${index === safeIndex ? 'bg-[#b8860b]' : 'bg-white/40 hover:bg-white'}`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* INFORMACIÓN ESTADÍSTICA */}
      <div className="hidden lg:flex absolute bottom-12 right-12 gap-10 bg-white/10 backdrop-blur-xl p-8 rounded-[20px] border border-white/20 animate-fade-up shadow-2xl" style={{ animationDelay: '0.4s' }}>
        <div className="text-center">
          <p className="text-[#b8860b] text-3xl font-extrabold font-montserrat drop-shadow-lg">+2.5M</p>
          <p className="text-white/80 text-xs uppercase tracking-widest font-bold">Títulos Entregados</p>
        </div>
        <div className="w-px bg-white/20"></div>
        <div className="text-center">
          <p className="text-[#b8860b] text-3xl font-extrabold font-montserrat drop-shadow-lg">1,200</p>
          <p className="text-white/80 text-xs uppercase tracking-widest font-bold">Comités Activos</p>
        </div>
      </div>

      {/* VENTANA DE GESTIÓN */}
      {isAdminOpen && (
        <HeroAdminModal 
          slides={slides}
          onClose={() => setIsAdminOpen(false)}
          onSave={handleSaveAdmin}
        />
      )}
    </div>
  );
};

export default Hero;