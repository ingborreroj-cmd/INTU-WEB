import React, { useEffect, useState } from 'react';
import { tramites } from '../data/tramites_data';

const Tramites = () => {
  const pasos = tramites;

  const [openPaso, setOpenPaso] = useState<null | number>(null);

  // Close modal on Escape
  // Nota: aquí añadimos el listener para cerrar el modal con la tecla Escape (accesibilidad)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPaso(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Bloqueo de scroll del body cuando un paso/modal está abierto
  useEffect(() => {
    if (openPaso === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [openPaso]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
        {pasos.map((paso) => (
          <div key={paso.id} className="flex justify-center">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenPaso(paso.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenPaso(paso.id); }}
              className="relative z-10 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer outline-none"
            >
              <div className="w-48 lg:w-56 rounded-xl shadow-2xl overflow-hidden bg-slate-100">
                <img
                  src={`/assets/img/tramite-${paso.id}.png`}
                  alt={paso.titulo}
                  loading="lazy"
                  className="w-full h-72 object-cover block"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openPaso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpenPaso(null)} />
          {/* Contenedor del modal (scrollable). Cambio: max-h 80vh para contenidos largos */}
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6 z-10 max-h-[80vh] overflow-auto">
            <button aria-label="Cerrar" className="absolute top-4 right-4 text-slate-600 hover:text-slate-900" onClick={() => setOpenPaso(null)}>✕</button>
            {(() => {
              const paso = pasos.find(p => p.id === openPaso);
              return paso ? paso.modalContent : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tramites;