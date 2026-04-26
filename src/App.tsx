import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Tramites from './components/Tramites';
import About from './components/About';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GeminiChat from './components/GeminiChat';
import ModalBienvenida from './components/ModalBienvenida'; // Importación del Modal

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* 1. Componente Global de Bienvenida (se activa al cargar) */}
      <ModalBienvenida />

      <Header />
      
      <main className="flex-grow">
        <section id="inicio">
          <Hero />
        </section>
        
        <section id="servicios" className="py-20 bg-white">
          <Services />
        </section>

        {/* 2. Sección de Trámites (posicionada según tu requerimiento) */}
        <section id="tramites" className="py-20 bg-slate-50 border-y border-slate-100"> 
          <Tramites />
        </section>

        <section id="nosotros" className="py-20 bg-[#f8f9fa]">
          <About />
        </section>

        <section id="proyectos" className="py-20 bg-white">
          <News />
        </section>

        <section id="contacto" className="py-20 bg-[#f8f9fa]">
          <Contact />
        </section>
      </main>

      <Footer />

      {/* Asistente IA flotante */}
      <GeminiChat />
    </div>
  );
};

export default App;