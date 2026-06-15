import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MarcoJuridico: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-[#fcfcfc]">
      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-20">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-3xl font-montserrat font-bold text-[#273376]">Ley de Tierras Urbanas</h1>
            <p className="mt-3 text-sm text-slate-500">Marco jurídico institucional del Instituto Nacional de Tierras Urbanas.</p>
          </div>

          <div className="p-6 text-slate-700 leading-relaxed whitespace-pre-line">
            <h2 className="text-xl font-semibold text-[#273376] mb-4">Ley de Tierras Urbanas</h2>
            <p className="mb-4">
              El objeto de la presente Ley es regular la tenencia de tierras urbanas sin uso, aptas para el desarrollo de programas sociales de vivienda y hábitat, a los fines de establecer las bases del desarrollo urbano y la satisfacción progresiva del derecho a las viviendas dignas en las zonas urbanas.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Este marco jurídico orienta las acciones del INTU y sus programas en consonancia con el desarrollo urbano sostenible y la garantía de vivienda digna en Venezuela.
            </p>
          </div>

          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="https://www.asambleanacional.gob.ve/storage/documentos/leyes/ley-de-tie-20220125135038.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#273376] px-5 py-3 text-sm font-semibold text-white hover:bg-[#FFC907] transition-all"
            >
              Ver ley completa
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#273376] hover:bg-slate-50 transition-all"
            >
              Volver al inicio
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default MarcoJuridico;
