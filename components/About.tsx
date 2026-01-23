
import React from 'react';
import { Target, Eye, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <span className="text-[#b8860b] font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Razón de Ser</span>
          <h2 className="text-[#003366] font-montserrat font-extrabold text-4xl mb-6">Hacia la Democratización de la Tierra Urbana</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            El Instituto Nacional de Tierras Urbanas (INTU) nace bajo la premisa de revertir los procesos de exclusión histórica en el acceso al suelo. Somos el brazo ejecutor de las políticas de regularización en el marco de la <span className="font-bold text-[#003366]">Gran Misión Vivienda Venezuela</span>.
          </p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Nuestra labor no se limita a la entrega de un título; buscamos la transformación integral del hábitat, garantizando que cada familia venezolana sea dueña soberana del espacio donde construye su futuro.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
            <div className="bg-white p-6 rounded-[15px] shadow-sm border-l-4 border-[#b8860b]">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-[#b8860b]" size={24} />
                <h4 className="font-montserrat font-bold text-lg text-[#003366]">Misión</h4>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Garantizar la tenencia de la tierra.
                </li>
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Consolidar el Poder Popular.
                </li>
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Justicia social en el hábitat urbano.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-[15px] shadow-sm border-l-4 border-[#003366]">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-[#003366]" size={24} />
                <h4 className="font-montserrat font-bold text-lg text-[#003366]">Visión</h4>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Ser referentes en gestión territorial.
                </li>
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Uso eficiente y humano del suelo.
                </li>
                <li className="flex gap-2">
                  <Star className="text-[#b8860b] flex-shrink-0" size={14} /> 
                  Territorios libres de latifundio urbano.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="lg:w-1/2 relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://picsum.photos/seed/intu1/400/500" 
              alt="Comunidad organizada" 
              className="rounded-[15px] shadow-xl transform translate-y-8"
            />
            <img 
              src="https://picsum.photos/seed/intu2/400/500" 
              alt="Entrega de títulos" 
              className="rounded-[15px] shadow-xl"
            />
          </div>
          {/* Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#003366] text-white p-8 rounded-full border-8 border-white/20 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-3xl font-extrabold font-montserrat">10+</span>
            <span className="text-[10px] uppercase font-bold text-center">Años de Logros</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
