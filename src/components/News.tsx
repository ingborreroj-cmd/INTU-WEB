import React, { useEffect, useState } from 'react';
import { ExternalLink, Calendar, Instagram, Settings } from 'lucide-react';
import { INSTA_POSTS } from '../data/instaData'; 
import { NewsItem } from '../data/newsData';
import { newsService } from '../services/newsService';
import NewsAdminModal from './NewsAdminModal';
import InstagramCard from './InstagramCard';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => (
  <div className="group relative overflow-hidden rounded-[20px] h-[380px] shadow-xl bg-[#001a33]">
    <img 
      src={item.image || "https://picsum.photos/seed/intu/600/400"} 
      alt={item.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/20 to-transparent"></div>
    
    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500">
      <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3">
        <Calendar size={12} className="text-[#f6d07d]" />
        {item.date}
      </div>
      <h3 className="text-white font-montserrat font-bold text-lg mb-2 line-clamp-2 leading-tight">
        {item.title}
      </h3>
      <p className="text-[#f6d07d] text-[11px] font-black mb-5 uppercase tracking-widest">
        {item.source}
      </p>
      
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <a 
          href={item.url} 
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

/**
 * Compresor asíncrono basado en Canvas para interceptar imágenes pesadas antes de guardarlas.
 * Convierte strings Base64 de alta resolución en miniaturas JPEG optimizadas de 600x400px.
 */
const compressImageBuffer = (base64Str: string): Promise<string> => {
  return new Promise((resolve) => {
    // Si no es una imagen pesada en formato Base64 nativo, se omite el proceso
    if (!base64Str || !base64Str.startsWith('data:image')) {
      resolve(base64Str);
      return;
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const targetWidth = 600;
      const targetHeight = 400;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        // Calidad 0.65 que comprime drásticamente el peso manteniendo nitidez para web
        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.65);
        resolve(optimizedBase64);
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
};

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await newsService.getNews();
      setNews(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const triggerAdminValidation = () => {
    const token = prompt('Ingrese clave técnica del INTU:');
    if (token === '') {
      setIsAdminOpen(true);
    } else if (token !== null) {
      alert('Credenciales no autorizadas.');
    }
  };

  const processDeployment = async (newConfiguration: NewsItem[]) => {
    setLoading(true);
    try {
      // Optimizamos en caliente el array de noticias procesando cada imagen adjunta
      const optimizedNews = await Promise.all(
        newConfiguration.map(async (item) => {
          if (item.image && item.image.length > 100000) { // Si supera ~100kb se comprime
            const compressedImg = await compressImageBuffer(item.image);
            return { ...item, image: compressedImg };
          }
          return item;
        })
      );

      const successfullySaved = await newsService.saveNews(optimizedNews);
      if (successfullySaved) {
        setNews(optimizedNews);
        setIsAdminOpen(false);
      } else {
        alert('Error de persistencia en disco: El espacio asignado por el navegador está saturado.');
      }
    } catch (err) {
      console.error("Error crítico durante el despliegue de prensa:", err);
      alert('Ocurrió un error inesperado al procesar las imágenes.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-[#003366] gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#003366] border-t-[#b8860b]"></div>
        <span className="text-xs font-bold tracking-wider opacity-70">Sincronizando Galería de Prensa...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-20 relative">
      
      {/* Botón Flotante del Modulador de Prensa */}
      <button onClick={triggerAdminValidation} className="absolute top-20 right-8 z-40 p-2 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-500 hover:text-[#003366] transition-all shadow-sm">
        <Settings size={16} />
      </button>

      {/* CABECERA DE ACTUALIDAD */}
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
          Ver todo el portal 
          <div className="p-2 bg-[#003366] text-white rounded-lg group-hover:bg-[#b8860b] transition-all">
            <ExternalLink size={16} />
          </div>
        </a>
      </div>

      {/* GRID DE PRENSA DINÁMICO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Sección de Comunidad (Tu bloque original intacto) */}
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
        
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide">
          {INSTA_POSTS.map((post) => (
            <InstagramCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Modal Técnico */}
      {isAdminOpen && <NewsAdminModal news={news} onClose={() => setIsAdminOpen(false)} onSave={processDeployment} />}

    </div>
  );
};

export default News;