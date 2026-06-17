import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';
import CatastroModal from './CatastroModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceSolid, setForceSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [catastroOpen, setCatastroOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // observe body class changes to allow pages to force a solid header
    const updateForce = () => setForceSolid(typeof document !== 'undefined' && document.body.classList.contains('force-solid-header'));
    updateForce();
    const observer = new MutationObserver(() => updateForce());
    try {
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    } catch (e) {
      // ignore if document not available
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Trámites', href: '#tramites' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Actualidad', href: '#proyectos' },
    { label: 'Marco jurídico', href: '/marco-juridico' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const servicesMenuItems = [
    { label: 'Nuestros servicios', href: '#servicios' },
    { label: 'CTU', href: '#ctu' },
    { label: 'Catastro popular', href: '#catastro' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string) => {
    if (!href) return;
    // section anchors like #inicio
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.location.hash = id;
        }, 80);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.location.hash = id;
      }
    } else if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      (isScrolled || forceSolid) ? 'bg-[#273376] py-2 shadow-md' : 'bg-transparent py-4'
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
            <button
              type="button"
              onClick={() => handleNav(navItems[0].href)}
              className="nav-underline font-medium text-sm font-montserrat text-white hover:text-gray-200"
            >
              {navItems[0].label}
            </button>

            {/* 2. Renderizamos el Dropdown de Servicios inmediatamente después */}
            <div
              className="relative"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesMenuOpen((s) => !s)}
                className="nav-underline inline-flex items-center gap-1 font-medium text-sm font-montserrat text-white hover:text-gray-200"
              >
                Servicios
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className={`absolute left-0 top-full mt-3 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-200 z-50 ${servicesMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col py-3">
                  {servicesMenuItems.map((service) => (
                    service.label.toLowerCase() === 'catastro popular' ? (
                      <button
                        key={service.label}
                        onClick={() => { setCatastroOpen(true); setServicesMenuOpen(false); }}
                        className="text-left w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#A70336]"
                      >
                        {service.label}
                      </button>
                    ) : (
                      <button
                        key={service.label}
                        type="button"
                        onClick={() => { handleNav(service.href); setServicesMenuOpen(false); }}
                        className="text-left w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#A70336]"
                      >
                        {service.label}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Renderizamos el resto de los items (slice desde el índice 1) */}
            {navItems.slice(1).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.href)}
                className="nav-underline font-medium text-sm font-montserrat text-white hover:text-gray-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* LADO DERECHO: ICONO DE INSTAGRAM + MENÚ MÓVIL */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/intu_ve/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram INTU"
              className="text-white transition hover:text-pink-300"
            >
              <Instagram size={24} />
            </a>
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
          <button
            type="button"
            onClick={() => { handleNav(navItems[0].href); setMobileMenuOpen(false); }}
            className="text-[#273376] font-semibold text-lg py-2 border-b border-gray-100 text-left"
          >
            {navItems[0].label}
          </button>
          
          <div className="py-2 border-b border-gray-100">
            <p className="text-[#273376] font-semibold text-lg mb-2">Servicios</p>
            {servicesMenuItems.map((service) => (
              service.label.toLowerCase() === 'catastro popular' ? (
                <button
                  key={service.label}
                  onClick={() => { setCatastroOpen(true); setMobileMenuOpen(false); }}
                  className="block text-[#273376] font-medium text-base py-1 hover:text-[#111d48] text-left w-full"
                >
                  {service.label}
                </button>
              ) : (
                <button
                  key={service.label}
                  type="button"
                  onClick={() => { handleNav(service.href); setMobileMenuOpen(false); }}
                  className="block text-[#273376] font-medium text-base py-1 hover:text-[#111d48] text-left w-full"
                >
                  {service.label}
                </button>
              )
            ))}
          </div>

          {navItems.slice(1).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => { handleNav(item.href); setMobileMenuOpen(false); }}
              className="text-[#273376] font-semibold text-lg py-2 border-b border-gray-100 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <CatastroModal isOpen={catastroOpen} onClose={() => setCatastroOpen(false)} />
    </header>
  );
};

export default Header;