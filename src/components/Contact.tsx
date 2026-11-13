import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Eye, X, Navigation } from 'lucide-react';
import { locations, Ubicacion } from '../data/ubicanos_data';
import { SURVEYS_ENABLED } from '../featureFlags';

const OfficeMap = lazy(() => import('./OfficeMap'));

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Ubicacion | null>(null);
  const [currentCoords, setCurrentCoords] = useState<[number, number]>([7.5, -66.5]);
  const [currentZoom, setCurrentZoom] = useState<number>(6);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapSectionRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Correo de destino configurado se tiene que modificar en produccion para colocarl el correo correcto
    const emailDestino = 'intuenlacalle@gmail.com';
    
    // Codificación segura de caracteres y saltos de línea para la URL
    const asunto = encodeURIComponent(formData.subject || `Contacto Web: Mensaje de ${formData.name}`);
    const cuerpo = encodeURIComponent(
      `Nombre Completo: ${formData.name}\n` +
      `Correo Remitente: ${formData.email}\n\n` +
      `Mensaje:\n${formData.message}`
    );

    // Acción nativa para abrir la aplicación de correos predeterminada (Gmail, Outlook, etc.)
    window.location.href = `mailto:${emailDestino}?subject=${asunto}&body=${cuerpo}`;

    // Cambiar estado visual en la web y limpiar campos
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleLocationClick = (location: Ubicacion) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
    setCurrentCoords([location.coords.lat, location.coords.lng]);
    setCurrentZoom(15);
  };

  // Función para mover el mapa sin abrir modal
  const handleShowOnMap = (e: React.MouseEvent, location: Ubicacion) => {
    e.stopPropagation(); 
    setCurrentCoords([location.coords.lat, location.coords.lng]);
    setCurrentZoom(15);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  // Bloqueo de scroll del body cuando el modal de detalles esté abierto
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isModalOpen]);

  useEffect(() => {
    const section = mapSectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadMap(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-transparent pt-0 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* SECCIÓN 1: INTRODUCCIÓN */}
        <section className="mb-16 text-center md:text-left">
          <span className="inline-block text-[#FFC907] uppercase tracking-widest text-sm mb-4 font-bold">Atención al Ciudadano</span>
          <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold leading-tight text-slate-900 max-w-3xl">
            Estamos listos para ayudarte desde nuestras sedes regionales.
          </h2>
          {SURVEYS_ENABLED && (
            <p className="mt-6 max-w-2xl text-sm text-slate-600">
              ¿Quieres contarnos tu experiencia de usuario? <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openEncuesta'))} className="font-semibold text-[#273376] underline hover:text-[#FFC907]">Realiza nuestra encuesta</button> y ayúdanos a mejorar la web.
            </p>
          )}
        </section>

        {/* SECCIÓN 2: TARJETAS DE CONTACTO RÁPIDO */}
        <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
            <div className="bg-[#273376] w-fit p-3 rounded-xl text-white mb-4"><MapPin size={24} /></div>
            <h3 className="font-bold text-slate-900">Sede Central</h3>
            <p className="text-slate-600 text-sm mt-2">Av. Orinoco de las Mercedes, Torre INTU, Municipio Baruta, Caracas 1080.</p>
          </div>
          
          <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
            <div className="bg-[#A70336] w-fit p-3 rounded-xl text-white mb-4"><Phone size={24} /></div>
            <h3 className="font-bold text-slate-900">Atención Telefónica</h3>
            <p className="text-slate-600 text-sm mt-2">(0212) 991 9940</p>
          </div>

          <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
            <div className="bg-[#273376] w-fit p-3 rounded-xl text-white mb-4"><Mail size={24} /></div>
            <h3 className="font-bold text-slate-900">Correo Electrónico</h3>
            <p className="text-slate-600 text-sm mt-2">intuenlacalle@gmail.com</p>
          </div>
        </section>

        {/* SECCIÓN 3: LISTADO Y FORMULARIO */}
        <section className="mb-16 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-montserrat font-bold text-[#273376] mb-6">Oficinas a Nivel Nacional</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className="border border-slate-200 rounded-2xl p-6 bg-white/80 backdrop-blur-sm shadow-sm flex justify-between items-center transition-all hover:border-[#FFC907] group cursor-pointer"
                >
                  <div className="pr-4 min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-[#273376] transition-colors break-words leading-tight">{location.estado}</h4>
                    <p className="text-sm text-slate-500 break-all mt-1">{location.correo}</p>
                  </div>
                  <div className="flex gap-4 shrink-0">
                    <button 
                      onClick={(e) => handleShowOnMap(e, location)}
                      className="text-[#273376] font-bold text-sm flex items-center gap-1 hover:text-[#FFC907] transition-colors"
                    >
                      <Navigation size={16} /> Ver en mapa
                    </button>
                    <button type="button" onClick={() => handleLocationClick(location)} aria-label={`Ver detalles de ${location.estado}`} className="text-[#FFC907] font-bold text-sm flex items-center gap-1 group-hover:text-[#273376]">
                      <Eye size={16} /> Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-[25px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-montserrat font-bold text-[#273376] mb-6">Envíanos un mensaje</h3>
            {submitted ? (
              <div className="text-center py-10">
                <div className="bg-green-100 text-green-600 p-4 rounded-full w-fit mx-auto mb-4"><CheckCircle2 size={48} /></div>
                <h4 className="text-xl font-bold text-[#273376]">¡Redireccionando!</h4>
                <p className="text-slate-500 mt-2">Abriendo tu gestor de correo predeterminado...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="contact-name" className="sr-only">Nombre completo</label>
                <input id="contact-name" autoComplete="name" required type="text" placeholder="Nombre completo" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#FFC907]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <label htmlFor="contact-email" className="sr-only">Correo electrónico</label>
                <input id="contact-email" autoComplete="email" required type="email" placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#FFC907]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <label htmlFor="contact-subject" className="sr-only">Asunto</label>
                <input id="contact-subject" required type="text" placeholder="Asunto" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#FFC907]" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                <label htmlFor="contact-message" className="sr-only">Mensaje</label>
                <textarea id="contact-message" required rows={3} placeholder="¿En qué podemos ayudarte?" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#FFC907]" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                <button type="submit" className="w-full bg-[#273376] text-white py-3 rounded-xl font-bold hover:bg-[#FFC907] transition-all transform hover:scale-[1.01]">Enviar Mensaje</button>
              </form>
            )}
          </div>
        </section>

        {/* SECCIÓN 4: MAPA DE SEDES */}
        <section ref={mapSectionRef} className="w-full">
            <h3 className="text-2xl font-montserrat font-bold text-[#273376] mb-6">Ubicación Geográfica de Sedes</h3>
            <div className="rounded-[30px] overflow-hidden border-4 border-white shadow-2xl h-[550px] relative z-0">
                {shouldLoadMap ? (
                  <Suspense fallback={<div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500" role="status">Cargando mapa de sedes...</div>}>
                    <OfficeMap
                      center={currentCoords}
                      zoom={currentZoom}
                      locations={locations}
                      onLocationClick={handleLocationClick}
                    />
                  </Suspense>
                ) : <div className="h-full bg-slate-100" aria-hidden="true" />}
            </div>
        </section>
      </div>

      {/* MODAL DETALLES CON ANIMACIÓN */}
      {isModalOpen && selectedLocation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFC907]"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#273376] break-words pr-4 leading-tight">{selectedLocation.estado}</h3>
              <button type="button" onClick={closeModal} aria-label="Cerrar detalles de la sede" className="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0"><X size={24} /></button>
            </div>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="bg-slate-50 p-2 rounded-lg text-[#FFC907] shrink-0 h-fit"><MapPin size={20}/></div>
                <div><h4 className="font-bold text-slate-900 text-xs uppercase tracking-tighter mb-1">Dirección</h4><p className="text-slate-600 text-sm leading-relaxed break-words">{selectedLocation.direccion}</p></div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 p-2 rounded-lg text-[#273376] shrink-0 h-fit"><Mail size={20}/></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tighter mb-1">Correo</h4>
                  <p className="text-slate-600 text-sm break-words">{selectedLocation.correo}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 p-2 rounded-lg text-[#273376] shrink-0 h-fit"><Phone size={20}/></div>
                <div><h4 className="font-bold text-slate-900 text-xs uppercase tracking-tighter mb-1">Teléfono Directo</h4><p className="text-slate-600 text-sm break-words">{selectedLocation.telefono}</p></div>
              </div>
            </div>

            <button onClick={closeModal} className="mt-8 w-full bg-[#273376] py-3 rounded-xl font-bold text-white hover:bg-[#FFC907] transition-all shadow-lg">Cerrar Detalles</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;