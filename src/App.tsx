import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Tramites from './components/Tramites';
import About from './components/About';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import INTUBot from './components/Intubot';
import ModalBienvenida from './components/ModalBienvenida';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Fondo sutil de líneas */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.2]"
        style={{
          backgroundImage: `url('./assets/img/lineas_fondo.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px'
        }}
      />
      
      {/* Contenido principal */}
      <div className="relative z-10">
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
      <INTUBot />
      </div>
    </div>
  );
};

export default App;