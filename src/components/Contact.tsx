
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
    <div className="bg-slate-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 xl:grid-cols-[1.2fr_0.9fr] items-start">
          <div className="space-y-8">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block text-[#b8860b] uppercase tracking-widest text-sm">
                Contáctanos
              </span>
              <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold leading-tight text-slate-900">
                Estamos listos para ayudarte desde nuestra sede central.
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                Nuestras puertas están abiertas para brindarte la mejor asesoría en la regularización de tu hogar. Visítanos en nuestra sede central o contáctanos por nuestros canales digitales.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#003366] p-3 rounded-xl text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Dirección Sede Central</h4>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  Av. Orinoco, con Calle Mucuchies. Edificio INTU. Caracas, Venezuela.
                </p>
              </div>

              <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#b8860b] p-3 rounded-xl text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Teléfono de Atención</h4>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">0800-MINHVI-00 (0800-646484-00)</p>
              </div>

              <div className="rounded-[25px] border border-slate-200 bg-white p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#003366] p-3 rounded-xl text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Correo Electrónico</h4>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">contacto@intu.gob.ve</p>
              </div>
            </div>

            <div className="rounded-[25px] overflow-hidden border border-slate-200 shadow-2xl h-[460px]">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.111244840134!2d-66.8647586252069!3d10.491950489639733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a584094776103%3A0x7d8a6e84967390e1!2sAv%20Orinoco%2C%20Caracas%201060%2C%20Distrito%20Capital!5e0!3m2!1ses-419!2sve!4v1697380000000!5m2!1ses-419!2sve"
                title="Mapa de ubicación INTU"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <div className="relative rounded-[25px] border border-white/20 bg-white p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
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
    </div>
  );
};

export default Contact;