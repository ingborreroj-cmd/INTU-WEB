import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Users, Scale, ChevronRight, 
  Ruler, HardHat, ClipboardCheck, Mountain, CheckCircle2, DollarSign, X, Info
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  cost?: string;
  onOpenModal: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, cost, onOpenModal }) => (
  <div className="group bg-white p-6 rounded-[15px] shadow-sm border border-gray-100 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC907]/30">
    <div className="bg-[#273376]/5 p-3 rounded-xl w-fit mb-4 transition-colors group-hover:bg-[#273376] group-hover:text-white text-[#273376]">
      <Icon size={28} />
    </div>
    <h3 className="font-montserrat font-bold text-lg text-[#273376] mb-3 group-hover:text-[#FFC907] transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-sm font-light mb-4 flex-grow leading-relaxed">
      {description}
    </p>
    {cost && (
      <div className="mb-4 flex items-center gap-2 text-[#FFC907] font-bold text-sm bg-[#FFC907]/5 px-3 py-1 rounded-full w-fit">
        <DollarSign size={14} /> {cost}
      </div>
    )}
    <button 
      onClick={onOpenModal}
      className="inline-flex items-center gap-2 text-[#273376] font-bold text-xs hover:gap-3 transition-all mt-auto border-t pt-4 border-gray-200 w-full text-left"
    >
      Saber más <ChevronRight size={14} />
    </button>
  </div>
);

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bloqueo de scroll del body cuando el modal de servicios está abierto
  React.useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isModalOpen]);

  const technicalServices = [
    { icon: Ruler, title: 'Levantamiento Planimétrico', description: 'Medición detallada y representación gráfica exacta de la configuración de su terreno.', },
    { icon: HardHat, title: 'Estudio Geotécnico', description: 'Análisis de suelo completo: perforación, laboratorio e informe técnico de resistencia.',  },
    { icon: ClipboardCheck, title: 'Inspección Técnica', description: 'Acompañamiento en procesos de liberación, protocolización de ventas y planes monzones.',  },
    { icon: Mountain, title: 'Levantamiento Altimétrico', description: 'Medición y representación de características físicas, geográficas y geológicas del terreno.',  }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 relative">
      
      {/* SECCIÓN SERVICIOS TÉCNICOS */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <span className="text-[#FFC907] font-bold tracking-widest uppercase text-xs mb-3 block">Catálogo Especializado</span>
        <h2 className="text-[#273376] font-montserrat font-extrabold text-4xl mb-4">Servicios Técnicos INTU</h2>
        <p className="text-gray-600">
          Soluciones con tecnología panorámica y alta precisión para garantizar la base técnica de sus proyectos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {technicalServices.map((service, index) => (
          <ServiceCard key={index} {...service} onOpenModal={() => setIsModalOpen(true)} />
        ))}
      </div>

      {/* MODAL DE GUÍA DE TRÁMITE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFC907]/10 p-2 rounded-lg text-[#FFC907]">
                  <Info size={24} />
                </div>
                <h3 className="text-[#273376] font-montserrat font-bold text-xl">¿Cómo solicitar estos servicios?</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#273376] text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                  <div>
                    <h4 className="font-bold text-[#273376] mb-2">Asesoría Inicial</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Acude a la Gerencia Estadal para buscar asesoría y solicitar el listado de requisitos. Deberás consignar los requisitos una vez completados en la oficina estadal del INTU.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#273376] text-white rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                  <div>
                    <h4 className="font-bold text-[#273376] mb-2">Orientación y Planilla</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">El Gerente Estadal o el funcionario autorizado brindará orientación sobre el llenado de la planilla de solicitud. Deberás seleccionar el servicio técnico e indicar la dirección exacta del inmueble y datos de contacto.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#273376] text-white rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
                  <div>
                    <h4 className="font-bold text-[#273376] mb-2">Autorización y Pago</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">El funcionario emitirá el oficio de autorización con el monto a cancelar y el número de cuenta jurídica del INTU para formalizar el pago.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#273376] text-white rounded-full flex items-center justify-center font-bold shadow-lg">4</div>
                  <div>
                    <h4 className="font-bold text-[#273376] mb-2">Inicio de Trámite</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Una vez realizado el pago, deberás consignar el comprobante de pago para iniciar oficialmente el trámite del servicio solicitado.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-gray-50 rounded-xl border-l-4 border-[#FFC907]">
                <p className="text-[#273376] text-xs font-medium italic">
                  * Nota: Para levantamientos de topografía, la tarifa dependerá de los M² de superficie.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN BENEFICIOS */}
      <div className="bg-[#273376] rounded-[20px] p-8 md:p-12 mb-1 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#FFC907] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Trámites Agilizados</h4><p className="text-[#cfdcff] text-sm">Simplificación de procesos de validación administrativa.</p></div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#FFC907] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Calidad Garantizada</h4><p className="text-[#cfdcff] text-sm">Personal bajo los estándares técnicos más exigentes.</p></div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#FFC907] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Precios Competitivos</h4><p className="text-[#cfdcff] text-sm">Costos sociales para personas naturales y jurídicas.</p></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Services;