
import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark } from 'lucide-react';

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
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Noticias', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-[#003366] p-2 rounded-lg transition-transform group-hover:scale-110">
            <Landmark className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold leading-tight font-montserrat transition-colors ${isScrolled ? 'text-[#003366]' : 'text-white'}`}>INTU</span>
            <span className={`text-[10px] uppercase tracking-widest transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>Venezuela</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
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
          <button className="bg-[#b8860b] hover:bg-[#9a700a] text-white px-5 py-2 rounded-full font-bold text-sm transition-all hover:shadow-lg active:scale-95">
            Trámites
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
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

      {/* Mobile Menu */}
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
          <button className="bg-[#003366] text-white w-full py-3 rounded-xl font-bold mt-2">
            Iniciar Trámite
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;