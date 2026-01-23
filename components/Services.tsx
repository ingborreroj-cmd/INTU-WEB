
import React from 'react';
import { ShieldCheck, FileText, Users, Scale, Headset, ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, link }) => (
  <div className="group bg-white p-8 rounded-[15px] custom-shadow border border-gray-100 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-[#b8860b]/30">
    <div className="bg-[#003366]/5 p-4 rounded-xl w-fit mb-6 transition-colors group-hover:bg-[#003366] group-hover:text-white text-[#003366]">
      <Icon size={32} />
    </div>
    <h3 className="font-montserrat font-bold text-xl text-[#003366] mb-4 group-hover:text-[#b8860b] transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 font-light mb-8 flex-grow leading-relaxed">
      {description}
    </p>
    <a 
      href={link} 
      className="inline-flex items-center gap-2 text-[#003366] font-bold text-sm hover:gap-3 transition-all mt-auto"
    >
      Saber más <ChevronRight size={16} />
    </a>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Regularización',
      description: 'Proceso legal para formalizar la propiedad de terrenos urbanos ocupados, otorgando seguridad jurídica a las familias.',
      link: '#'
    },
    {
      icon: FileText,
      title: 'TTU',
      description: 'Transferencia de Tierras Urbanas: Gestión administrativa para el traspaso de titularidad de terrenos a comunidades organizadas.',
      link: '#'
    },
    {
      icon: Users,
      title: 'CTU',
      description: 'Comités de Tierra Urbana: Apoyo y asesoría técnica a las organizaciones sociales para la autogestión territorial.',
      link: '#'
    },
    {
      icon: Scale,
      title: 'Protocolización',
      description: 'Registro oficial de documentos de propiedad ante los entes pertinentes para garantizar la validez del título.',
      link: '#'
    },
    {
      icon: Headset,
      title: 'Atención Directa',
      description: 'Canales presenciales y digitales para resolver dudas, denuncias y seguimiento de trámites ciudadanos.',
      link: '#'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-[#003366] font-montserrat font-extrabold text-4xl mb-4">Servicios Institucionales</h2>
        <div className="w-20 h-1 bg-[#b8860b] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg">
          Ofrecemos soluciones integrales para la democratización del suelo y el derecho a la vivienda digna.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;