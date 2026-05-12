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
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-[#fcfcfc]">
      
      {/* 1. Fondo de líneas - Asegúrate de que la imagen esté en public/assets/img/ */}
<div
  className="fixed inset-0 pointer-events-none z-0"
  style={{
    // IMPORTANTE: La ruta comienza con "/" que apunta directamente a "public"
    backgroundImage: "url('/assets/lineas_fondo.png')",
    backgroundRepeat: 'repeat',
    backgroundSize: '400px 400px',
    opacity: 0.15
  }}
/>
      
      {/* 2. Contenedor principal */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <ModalBienvenida />
        <Header />
      
        <main className="flex-grow bg-transparent">
          <section id="inicio" className="bg-transparent">
            <Hero />
          </section>
          
          <section id="servicios" className="py-20 bg-transparent">
            <Services />
          </section>

          <section id="tramites" className="py-20 border-y border-gray-100 bg-transparent"> 
            <Tramites />
          </section>

          <section id="nosotros" className="py-20 bg-transparent">
            <About />
          </section>

          <section id="proyectos" className="py-20 bg-transparent">
            <News />
          </section>

          <section id="contacto" className="py-20 bg-transparent">
            <Contact />
          </section>
        </main>

        <Footer />
        <INTUBot />
      </div>
    </div>
  );
};

export default App;