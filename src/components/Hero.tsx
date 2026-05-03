import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/heroSlides';

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden">
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

      <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 gap-3">
        <button
          onClick={handlePrev}
          className="h-12 w-12 rounded-full bg-white/15 text-white shadow-lg backdrop-blur transition-all duration-300 hover:bg-white/25 hover:scale-110 hover:shadow-xl"
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="h-12 w-12 rounded-full bg-white/15 text-white shadow-lg backdrop-blur transition-all duration-300 hover:bg-white/25 hover:scale-110 hover:shadow-xl"
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition-all ${index === activeIndex ? 'bg-[#b8860b]' : 'bg-white/40 hover:bg-white'}`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

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
    </div>
  );
};

export default Hero;
