import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Trámites', href: '#tramites' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Actualidad', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-2 shadow-md' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          
          {/* LADO IZQUIERDO: LOGO 1 Y LOGO 2 */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Espacio para Logo 1 */}
            <div className="flex items-center">
              <img 
                src="/assets/img/intu_logo2.png" 
                alt="Logo Gobierno" 
                className={`h-10 md:h-12 w-auto object-contain transition-all ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`} 
              />
            </div>

            {/* Espacio para Logo 2 (Seguido del primero) */}
            <div className="flex items-center border-l border-gray-300/30 pl-4 lg:pl-8">
              <img 
                src="/assets/img/ministerio_logo.png" 
                alt="Logo INTU" 
                className={`h-10 md:h-12 w-auto object-contain transition-all ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}
              />
            </div>
          </div>

          {/* CENTRO: NAVEGACIÓN (Desktop) */}
          <nav className="hidden xl:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-underline font-medium text-sm font-montserrat transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-[#003366]' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* LADO DERECHO: LOGO 3 Y MENÚ MÓVIL */}
          <div className="flex items-center gap-4">
            {/* Espacio para Logo 3 (Esquina derecha) */}
            <div className="hidden md:block">
              <img 
                src="/assets/img/logo-gmvv.png" 
                alt="Logo GMVV" 
                className={`h-10 md:h-12 w-auto object-contain transition-all ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}
              />
            </div>

            {/* Mobile Toggle */}
            <button 
              className="xl:hidden p-2 rounded-lg bg-[#003366]/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className={isScrolled ? 'text-[#003366]' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-[#003366]' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil (Desplegable) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#003366] font-semibold text-lg py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex justify-center pt-4 opacity-50">
             <img src="/assets/img/logo-intu.png" alt="Logo Intu" className="h-8" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;