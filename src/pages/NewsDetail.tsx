import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { newsService } from '../services/newsService';
import { NewsItem } from '../data/newsData';
import { normalizeUrl } from '../utils/urlHelpers';

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const official = await newsService.getOfficialNews();
      const found = official.find((a) => String(a.id) === String(id));
      setArticle(found || null);
      setLoading(false);
    };
    load();
  }, [id]);

  // Force solid header while this component is mounted
  useEffect(() => {
    document.body.classList.add('force-solid-header');
    return () => document.body.classList.remove('force-solid-header');
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-[#fcfcfc]">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/assets/img/lineas_fondo.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          opacity: 0.4,
        }}
      />
      <div className="relative z-10">
        <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-20">
        {loading ? (
          <div className="py-20 text-center text-[#273376]">Cargando noticia...</div>
        ) : article ? (
          <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h1 className="text-3xl font-montserrat font-bold text-[#273376]">{article.title}</h1>
              <div className="mt-3 text-sm text-slate-500 flex items-center gap-3">
                <span>{article.date}</span>
                <span className="font-black">·</span>
                <span>{article.source}</span>
                {article.createdBy ? (
                  <>
                    <span className="font-black">·</span>
                    <span>Por {article.createdBy}</span>
                  </>
                ) : null}
              </div>
            </div>

            {article.image && (
              <div className="bg-slate-100">
                <img src={article.image} alt={article.title} className="w-full object-cover" style={{ maxHeight: 420 }} />
              </div>
            )}

            <div className="p-6 text-slate-700 leading-relaxed whitespace-pre-line">
              {article.content || 'No hay más detalles disponibles por el momento.'}
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-between">
              {(() => {
                const link = normalizeUrl(article.url);
                return link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#273376] hover:text-[#FFC907]">Ver fuente original</a>
                ) : (
                  <div />
                );
              })()}
              <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-[#273376] px-5 py-3 text-sm font-semibold text-white hover:bg-[#FFC907] transition-all">Volver</Link>
            </div>
          </article>
        ) : (
          <div className="py-20 text-center text-[#273376]">No se encontró la noticia solicitada.</div>
        )}
      </main>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;
