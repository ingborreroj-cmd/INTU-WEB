import React, { useEffect, useState } from 'react';
import { ExternalLink, Calendar, Instagram, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INSTA_POSTS } from '../data/instaData';
import { NewsItem } from '../data/newsData';
import { newsService } from '../services/newsService';
import InstagramCard from './InstagramCard';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const hasExternalLink = item.url && item.url !== '#';
  const excerpt = item.content ? item.content.slice(0, 120) : undefined;

  return (
    <div className="group relative overflow-hidden rounded-[20px] min-h-[420px] shadow-xl bg-[#001a33]">
      <img
        src={item.image || 'https://picsum.photos/seed/intu/600/400'}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/20 to-transparent"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Calendar size={12} className="text-[#f6d07d]" />
          {item.date}
        </div>
        <h3 className="text-white font-montserrat font-bold text-lg mb-2 leading-tight whitespace-normal break-words">
          {item.title}
        </h3>
        {excerpt && (
          <p className="text-white/80 text-sm leading-6 mb-3 max-h-20 overflow-hidden">
            {excerpt.trim()} {item.content && item.content.length > 120 ? '...' : ''}
          </p>
        )}
        <p className="text-[#f6d07d] text-[11px] font-black mb-5 uppercase tracking-widest">
          {item.source}
        </p>

        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {hasExternalLink ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:bg-white hover:text-[#003366] shadow-lg"
            >
              Leer noticia <ExternalLink size={14} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 bg-white/15 text-white/80 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-not-allowed"
            >
              Nota oficial
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const News: React.FC = () => {
  const [officialNews, setOfficialNews] = useState<NewsItem[]>([]);
  const [globalNews, setGlobalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const [official, global] = await Promise.all([
        newsService.getOfficialNews(),
        newsService.getNews(),
      ]);
      setOfficialNews(official);
      setGlobalNews(global);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const goToNewsSettings = () => {
    navigate('/admin/settings/news');
  };

  const goToOfficialNewsSettings = () => {
    navigate('/admin/settings/official-news');
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
      <div className="absolute top-20 right-8 z-40 flex flex-col gap-2 sm:flex-row sm:items-center">
        
        <button
  onClick={goToOfficialNewsSettings}
  className="inline-flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-500 hover:text-[#003366] transition-all shadow-sm"
  title="Noticias oficiales"
>
  <Settings size={16} />
</button>
      </div>

      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#b8860b]"></div>
              <span className="text-[#b8860b] font-bold text-sm uppercase tracking-[0.3em]">Noticias Oficiales</span>
            </div>
            <h2 className="text-[#003366] font-montserrat font-black text-4xl md:text-5xl uppercase tracking-tighter">
              Comunicados <span className="text-gray-300">INTU</span>
            </h2>
          </div>
        </div>

        {officialNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {officialNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            No hay noticias oficiales publicadas aún.
          </div>
        )}
      </section>

      <section>
  {/* CABECERA DE LA SECCIÓN */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10">
    
    {/* Títulos (Lado Izquierdo) */}
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-[2px] bg-[#003366]"></div>
        <span className="text-[#003366] font-bold text-sm uppercase tracking-[0.3em]">Noticias Globales</span>
      </div>
      <h2 className="text-[#003366] font-montserrat font-black text-4xl md:text-5xl uppercase tracking-tighter">
        Prensa externa <span className="text-gray-300">y actualizaciones</span>
      </h2>
    </div>

    {/* Acciones (Lado Derecho: Enlace + Botón de Configuración originales en armonía) */}
    <div className="flex items-center gap-4 self-start md:self-end">
      <a
        href="https://minhvi.gob.ve/category/noticias/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-[#003366] font-black text-sm uppercase tracking-widest hover:text-[#b8860b] transition-colors"
      >
        Ver todo el portal
        <div className="p-2 bg-[#003366] text-white rounded-lg group-hover:bg-[#b8860b] transition-all flex items-center justify-center">
          <ExternalLink size={16} />
        </div>
      </a>

      <button
        onClick={goToNewsSettings}
        className="inline-flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-500 hover:text-[#003366] transition-all shadow-sm"
        title="Editar noticias externas"
      >
        <Settings size={16} />
      </button>
    </div>
    
  </div>

  {/* GRID DE PRENSA EXTERNA */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
    {globalNews.map((item) => (
      <NewsCard key={item.id} item={item} />
    ))}
  </div>
</section>

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
    </div>
  );
};

export default News;
