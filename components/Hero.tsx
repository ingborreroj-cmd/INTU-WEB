import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    // Contenedor principal: Ocupa el 85% de la altura de la pantalla en móvil y 80% en escritorio
    <div className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden">
      
      {/* IMAGEN DE FONDO Y CAPA DE COLOR (OVERLAY) */}
      <div 
        className="absolute inset-0 z-0 scale-105" // scale-105 evita bordes blancos en animaciones
        style={{
          // RUTA LOCAL ACTUALIZADA:
          backgroundImage: 'url("/assets/img/hero-bg.jpg")', 
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* Degradado: Va de azul opaco (#003366) a transparente para que el texto sea legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 via-[#003366]/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          
          {/* Badge superior: "Democratizando la propiedad..." */}
          <div className="inline-flex items-center gap-2 bg-[#b8860b]/20 text-[#f6d07d] border border-[#b8860b]/30 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold backdrop-blur-sm">
            <CheckCircle size={16} />
            Democratizando la propiedad del suelo
          </div>
          
          {/* TÍTULO PRINCIPAL: Usa la clase 'clamp-title' que definimos en el index.html */}
          <h1 className="clamp-title font-montserrat font-extrabold text-white leading-tight mb-6" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.3)' }}>
            Regularización y Justicia <br />
            <span className="text-[#b8860b]">para el Pueblo Venezolano</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl leading-relaxed">
          El Instituto Nacional de Tierras Urbanas (INTU) es el ente venezolano encargado de regularizar y administrar la tenencia de tierras urbanas y periurbanas. Su objetivo principal es garantizar seguridad jurídica a los ciudadanos y democratizar el uso del suelo para mejorar la calidad de vida.
          </p>
          
          {/* BOTONES DE ACCIÓN: Conectan con las anclas #servicios y #nosotros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#servicios" 
              className="bg-[#b8860b] hover:bg-[#9a700a] text-white px-8 py-4 rounded-[15px] font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-lg group"
            >
              Nuestros Servicios
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#nosotros" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-[15px] font-bold text-lg text-center transition-all"
            >
              Conoce el INTU
            </a>
          </div>
        </div>
      </div>

      {/* PANEL DE ESTADÍSTICAS (Solo visible en pantallas grandes 'lg') */}
      <div className="hidden lg:flex absolute bottom-12 right-12 gap-10 bg-white/5 backdrop-blur-xl p-8 rounded-[20px] border border-white/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center">
          <p className="text-[#b8860b] text-3xl font-extrabold font-montserrat">+2.5M</p>
          <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Títulos Entregados</p>
        </div>
        {/* Línea divisoria vertical */}
        <div className="w-px bg-white/10"></div>
        <div className="text-center">
          <p className="text-[#b8860b] text-3xl font-extrabold font-montserrat">1,200</p>
          <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Comités Activos</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;