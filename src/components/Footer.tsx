import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="relative bg-[#003366] text-white pt-20 pb-10 overflow-hidden"
    >
      {/* Capa de textura cartográfica */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/img/lineas_fondo.png")', // Reemplaza con tu ruta
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'luminosity' // Esto ayuda a que las líneas se integren con el azul
        }}
      ></div>

      {/* Contenido con z-index para estar sobre la imagen */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Logo and About */}
          <div className="flex flex-col gap-6">
            <div className="w-fit">
              <img
                src="/assets/img/ministerio_logo_blank.png"
                alt="Logo Ministerio"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              Instituto Nacional de Tierras Urbanas adscrito al Ministerio para Hábitat y Vivienda. Trabajamos por la democratización del suelo urbano y una Venezuela más justa.
            </p>

            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.instagram.com/intu_ve/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl hover:bg-[#b8860b] transition-colors group"
              >
                <Instagram size={18} className="text-white" />
                <span className="text-white font-montserrat text-xs font-bold tracking-wider group-hover:text-white">
                  intu_ve
                </span>
              </a>
            </div>

          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-2">
              <Shield size={18} className="text-[#b8860b]" />
              Legal e Institucional
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="https://www.asambleanacional.gob.ve/leyes/sancionadas/ley-de-tierras-urbanas" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ley de Tierras Urbanas</a></li>
              <li><a href="https://www.minhvi.gob.ve" rel="noopener noreferrer" className="hover:text-white transition-colors">Ministerio Hábitat y Vivienda</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Comités de Tierra Urbana "CTU"</a></li>
              <li><a href="http://www.inmobiliarianacional.gob.ve" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Inmoviliaria Nacional Wannabe</a></li>           
              <li><a href="https://www.saren.gob.ve" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">saren</a></li>           
              
              </ul>
          </div>

          {/* Government Branding */}
          <div className="flex flex-col gap-6">
            <h4 className="font-montserrat font-bold text-lg mb-4">Venezuela</h4>
            <div className="p-6 rounded-xl flex flex-col items-center">
              <div className="flex gap-4 mb-4 brightness-200 opacity-80">
                <img src="assets/img/intu_logo2.png" alt="Bandera de Venezuela" className="h-8 object-contain" />
                <img src="assets/img/escudo_ve.png" alt="Escudo de Venezuela" className="h-8 object-contain" />
              </div>
              <p className="text-[10px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                Gobierno Bolivariano de Venezuela <br />
                Ministerio para la Vivienda y Hábitat
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-bold">
          <p>© Instituto Nacional de Tierras Urbanas (INTU). RIF: G-200101873</p>
          <p>212, 1060 Av. Orinoco, Caracas 1080, Miranda</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;