import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { DEFAULT_SLIDES, HeroSlide } from '../data/heroSlides';
import { heroService } from '../services/heroService';

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(() => heroService.getInitialSlides());
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const loadSlides = async () => {
      const persistedData = await heroService.getSlides();
      if (active && persistedData.length > 0) setSlides(persistedData);
    };
    loadSlides();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const coreInterval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(coreInterval);
  }, [slides]);

  const currentIndex = activeIndex >= slides.length ? 0 : activeIndex;
  const currentSlide = slides[currentIndex] || slides[0] || DEFAULT_SLIDES[0];

  return (
    <div className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden w-full">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={currentSlide.imageUrl}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={2160}
          height={1350}
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-all duration-700 ease-out brightness-110 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#273376]/70 via-[#273376]/40 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-slate-950/15" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#FFC907]/20 text-[#FFF27C] border border-[#FFC907]/30 px-4 py-1.5 rounded-full mb-5 text-sm font-semibold backdrop-blur-sm shadow-md">
            <CheckCircle size={15} /> Democratizando la propiedad del suelo
          </div>
          <h1 className="clamp-title font-montserrat font-extrabold text-white leading-tight mb-5 drop-shadow-2xl" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.45)' }}>
            {currentSlide.label}
          </h1>
          <p className="text-white/90 text-base md:text-lg font-light mb-8 max-w-2xl leading-relaxed drop-shadow-sm">
            {currentSlide.caption}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <a href="#servicios" className="bg-gradient-to-r from-[#FFC907] to-[#d3a300] text-white px-7 py-3.5 rounded-[15px] font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105 transform">
              Nuestros Servicios <ArrowRight size={18} />
            </a>
            <a href="#nosotros" className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-7 py-3.5 rounded-[15px] font-bold text-base text-center transition-all hover:bg-white/20 hover:text-[#273376]">
              Conoce el INTU
            </a>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Mostrar diapositiva ${index + 1}: ${slides[index].label}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-[#FFC907] w-6' : 'bg-white/40 hover:bg-white'}`}
            />
          ))}
        </div>
      )}

      {/* Contadores institucionales retirados temporalmente. */}
    </div>
  );
};

export default Hero;
