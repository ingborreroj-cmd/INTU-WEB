import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Settings } from 'lucide-react';
import { HeroSlide } from '../data/heroSlides';
import { heroService } from '../services/heroService';
import HeroAdminModal from './HeroAdminModal';

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const persistedData = await heroService.getSlides();
      setSlides(persistedData);
      setLoading(false);
    };
    initApp();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const coreInterval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(coreInterval);
  }, [slides]);

  const currentIndex = activeIndex >= slides.length ? 0 : activeIndex;
  const currentSlide = slides[currentIndex] || slides[0];

  const triggerAdminValidation = () => {
    const token = prompt('Ingrese clave técnica del INTU:');
      /**
   * Modificar el Token/Clave para acceder al módulo de administración del carrusel de inicio.
   * Actualmente esta vacia 
   */
    if (token === '') {
      setIsAdminOpen(true);
    } else if (token !== null) {
      alert('Credenciales no autorizadas.');
    }
  };

  const processDeployment = async (newConfiguration: HeroSlide[]) => {
    setLoading(true);
    const successfullySaved = await heroService.saveSlides(newConfiguration);
    if (successfullySaved) {
      setSlides([...newConfiguration]);
      setActiveIndex(0);
      setIsAdminOpen(false);
    } else {
      alert('Error de E/S en persistencia local.');
    }
    setLoading(false);
  };

  if (loading || slides.length === 0) {
    return (
      <div className="h-[85vh] bg-[#003366] flex flex-col items-center justify-center text-white font-montserrat gap-3">
        <div className="animate-spin rounded-full h-7 w-7 border-4 border-white border-t-[#b8860b]"></div>
        <span className="text-xs tracking-wider text-white/70 font-semibold">Cargando Módulo de Inicio...</span>
      </div>
    );
  }

  return (
    <div className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden w-full">
      
      <button onClick={triggerAdminValidation} className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all shadow-md hover:rotate-45 duration-300">
        <Settings size={18} />
      </button>

      <div className="absolute inset-0 z-0 scale-105 transition-all duration-700 ease-out filter brightness-110 contrast-105" style={{ backgroundImage: `url("${currentSlide.imageUrl}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/70 via-[#003366]/40 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-slate-950/15" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#b8860b]/20 text-[#f6d07d] border border-[#b8860b]/30 px-4 py-1.5 rounded-full mb-5 text-sm font-semibold backdrop-blur-sm shadow-md">
            <CheckCircle size={15} /> Democratizando la propiedad del suelo
          </div>
          <h1 className="clamp-title font-montserrat font-extrabold text-white leading-tight mb-5 drop-shadow-2xl" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.45)' }}>
            {currentSlide.label}
          </h1>
          <p className="text-white/90 text-base md:text-lg font-light mb-8 max-w-2xl leading-relaxed drop-shadow-sm">
            {currentSlide.caption}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <a href="#servicios" className="bg-gradient-to-r from-[#b8860b] to-[#9a700a] text-white px-7 py-3.5 rounded-[15px] font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105 transform">
              Nuestros Servicios <ArrowRight size={18} />
            </a>
            <a href="#nosotros" className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-7 py-3.5 rounded-[15px] font-bold text-base text-center transition-all hover:bg-white/20">
              Conoce el INTU
            </a>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setActiveIndex(index)} className={`h-2.5 w-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-[#b8860b] w-6' : 'bg-white/40 hover:bg-white'}`} />
          ))}
        </div>
      )}

      <div className="hidden lg:flex absolute bottom-12 right-12 gap-8 bg-white/10 backdrop-blur-xl p-6 rounded-[20px] border border-white/15 shadow-2xl">
        <div className="text-center">
          <p className="text-[#b8860b] text-2xl font-extrabold font-montserrat">+2.5M</p>
          <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold mt-0.5">Títulos Entregados</p>
        </div>
        <div className="w-px bg-white/15"></div>
        <div className="text-center">
          <p className="text-[#b8860b] text-2xl font-extrabold font-montserrat">1,200</p>
          <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold mt-0.5">Comités Activos</p>
        </div>
      </div>

      {isAdminOpen && <HeroAdminModal slides={slides} onClose={() => setIsAdminOpen(false)} onSave={processDeployment} />}
    </div>
  );
};

export default Hero;