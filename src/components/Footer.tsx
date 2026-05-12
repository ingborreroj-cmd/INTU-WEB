import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Landmark, Globe, Shield } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo and About */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-4 lg:gap-6 bg-white p-4 rounded-xl shadow-sm w-fit">
              <div className="flex items-center">
                <img 
                  src="/assets/img/intu_logo2.png" 
                  alt="Logo INTU" 
                  className="h-10 md:h-12 w-auto object-contain" 
                />
              </div>

              <div className="flex items-center border-l border-gray-200 pl-4 lg:pl-6">
                <img 
                  src="/assets/img/ministerio_logo.png" 
                  alt="Logo Ministerio" 
                  className="h-10 md:h-12 w-auto object-contain" 
                />
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Ente adscrito al Ministerio del Poder Popular para Hábitat y Vivienda. Comprometidos con la democratización del suelo urbano en Venezuela.
            </p>

            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#b8860b] transition-colors"><Twitter size={18} /></a>
              <a href="https://www.facebook.com/IntuVe/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-[#b8860b] transition-colors"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/intu_ve/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-[#b8860b] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#b8860b] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-2">
              <Globe size={18} className="text-[#b8860b]" /> 
              Enlaces de Interés
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="https://www.minhvi.gob.ve/minhvi/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ministerio de Vivienda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 2</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 3</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 4</a></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-2">
              <Shield size={18} className="text-[#b8860b]" />
              Legal e Institucional
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="https://www.asambleanacional.gob.ve/leyes/sancionadas/ley-de-tierras-urbanas" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ley de Tierras Urbanas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 2</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 3</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ejemplo 4</a></li>
            </ul>
          </div>

          {/* Government Branding */}
          <div className="flex flex-col gap-6">
            <h4 className="font-montserrat font-bold text-lg mb-4">Venezuela Toda</h4>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center">
              <div className="flex gap-4 mb-4 grayscale brightness-200 opacity-80">
                <img src="https://picsum.photos/seed/gov1/100/40" alt="Logo Gobierno" className="h-8 object-contain" />
                <img src="https://picsum.photos/seed/gov2/100/40" alt="Logo GMVV" className="h-8 object-contain" />
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
          <p>© 2023 Instituto Nacional de Tierras Urbanas (INTU). RIF: G-20000000-0</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Mapa del Sitio</a>
            <a href="#" className="hover:text-white">Accesibilidad</a>
            <a href="#" className="hover:text-white">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;