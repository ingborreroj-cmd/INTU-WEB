import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <section id="inicio">
          <Hero />
        </section>
        
        <section id="servicios" className="py-20 bg-white">
          <Services />
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
      {/* Innovative addition: AI Assistant for citizens */}
      <GeminiChat />
    </div>
  );
};

export default App;