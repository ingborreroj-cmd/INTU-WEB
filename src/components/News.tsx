
import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  source: string;
  url: string;
}

// Added React.FC typing to allow standard React props like 'key' when component is used in a map
const NewsCard: React.FC<NewsCardProps> = ({ image, date, title, source, url }) => (
  <div className="group relative overflow-hidden rounded-[15px] h-[350px] shadow-lg">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-black/20 opacity-70 group-hover:opacity-90 transition-opacity"></div>
    
    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
      <div className="flex items-center gap-2 text-white/80 text-xs mb-3">
        <Calendar size={12} />
        {date}
      </div>
      <h3 className="text-white font-montserrat font-bold text-xl mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-[#f6d07d] text-sm font-bold mb-4 uppercase tracking-tighter">
        {source}
      </p>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-white hover:text-[#003366]"
        >
          Leer noticia <ExternalLink size={14} />
        </a>
      </div>
    </div>
  </div>
);

const News: React.FC = () => {
  const newsItems = [
    {
      image: "https://picsum.photos/seed/news1/600/400",
      date: "15 Oct 2023",
      title: "Minhvi acelera entrega de títulos de tierra en el estado Aragua",
      source: "Prensa Minhvi",
      url: "https://minhvi.gob.ve/category/noticias/"
    },
    {
      image: "https://picsum.photos/seed/news2/600/400",
      date: "12 Oct 2023",
      title: "INTU despliega plan de atención directa en comunidades de Maracay",
      source: "Ciudad MCY",
      url: "https://ciudadmcy.info.ve/"
    },
    {
      image: "https://picsum.photos/seed/news3/600/400",
      date: "08 Oct 2023",
      title: "Más de 500 familias reciben titularidad de tierras en Caracas",
      source: "Prensa Minhvi",
      url: "https://minhvi.gob.ve/category/noticias/"
    },
    {
      image: "https://picsum.photos/seed/news4/600/400",
      date: "05 Oct 2023",
      title: "Conoce los requisitos para la regularización de CTU",
      source: "INTU Informa",
      url: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="text-[#003366] font-montserrat font-extrabold text-4xl mb-4">Prensa y Proyectos</h2>
          <p className="text-gray-600">Mantente informado sobre los avances en materia de vivienda y tierras a nivel nacional.</p>
        </div>
        <a href="https://minhvi.gob.ve/category/noticias/" target="_blank" className="bg-[#003366]/5 hover:bg-[#003366]/10 text-[#003366] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
          Ver todas las noticias <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default News;