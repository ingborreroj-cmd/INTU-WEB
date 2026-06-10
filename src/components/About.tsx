import React from 'react';
import { Target, Eye } from 'lucide-react';
import aboutModalData from '../data/about_modal_data';

const About: React.FC = () => {
  const [activeModal, setActiveModal] = React.useState<'values' | 'vision' | null>(null);

  React.useEffect(() => {
    if (!activeModal) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [activeModal]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 relative overflow-hidden">
      
      {/* Contenedor con fondo de contraste para que las tarjetas blancas resalten perfectamente */}
      <div className="bg-slate-50/60 backdrop-blur-sm rounded-[32px] p-6 md:p-12 border border-slate-100 shadow-inner">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-20 relative">
          
          {/* Columna Izquierda: Tarjeta Principal Vertical con Identidad del INTU */}
          <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-4 group">
  <div className="relative bg-gradient-to-b from-slate-100 to-slate-200/90 p-8 md:p-10 rounded-[28px] shadow-md hover:shadow-xl border-t-4 border-[#FFC907] border-x border-b border-slate-200 flex flex-col items-center justify-center min-h-[460px] transition-all duration-300 overflow-hidden">
    
    {/* Destello de luz de fondo para dar profundidad */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFC907]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#273376]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div className="w-full flex flex-col items-center justify-between h-full relative z-10 gap-8">
      
      {/* Etiqueta Superior Estilizada */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[#FFC907] font-montserrat font-bold tracking-[0.2em] uppercase text-xs block text-center">
          Nuestra Razón de Ser
        </span>
        <div className="w-8 h-[2px] bg-[#273376]/20 rounded-full"></div>
      </div>
      
      {/* Contenedor del Logotipo con Micro-interacción */}
      <div className="w-full max-w-[260px] aspect-square flex items-center justify-center p-4 transform group-hover:scale-105 transition-transform duration-500 ease-out">
        <img 
          src="/assets/img/intu_logo2.png" 
          alt="Insignia INTU Grande" 
          className="w-full h-full object-contain select-none drop-shadow-[0_8px_16px_rgba(39,51,118,0.12)]"
        />
      </div>

      {/* Elemento decorativo inferior para romper la monotonía */}
      <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-70 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-[#273376]"></div>
        <div className="w-6 h-1 rounded-full bg-[#FFC907]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#273376]"></div>
      </div>

    </div>
  </div>
</div>

          {/* Columna Derecha: Bloques de Información Horizontales con Contenedores de Imagen */}
          <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-5">
            
            {/* Tarjeta de Introducción Principal */}
            <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-md border border-slate-100/80">
              <h2 className="text-[#273376] font-montserrat font-extrabold text-2xl md:text-3xl mb-4">
                Hacia la Democratización de la Tierra Urbana
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                El Instituto Nacional de Tierras Urbanas (INTU) nace bajo la premisa de revertir los procesos de exclusión histórica en el acceso al suelo. Como ente adscrito al Ministerio del Poder Popular para Hábitat y Vivienda, somos el brazo ejecutor de las políticas de regularización en el marco de la Gran Misión Vivienda Venezuela.
              </p>
            </div>

            {/* Fila Modular Inferior: Misión y Visión en paralelo con Imágenes más grandes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Tarjeta de Valores */}
              <div className="bg-white p-6 rounded-[24px] shadow-md border border-slate-100/80 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-2">
                    <div className="p-2 bg-slate-50 rounded-xl text-[#FFC907]">
                      <Target size={20} />
                    </div>
                    <h4 className="font-montserrat font-bold text-base text-[#273376]">Valores</h4>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light line-clamp-4 mb-4">
                    Democratización, innovación, compromiso social, seguridad jurídica y calidad humana como pilares del INTU.
                  </p>
                </div>

                <div className="mt-2 h-44 md:h-52 w-full rounded-[28px] overflow-hidden relative border border-slate-100 shadow-sm">
                  <img 
                    src="/assets/img/valores.jpeg" 
                    alt="Valores INTU" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://picsum.photos/seed/valores/600/400";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white">Garantizando derechos</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('values')}
                  className="mt-6 w-full bg-[#273376] text-white py-3 rounded-xl font-bold hover:bg-[#FFC907] transition-all"
                >
                  Saber más
                </button>
              </div>

              {/* Tarjeta de Visión */}
              <div className="bg-white p-6 rounded-[24px] shadow-md border border-slate-100/80 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-2">
                    <div className="p-2 bg-slate-50 rounded-xl text-[#FFC907]">
                      <Eye size={20} />
                    </div>
                    <h4 className="font-montserrat font-bold text-base text-[#273376]">Visión</h4>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light line-clamp-4 mb-4">
                    Nuestra visión institucional representa el compromiso, responsabilidad y operatividad para garantizar el derecho a la tierra urbana.                  </p>
                </div>

                <div className="mt-2 h-44 md:h-52 w-full rounded-[28px] overflow-hidden relative border border-slate-100 shadow-sm">
                  <img 
                    src="/assets/img/vision.jpeg" 
                    alt="Visión INTU" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white">Construyendo el futuro</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('vision')}
                  className="mt-6 w-full bg-[#273376] text-white py-3 rounded-xl font-bold hover:bg-[#FFC907] transition-all"
                >
                  Saber más
                </button>
              </div>

            </div>

            {/* Frase de Cierre */}
            <div className="bg-[#273376]/5 p-4 rounded-[20px] border border-dashed border-[#273376]/20 flex items-center justify-center">
              <p className="text-[#273376] text-xs md:text-sm font-semibold text-center italic">
                "Garantizando que cada familia venezolana sea dueña soberana del espacio donde construye su futuro."
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Strategic Plans Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-[#273376] font-montserrat font-extrabold text-3xl mb-4">Planes Estratégicos</h3>
          <div className="flex items-center justify-center gap-2">
            <div className="w-24 h-1 bg-[#FFC907] rounded-full"></div>
            <div className="w-12 h-1 bg-[#A70336] rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[15px] border-t-4 border-[#273376] shadow-sm hover:shadow-md transition-shadow">
            <h5 className="font-bold text-[#273376] mb-3 text-sm md:text-base">Reordenamiento Urbano</h5>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Definición de normas urbanísticas y uso de espacios, validados por la Asamblea de Ciudadanos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[15px] border-t-4 border-[#FFC907] shadow-sm hover:shadow-md transition-shadow">
            <h5 className="font-bold text-[#273376] mb-3 text-sm md:text-base">Regularización Nacional</h5>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Coadyuvamos con OTM y CTU en la regularización de la tenencia de tierra urbana en todo el país.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[15px] border-t-4 border-[#273376] shadow-sm hover:shadow-md transition-shadow">
            <h5 className="font-bold text-[#273376] mb-3 text-sm md:text-base">Cartografía Popular</h5>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Abordaje participativo mediante la Agenda Concreta de Acción (ACA) y microzonificación de riesgos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[15px] border-t-4 border-[#FFC907] shadow-sm hover:shadow-md transition-shadow">
            <h5 className="font-bold text-[#273376] mb-3 text-sm md:text-base">Transformación Integral</h5>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Basado en la Carta del Barrio, articulamos políticas de rehabilitación de viviendas y espacios públicos.
            </p>
          </div>
        </div>
      </div>
      
      {activeModal ? (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[24px] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <h3 className="text-2xl font-montserrat font-bold text-[#273376]">{aboutModalData[activeModal].title}</h3>
                <p className="mt-2 text-sm text-slate-600">{aboutModalData[activeModal].summary}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-slate-500 hover:text-red-500 p-2"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="overflow-y-auto p-6 text-sm leading-relaxed text-slate-700 max-h-[calc(90vh-164px)] whitespace-pre-line">
              {aboutModalData[activeModal].details}
            </div>
            <div className="border-t border-slate-200 p-6 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="inline-flex items-center justify-center rounded-xl bg-[#273376] px-5 py-3 text-sm font-semibold text-white hover:bg-[#FFC907] transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default About;