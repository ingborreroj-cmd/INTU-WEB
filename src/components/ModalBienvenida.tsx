import React, { useState, useEffect } from 'react';
import { X, Bell, ArrowRight } from 'lucide-react';
import { modalService, ModalData } from '../services/modalService';

const DEFAULT_MODAL: ModalData = {
  title: '¡Bienvenido al Portal INTU!',
  body: 'Estamos trabajando para brindarte una mejor atención ciudadana. Consulta tus trámites de regularización de tierras de forma digital.',
  backgroundPath: '/assets/img/fondo_modal.jpg',
  active: true,
};

const ModalBienvenida: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const loadModal = async () => {
      const backendModal = await modalService.getModal();
      setModalData(backendModal ?? DEFAULT_MODAL);
      if ((backendModal?.active ?? DEFAULT_MODAL.active) !== false) {
        timer = window.setTimeout(() => {
          setIsOpen(true);
        }, 1000);
      }
    };
    loadModal();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  // Bloqueo de scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen || !modalData || modalData.active === false) return null;

  return (
    /* Cambiamos items-center por justify-center (móvil) y justify-end (escritorio) */
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:justify-end p-4 md:p-20">
      
      {/* CAPA DE FONDO (IMAGEN QUE RECUBRE TODA LA PANTALLA) */}
      <div 
        className="absolute inset-0 z-0 animate-fade-in"
        style={{
          backgroundImage: `url("${modalData.backgroundPath || '/assets/img/fondo_modal.jpg'}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={() => setIsOpen(false)}
      >
        {/* Capa de color con menor opacidad en el centro para dejar ver el logo de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/40 via-transparent to-[#003366]/60 backdrop-blur-[1px]"></div>
      </div>

      {/* CONTENEDOR DEL MODAL (DESPLAZADO A UN COSTADO) */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-[25px] shadow-2xl overflow-hidden animate-fade-up">
        
        {/* Decoración superior */}
        <div className="h-2 bg-gradient-to-r from-[#003366] via-[#b8860b] to-[#003366]"></div>

        <div className="p-8">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-[#003366] transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#b8860b]/10 p-4 rounded-full mb-6">
              <Bell className="text-[#b8860b]" size={32} />
            </div>

            <h2 className="text-[#003366] font-montserrat font-extrabold text-2xl mb-4">
              {modalData.title || '¡Bienvenido al Portal INTU!'}
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-8 whitespace-pre-line">
              {modalData.body || 'Estamos trabajando para brindarte una mejor atención ciudadana. Consulta tus trámites de regularización de tierras de forma digital.'}
            </p>

            <div className="grid grid-cols-1 gap-3 w-full">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-[#003366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#002850] transition-all active:scale-95 shadow-lg shadow-[#003366]/20"
              >
                Comenzar exploración <ArrowRight size={18} />
              </button>
              
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-2">
                Instituto Nacional de Tierras Urbanas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBienvenida;