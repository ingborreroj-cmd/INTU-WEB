import React from 'react';
import { Instagram, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { InstaPost } from '../data/instaData';

const InstagramCard: React.FC<{ post: InstaPost }> = ({ post }) => {
  return (
    <a 
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      // w-72 (un poco más ancho para que no se vea "amorochado") 
      // h-[450px] fijo para que todas sean idénticas
      className="flex-none w-72 h-[450px] relative rounded-2xl overflow-hidden shadow-2xl bg-[#001a33] group transition-all duration-500 hover:-translate-y-2 border border-white/10"
    >
      {/* CONTENEDOR DE IMAGEN (Ocupa el 60% de la altura) */}
      <div className="h-[60%] w-full relative overflow-hidden bg-slate-800">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt="Post" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={40} className="text-white/20" />
          </div>
        )}
        {/* Badge de Instagram sobre la foto */}
        <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/20">
          <Instagram size={16} />
        </div>
      </div>

      {/* CONTENEDOR DE TEXTO (El 40% restante) */}
      <div className="h-[40%] w-full p-5 flex flex-col justify-between bg-gradient-to-b from-[#002855] to-[#001a33]">
        <div>
          <span className="text-[#f6d07d] text-[10px] font-bold uppercase tracking-widest block mb-2">
            Instagram INTU
          </span>
          <p className="text-white text-sm leading-snug line-clamp-3 font-medium">
            {post.caption || "Sin descripción disponible"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-white/60 text-[10px] font-bold uppercase flex items-center gap-2 group-hover:text-[#f6d07d] transition-colors">
            Ver publicación <ExternalLink size={12} />
          </span>
          <span className="text-white/10 text-[9px] font-mono">#INTU</span>
        </div>
      </div>
    </a>
  );
};

export default InstagramCard;