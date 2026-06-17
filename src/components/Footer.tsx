import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Globe, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative bg-[#273376] text-white pt-16 pb-10 overflow-hidden"
    >
      {/* Capa de textura cartográfica */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/img/lineas_fondo.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'luminosity' 
        }}
      ></div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Sección de Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
          
          {/* Columna 1: Logo del Ministerio (Más Grande), Texto de Relleno y Redes Genéricas */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="w-fit flex items-center">
                <img
                  src="/assets/img/habitat_vivienda_blank.png"
                  alt="Logo Ministerio"
                  className="h-14 md:h-16 w-auto object-contain select-none transition-transform"
                />
              </div>

              <p className="text-white/60 text-[13px] md:text-sm leading-relaxed max-w-sm font-light">
                Impulsando el hábitat comunal y el desarrollo urbano sustentable. Una iniciativa enmarcada en las políticas de vivienda del Gobierno Bolivariano de Venezuela para hacer realidad el sueño de un hogar digno para cada familia.
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-2">
              <a
                href="https://www.instagram.com/minvivienda_ve/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#FFC907] rounded-xl text-white/60 hover:text-white transition-all shadow-sm"
                aria-label="Instagram MiVivienda"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@minvivienda_ve"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#FFC907] rounded-xl text-white/60 hover:text-white transition-all shadow-sm"
                aria-label="TikTok MiVivienda"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M170.6 32.1a88 88 0 0 1-46.8-13V142.8a38 38 0 1 1-38-38 37.2 37.2 0 0 1 5.4.4V119a57.4 57.4 0 0 0-5.4-.4 56 56 0 0 0 56 56 56.2 56.2 0 0 0 37.3-13.8V88.6h48.7A88.1 88.1 0 0 1 170.6 32.1Z" />
                </svg>
              </a>
              <a
                href="https://www.minhvi.gob.ve"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#FFC907] rounded-xl text-white/60 hover:text-white transition-all shadow-sm"
                aria-label="Sitio web MINHVI"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Columna 2: Legal e Institucional */}
          <div className="flex flex-col">
            <h4 className="font-montserrat font-bold text-xs tracking-widest uppercase text-white/90 mb-6 flex items-center gap-2 border-b border-white/5 pb-2">
              <Shield size={14} className="text-[#FFC907]" />
              Legal e Institucional
            </h4>
            <ul className="space-y-3 text-[13px] md:text-sm text-white/60 font-medium">
              <li><Link to="/marco-juridico" className="hover:text-white hover:underline transition-all">Ley de Tierras Urbanas</Link></li>
              <li><a href="https://www.minhvi.gob.ve" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all">Ministerio Hábitat y Vivienda</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all">Comités de Tierra Urbana "CTU"</a></li>
              
            </ul>
          </div>

          {/* Columna 3: Logo INTU (Más Grande) + Información del INTU + Instagram Oficial */}
          <div className="flex flex-col gap-5">
            <div className="w-fit flex items-center">
              <img 
                src="assets/img/intu_footer.png" 
                alt="Logo INTU" 
                className="h-11 md:h-13 object-contain brightness-200 select-none" 
              />
            </div>
            
            <p className="text-white/60 text-[13px] md:text-sm leading-relaxed max-w-sm font-light">
              Instituto Nacional de Tierras Urbanas adscrito al Ministerio para Hábitat y Vivienda. Trabajamos por la democratización del suelo urbano y una Venezuela más justa.
            </p>

            <div className="pt-1">
              <a 
                href="https://www.instagram.com/intu_ve/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-[#FFC907] hover:border-transparent transition-all group shadow-sm"
              >
                <Instagram size={15} className="text-white/80 group-hover:text-white" />
                <span className="text-white/80 font-montserrat text-xs font-bold tracking-wider group-hover:text-white">
                  intu_ve
                </span>
              </a>
            </div>
          </div>

        </div>

        <div className="mb-8 flex items-center gap-3">
          <span className="h-1.5 w-10 rounded-full bg-[#A70336]" />
          <p className="text-[11px] text-white/60 uppercase tracking-[0.25em] font-semibold">Sitio oficial de comunicaciones INTU</p>
        </div>

        {/* Barra de Créditos / Footer de Cierre */}
        <div className="pt-6 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium text-center lg:text-left">
          <p>© Instituto Nacional de Tierras Urbanas (INTU). RIF: G-200101873</p>
          <p>Esquina de Av. Orinoco, Las Mercedes, Caracas, Miranda</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;