import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Trámites', href: '#tramites' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Actualidad', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const servicesMenuItems = [
    { label: 'Nuestros servicios', href: '#servicios' },
    { label: 'CTU', href: '#ctu' },
    { label: 'Catastro popular', href: '#catastro' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#003366] py-2 shadow-md' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          
          {/* LADO IZQUIERDO: LOGO INTU */}
          <div className="flex items-center">
            <img 
              src="/assets/img/intu_logo_blank.png" 
              alt="Logo INTU" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </div>

          {/* CENTRO: NAVEGACIÓN (Desktop) */}
          <nav className="hidden xl:flex gap-8 items-center">
            {/* 1. Renderizamos solo el Inicio */}
            <a
              href={navItems[0].href}
              className="nav-underline font-medium text-sm font-montserrat text-white hover:text-gray-200"
            >
              {navItems[0].label}
            </a>

            {/* 2. Renderizamos el Dropdown de Servicios inmediatamente después */}
            <div
              className="relative"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <a
                href="#servicios"
                className="nav-underline inline-flex items-center gap-1 font-medium text-sm font-montserrat text-white hover:text-gray-200"
              >
                Servicios
                <ChevronDown className="h-4 w-4" />
              </a>

              <div className={`absolute left-0 top-full mt-3 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-200 z-50 ${servicesMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col py-3">
                  {servicesMenuItems.map((service) => (
                    <a
                      key={service.label}
                      href={service.href}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#003366]"
                    >
                      {service.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Renderizamos el resto de los items (slice desde el índice 1) */}
            {navItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-underline font-medium text-sm font-montserrat text-white hover:text-gray-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* LADO DERECHO: LOGO 3 Y MENÚ MÓVIL */}
          <div className="flex items-center gap-4">
            <button 
              className="xl:hidden p-2 rounded-lg bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-6 gap-4">
          {/* En móvil también los ordenamos: Inicio -> Servicios -> Resto */}
          <a
            href={navItems[0].href}
            className="text-[#003366] font-semibold text-lg py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navItems[0].label}
          </a>
          
          <div className="py-2 border-b border-gray-100">
            <p className="text-[#003366] font-semibold text-lg mb-2">Servicios</p>
            {servicesMenuItems.map((service) => (
              <a
                key={service.label}
                href={service.href}
                className="block text-[#003366] font-medium text-base py-1 hover:text-[#001f44]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.label}
              </a>
            ))}
          </div>

          {navItems.slice(1).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#003366] font-semibold text-lg py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;