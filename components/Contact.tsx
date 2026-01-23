
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Info & Map */}
        <div>
          <h2 className="text-[#003366] font-montserrat font-extrabold text-4xl mb-6">Contáctanos</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Nuestras puertas están abiertas para brindarte la mejor asesoría en la regularización de tu hogar. 
            Visítanos en nuestra sede central o contáctanos por nuestros canales digitales.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex gap-4">
              <div className="bg-[#003366] p-3 rounded-lg text-white">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#003366]">Dirección Sede Central</h4>
                <p className="text-gray-600 text-sm">Av. Orinoco, con Calle Mucuchies. Edificio INTU. Caracas, Venezuela.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-[#b8860b] p-3 rounded-lg text-white">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#003366]">Teléfono de Atención</h4>
                <p className="text-gray-600 text-sm">0800-MINHVI-00 (0800-646484-00)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#003366] p-3 rounded-lg text-white">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#003366]">Correo Electrónico</h4>
                <p className="text-gray-600 text-sm">contacto@intu.gob.ve</p>
              </div>
            </div>
          </div>

          <div className="rounded-[15px] overflow-hidden shadow-lg h-[300px] border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.111244840134!2d-66.8647586252069!3d10.491950489639733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a584094776103%3A0x7d8a6e84967390e1!2sAv%20Orinoco%2C%20Caracas%201060%2C%20Distrito%20Capital!5e0!3m2!1ses-419!2sve!4v1697380000000!5m2!1ses-419!2sve" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-8 md:p-12 rounded-[25px] custom-shadow border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <h3 className="text-2xl font-montserrat font-bold text-[#003366] mb-8">Envíanos un mensaje</h3>
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-xl font-bold text-[#003366] mb-2">¡Mensaje Enviado!</h4>
              <p className="text-gray-600">Nos pondremos en contacto contigo a la brevedad posible.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[#003366] font-bold underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700 ml-1">Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#b8860b] focus:ring-2 focus:ring-[#b8860b]/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700 ml-1">Correo Electrónico</label>
                  <input 
                    required
                    type="email" 
                    placeholder="juan@correo.com"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#b8860b] focus:ring-2 focus:ring-[#b8860b]/20 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Asunto</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Solicitud de Título de Tierra"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#b8860b] focus:ring-2 focus:ring-[#b8860b]/20 outline-none transition-all"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Mensaje o Consulta</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe tu requerimiento..."
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#b8860b] focus:ring-2 focus:ring-[#b8860b]/20 outline-none transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#002244] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 group"
              >
                Enviar Consulta
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-4">
                Tus datos están protegidos bajo la Ley de Infogobierno.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;