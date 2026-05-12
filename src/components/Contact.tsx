import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Eye, X } from 'lucide-react';
// Importamos los datos y la interfaz
import { locations, Ubicacion } from '../data/ubicanos_data';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedLocation, setSelectedLocation] = useState<Ubicacion | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const openModal = (location: Ubicacion) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="bg-transparent py-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* SECCIÓN 1: INTRODUCCIÓN */}
        <section className="mb-16 text-center md:text-left">
          <span className="inline-block text-[#b8860b] uppercase tracking-widest text-sm mb-4">Contáctanos</span>
          <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold leading-tight text-slate-900 max-w-3xl">
            Estamos listos para ayudarte desde nuestra sede central.
          </h2>
        </section>

        {/* SECCIÓN 2: TARJETAS DE CONTACTO RÁPIDO */}
        <section className="mb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
              <div className="bg-[#003366] w-fit p-3 rounded-xl text-white mb-4"><MapPin size={24} /></div>
              <h4 className="font-bold text-slate-900">Dirección</h4>
              <p className="text-slate-600 text-sm mt-2">Av. Orinoco de las Mercedes, Torre INTU, Municipio Baruta, Caracas 1080.</p>
            </div>
            
            <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
              <div className="bg-[#b8860b] w-fit p-3 rounded-xl text-white mb-4"><Phone size={24} /></div>
              <h4 className="font-bold text-slate-900">Teléfono</h4>
              <p className="text-slate-600 text-sm mt-2">(0212) 991 9940</p>
            </div>

            <div className="rounded-[25px] border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
              <div className="bg-[#003366] w-fit p-3 rounded-xl text-white mb-4"><Mail size={24} /></div>
              <h4 className="font-bold text-slate-900">Correo</h4>
              <p className="text-slate-600 text-sm mt-2">contacto@intu.gob.ve</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: OFICINAS (DATA EXTERNA) Y FORMULARIO */}
        <section className="mb-16 grid lg:grid-cols-2 gap-8 items-start">
          
          <div>
            <h3 className="text-2xl font-montserrat font-bold text-[#003366] mb-6">Nuestras Oficinas</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {locations.map((location, index) => (
                <div key={index} className="border border-slate-200 rounded-2xl p-6 bg-white/80 backdrop-blur-sm shadow-sm flex justify-between items-center transition-all hover:border-[#b8860b]">
                  <div>
                    <h4 className="font-bold text-slate-900">{location.estado}</h4>
                    <p className="text-sm text-slate-500">{location.correo}</p>
                  </div>
                  <button 
                    onClick={() => openModal(location)} 
                    className="text-[#b8860b] font-bold text-sm flex items-center gap-1 hover:text-[#003366] transition-colors"
                  >
                    <Eye size={16} /> Ver detalles
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-[25px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-montserrat font-bold text-[#003366] mb-6">Envíanos un mensaje</h3>
            {submitted ? (
              <div className="text-center py-10">
                <div className="bg-green-100 text-green-600 p-4 rounded-full w-fit mx-auto mb-4"><CheckCircle2 size={48} /></div>
                <h4 className="text-xl font-bold text-[#003366]">¡Mensaje Enviado!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Nombre" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#b8860b]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Correo" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#b8860b]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <textarea required rows={3} placeholder="Mensaje" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-[#b8860b]" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                <button type="submit" className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:bg-[#b8860b] transition-all transform hover:scale-[1.02]">Enviar</button>
              </form>
            )}
          </div>
        </section>

        {/* SECCIÓN 4: MAPA */}
        <section className="w-full">
            <h3 className="text-2xl font-montserrat font-bold text-[#003366] mb-6">Ubicación Central</h3>
            <div className="rounded-[25px] overflow-hidden border border-slate-200 shadow-xl h-[400px]">
                <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.111244840134!2d-66.8647586252069!3d10.491950489639733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a584094776103%3A0x7d8a6e84967390e1!2sAv%20Orinoco%2C%20Caracas%201060!5e0!3m2!1ses-419!2sve!4v1697380000000!5m2!1ses-419!2sve" title="Mapa" allowFullScreen={true} loading="lazy" style={{ border: 0 }} />
            </div>
        </section>
      </div>

      {/* MODAL DETALLES */}
      {isModalOpen && selectedLocation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-[25px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            {/* Decoración superior del modal */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#b8860b]"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#003366]">{selectedLocation.estado}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="text-[#b8860b] shrink-0"><MapPin size={20}/></div>
                <div><h4 className="font-bold text-slate-900 text-sm">Dirección</h4><p className="text-slate-600 text-sm">{selectedLocation.direccion}</p></div>
              </div>
              <div className="flex gap-3">
                <div className="text-[#003366] shrink-0"><Mail size={20}/></div>
                <div><h4 className="font-bold text-slate-900 text-sm">Gerente / Correo</h4><p className="text-slate-600 text-sm">{selectedLocation.gerente}</p><p className="text-[#b8860b] text-sm font-semibold">{selectedLocation.correo}</p></div>
              </div>
              <div className="flex gap-3">
                <div className="text-[#003366] shrink-0"><Phone size={20}/></div>
                <div><h4 className="font-bold text-slate-900 text-sm">Teléfono Oficina</h4><p className="text-slate-600 text-sm">{selectedLocation.telefono}</p></div>
              </div>
            </div>

            <button onClick={closeModal} className="mt-8 w-full border border-slate-200 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;