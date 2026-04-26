import React from 'react';
import { ClipboardCheck, FileText, CreditCard, MapPin, Search } from 'lucide-react'; 

const Tramites = () => {
  const pasos = [
    {
      id: 1,
      titulo: "Trámite Ejemplo 01",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icono: <MapPin className="w-6 h-6" />
    },
    {
      id: 2,
      titulo: "Trámite Ejemplo 02",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      icono: <FileText className="w-6 h-6" />
    },
    {
      id: 3,
      titulo: "Trámite Ejemplo 03",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      icono: <CreditCard className="w-6 h-6" /> 
    },
    {
      id: 4,
      titulo: "Trámite Ejemplo 04",
      desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      icono: <ClipboardCheck className="w-6 h-6" />
    },
    {
      id: 5,
      titulo: "Trámite Ejemplo 05",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      icono: <Search className="w-6 h-6" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        {/* Título Principal */}
        <h2 className="text-[#003366] font-montserrat font-extrabold text-3xl md:text-4xl mb-4">
          Conoce nuestros trámites
        </h2>
        {/* Línea divisoria dorada */}
        <div className="w-24 h-1 bg-[#b8860b] mx-auto"></div>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-light">
          Explora los servicios disponibles para la regularización y titularidad de tierras urbanas a nivel nacional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {pasos.map((paso) => (
          <div key={paso.id} className="relative group">
            {/* Línea conectora */}
            {paso.id !== 5 && (
              <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[#b8860b]/20 z-0" />
            )}
            
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Círculo del Icono */}
              <div className="w-20 h-20 rounded-full bg-white border-4 border-[#003366] flex items-center justify-center text-[#003366] group-hover:bg-[#b8860b] group-hover:border-[#b8860b] group-hover:text-white transition-all duration-300 shadow-xl mb-6">
                {paso.icono}
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full group-hover:shadow-lg transition-all flex flex-col border-t-4 border-t-transparent group-hover:border-t-[#b8860b]">
                <span className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-2 block">
                  Información
                </span>
                <h3 className="text-lg font-bold text-[#003366] mb-3 font-montserrat">
                  {paso.titulo}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {paso.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tramites;