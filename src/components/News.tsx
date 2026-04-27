import React from 'react';
import { ExternalLink, Calendar, Instagram } from 'lucide-react';
import { INSTA_POSTS } from '../data/instaData'; 
import InstagramCard from './InstagramCard';

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  source: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, date, title, source, url }) => (
  <div className="group relative overflow-hidden rounded-[20px] h-[380px] shadow-xl bg-[#001a33]">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/20 to-transparent"></div>
    
    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500">
      <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3">
        <Calendar size={12} className="text-[#f6d07d]" />
        {date}
      </div>
      <h3 className="text-white font-montserrat font-bold text-lg mb-2 line-clamp-2 leading-tight">
        {title}
      </h3>
      <p className="text-[#f6d07d] text-[11px] font-black mb-5 uppercase tracking-widest">
        {source}
      </p>
      
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:bg-white hover:text-[#003366] shadow-lg"
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
    <div className="container mx-auto px-4 md:px-8 py-20">
      
      {/* SECCIÓN 1: CABECERA DE ACTUALIDAD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#b8860b]"></div>
            <span className="text-[#b8860b] font-bold text-sm uppercase tracking-[0.3em]">Noticias</span>
          </div>
          <h2 className="text-[#003366] font-montserrat font-black text-4xl md:text-5xl uppercase tracking-tighter">
            Actualidad <span className="text-gray-300">INTU</span>
          </h2>
        </div>
        <a 
          href="https://minhvi.gob.ve/category/noticias/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-[#003366] font-black text-sm uppercase tracking-widest hover:text-[#b8860b] transition-colors"
        >
          Ver todo el portal <div className="p-2 bg-[#003366] text-white rounded-lg group-hover:bg-[#b8860b] transition-all"><ExternalLink size={16} /></div>
        </a>
      </div>

      {/* GRID DE PRENSA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>

      {/* Sección de Comunidad (Con cabecera restaurada y carrusel intacto) */}
      <div className="mt-20 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-[#b8860b] to-[#8b6508] rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 flex-shrink-0">
              <Instagram size={30} />
            </div>
            <div>
              <h3 className="text-[#003366] font-montserrat font-black text-3xl uppercase tracking-tighter leading-none">
                Comunidad <span className="text-[#b8860b]">INTU</span>
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-medium">Nuestra presencia en redes sociales</p>
            </div>
          </div>
          <span className="hidden md:block text-[#003366]/40 font-black text-sm uppercase tracking-widest">@intuvzla</span>
        </div>
        
        {/* Tu contenedor original de scroll (Mantenido exactamente igual) */}
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide">
          {INSTA_POSTS.map((post) => (
            <InstagramCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default News;