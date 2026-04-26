import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Users, Scale, Headset, ChevronRight, 
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
  <div className="group bg-white p-6 rounded-[15px] shadow-sm border border-gray-100 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-[#b8860b]/30">
    <div className="bg-[#003366]/5 p-3 rounded-xl w-fit mb-4 transition-colors group-hover:bg-[#003366] group-hover:text-white text-[#003366]">
      <Icon size={28} />
    </div>
    <h3 className="font-montserrat font-bold text-lg text-[#003366] mb-3 group-hover:text-[#b8860b] transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-sm font-light mb-4 flex-grow leading-relaxed">
      {description}
    </p>
    {cost && (
      <div className="mb-4 flex items-center gap-2 text-[#b8860b] font-bold text-sm bg-[#b8860b]/5 px-3 py-1 rounded-full w-fit">
        <DollarSign size={14} /> {cost}
      </div>
    )}
    <button 
      onClick={onOpenModal}
      className="inline-flex items-center gap-2 text-[#003366] font-bold text-xs hover:gap-3 transition-all mt-auto border-t pt-4 border-gray-50 w-full text-left"
    >
      Saber más <ChevronRight size={14} />
    </button>
  </div>
);

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const technicalServices = [
    { icon: Ruler, title: 'Levantamiento Planimétrico', description: 'Medición detallada y representación gráfica exacta de la configuración de su terreno.', cost: '€40 por plano/informe' },
    { icon: HardHat, title: 'Estudio Geotécnico', description: 'Análisis de suelo completo: perforación, laboratorio e informe técnico de resistencia.', cost: 'Según requerimiento' },
    { icon: ClipboardCheck, title: 'Inspección Técnica', description: 'Acompañamiento en procesos de liberación, protocolización de ventas y planes monzones.', cost: '€50 individual' },
    { icon: Mountain, title: 'Levantamiento Altimétrico', description: 'Medición y representación de características físicas, geográficas y geológicas del terreno.', cost: 'Tarifa según superficie M²' }
  ];

  const institutionalServices = [
    { icon: ShieldCheck, title: 'Regularización', description: 'Formalización legal de terrenos ocupados.' },
    { icon: FileText, title: 'TTU', description: 'Transferencia de Tierras a comunidades.' },
    { icon: Users, title: 'CTU', description: 'Asesoría técnica a Comités de Tierra.' },
    { icon: Scale, title: 'Protocolización', description: 'Registro oficial de títulos de propiedad.' },
    { icon: Headset, title: 'Atención Directa', description: 'Canales de soporte y seguimiento ciudadano.' }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 relative">
      
      {/* SECCIÓN SERVICIOS TÉCNICOS */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <span className="text-[#b8860b] font-bold tracking-widest uppercase text-xs mb-3 block">Catálogo Especializado</span>
        <h2 className="text-[#003366] font-montserrat font-extrabold text-4xl mb-4">Servicios Técnicos INTU</h2>
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
                <div className="bg-[#b8860b]/10 p-2 rounded-lg text-[#b8860b]">
                  <Info size={24} />
                </div>
                <h3 className="text-[#003366] font-montserrat font-bold text-xl">¿Cómo solicitar estos servicios?</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                  <div>
                    <h4 className="font-bold text-[#003366] mb-2">Asesoría Inicial</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Acude a la Gerencia Estadal para buscar asesoría y solicitar el listado de requisitos. Deberás consignar los requisitos una vez completados en la oficina estadal del INTU.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                  <div>
                    <h4 className="font-bold text-[#003366] mb-2">Orientación y Planilla</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">El Gerente Estadal o el funcionario autorizado brindará orientación sobre el llenado de la planilla de solicitud. Deberás seleccionar el servicio técnico e indicar la dirección exacta del inmueble y datos de contacto.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
                  <div>
                    <h4 className="font-bold text-[#003366] mb-2">Autorización y Pago</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">El funcionario emitirá el oficio de autorización con el monto a cancelar y el número de cuenta jurídica del INTU para formalizar el pago.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold shadow-lg">4</div>
                  <div>
                    <h4 className="font-bold text-[#003366] mb-2">Inicio de Trámite</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Una vez realizado el pago, deberás consignar el comprobante de pago para iniciar oficialmente el trámite del servicio solicitado.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-gray-50 rounded-xl border-l-4 border-[#b8860b]">
                <p className="text-[#003366] text-xs font-medium italic">
                  * Nota: Para levantamientos de topografía, la tarifa dependerá de los M² de superficie.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN BENEFICIOS */}
      <div className="bg-[#003366] rounded-[20px] p-8 md:p-12 mb-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#b8860b] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Trámites Agilizados</h4><p className="text-blue-100 text-sm">Simplificación de procesos de validación administrativa.</p></div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#b8860b] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Calidad Garantizada</h4><p className="text-blue-100 text-sm">Personal bajo los estándares técnicos más exigentes.</p></div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#b8860b] flex-shrink-0" size={32} />
            <div><h4 className="font-bold text-lg mb-2">Precios Competitivos</h4><p className="text-blue-100 text-sm">Costos sociales para personas naturales y jurídicas.</p></div>
          </div>
        </div>
      </div>

      {/* SECCIÓN SERVICIOS INSTITUCIONALES */}
      <div className="text-center mb-12">
        <h3 className="text-[#003366] font-montserrat font-extrabold text-2xl mb-2">Servicios Institucionales</h3>
        <div className="w-16 h-1 bg-[#b8860b] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {institutionalServices.map((service, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-[15px] border border-transparent hover:border-gray-200 transition-all">
            <service.icon className="text-[#003366] mb-4" size={24} />
            <h5 className="font-bold text-[#003366] mb-2 text-sm uppercase tracking-tight">{service.title}</h5>
            <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;