import React, { useEffect, useState } from 'react';
import { ClipboardCheck, FileText, CreditCard, MapPin, Search } from 'lucide-react'; 

/*
  NOTAS DE CAMBIOS 

  1) Uso de imágenes como cubiertas: Las tapas de los "libros" ahora cargan imágenes desde
    `/assets/img/tramite-{id}.jpg`. Durante el desarrollo añadimos placeholders SVG en
    `assets/img/tramite-1.svg`..`tramite-5.svg` para probar; finalmente se configuró la ruta
    en el componente a `.png` para que, cuando se suban los JPG reales con esos nombres, se muestren.

  2) Hover y iconos circulares: Quitamos el texto superpuesto en las imágenes (evitar redundancia)
    y colocamos un icono circular por encima de cada libro. El icono está fuera del <img> (absoluto)
    con `-top-10` y tiene animación `group-hover` para pasar a dorado y escalar.

  3) Línea conectora: Se colocó la línea conectora entre libros con z-index alto (`z-20`) y
    `pointer-events-none` para que quede visualmente por encima de las cubiertas pero no bloquee clicks.

  4) Modal: Implementamos un modal reutilizable que abre al hacer click en cada libro (Enter/Space también funciona).
    - Escape cierra el modal (listener global en useEffect).
    - El modal es scrollable (`max-h: 80vh`) para contenido largo.

  5) Contenido de los modales: Añadimos contenido detallado por trámite (1..5):
    - Paso 1: requisitos para título de tierras urbanas (incluye datos bancarios).
    - Paso 2: cómo regularizar un local comercial (pasos + beneficios).
    - Paso 3: requisitos para regularización de locales comerciales (9 puntos).
    - Paso 4: requisitos para tramitar título de propiedad de vivienda (se movió aquí según corrección).
    - Paso 5: procedimiento y pasos para conformar el CTU (asambleas, registro, regularización).

  6) Accesibilidad: los botones tienen `role="button"`, `tabIndex=0` y manejadores de teclado
    (Enter/Space) para abrir el modal.

  7) Notas adicionales: se corrigió un error de JSX (reemplazar ">" por `&gt;` dentro de texto) para evitar fallo de compilación.


*/

const Tramites = () => {
  // Reordered to match the images (left-to-right)
  const pasos = [
    {
      id: 1,
      titulo: "Requisitos para la regularización de locales comerciales",
      desc: "Descripción y requisitos para regularizar locales comerciales.",
      icono: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      titulo: "Cómo regularizar un local comercial",
      desc: "Guía para regularizar un local comercial según normativa vigente.",
      icono: <CreditCard className="w-6 h-6" />
    },
    {
      id: 3,
      titulo: "Requisitos para tramitar título de propiedad",
      desc: "Pasos para tramitar título de propiedad para viviendas.",
      icono: <ClipboardCheck className="w-6 h-6" /> 
    },
    {
      id: 4,
      titulo: "Cómo conformar los comités de tierras urbanas",
      desc: "Información sobre cómo conformar comités y su rol en la gestión de tierras.",
      icono: <MapPin className="w-6 h-6" />
    },
    {
      id: 5,
      titulo: "Requisitos para tramitar título de tierras urbanas",
      desc: "Requisitos y pasos para tramitar títulos de tierras urbanas.",
      icono: <Search className="w-6 h-6" />
    }
  ];

  const [openPaso, setOpenPaso] = useState<null | number>(null);

  // Close modal on Escape
  // Nota: aquí añadimos el listener para cerrar el modal con la tecla Escape (accesibilidad)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPaso(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        {/* Título Principal */}
        <h2 className="text-[#003366] font-montserrat font-extrabold text-3xl md:text-4xl mb-4">
          Conoce nuestros trámites
        </h2>
        {/* Línea divisoria dorada */}
        <div className="w-24 h-1 bg-[#b8860b] mx-auto"></div>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-light">
          Explora los servicios disponibles para la regularización y titularidad de tierras urbanas a nivel nacional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
        {pasos.map((paso) => (
          <div key={paso.id} className="relative group flex justify-center">
            {/* circular icon above the book (desktop)
                Cambio: movimos el icono FUERA del <img> para que quede por encima de la tapa
                y le dimos animación con `group-hover` para pasar a tono dorado. */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-30 pointer-events-none">
              {/* Nota: este contenedor es no interactivo (pointer-events-none arriba), la animación responde al `group-hover` del padre */}
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#6b2aa6] flex items-center justify-center text-[#003366] transition-all duration-300 shadow-lg transform group-hover:scale-105 group-hover:bg-[#b8860b] group-hover:border-[#b8860b] group-hover:text-white">
                {paso.icono}
              </div>
            </div>

            {/* Línea conectora (desktop only between books)
                Cambio: la línea se colocó por encima de las tapas con z-20
                y `pointer-events-none` para no bloquear clicks en las tarjetas. */}
            {paso.id !== pasos.length && (
              // connector line: place above the books (higher z) and non-interactive
              <div className="hidden lg:block absolute -top-6 left-full w-32 h-0.5 bg-[#b8860b]/20 z-20 pointer-events-none" />
            )}

            {/* Book card */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenPaso(paso.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenPaso(paso.id); }}
              className={
                `relative z-10 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer outline-none` +
                ` ${paso.id === pasos.length ? 'ring-4 ring-[#6b2aa6]/80 rounded-xl' : ''}`
              }
            >
              {/* Book cover as image */}
              <div className="w-48 lg:w-56 rounded-lg shadow-2xl overflow-hidden relative bg-slate-100">
                {/* Nota: la ruta final apunta a /assets/img/tramite-{id}.jpg en producción.
                    Se usaron placeholders SVG durante desarrollo. */}
                <img
                  src={`/assets/img/tramite-${paso.id}.png`}
                  alt={paso.titulo}
                  loading="lazy"
                  className="w-full h-72 object-cover block"
                />

                {/* subtle overlay gradient for contrast (no text to avoid redundancy with the image)
                    Cambio: dejamos solo un degradado para que la imagen no pierda su contenido. */}
                <div className="absolute inset-0 flex items-end pointer-events-none">
                  <div className="w-full h-24 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>

              {/* mimic book shadow/spine on the left for visual depth */}
              {/* Cambio: añadimos la "espina" a la izquierda para dar profundidad visual */}
              <div className="absolute left-0 top-0 -translate-x-3 w-3 h-full bg-gradient-to-b from-[#052034] to-[#01202b] rounded-l-lg shadow-inner hidden lg:block" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* Modal: abre al hacer click en la tarjeta. Mantiene comportamiento de teclado y Escape. */}
      {openPaso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpenPaso(null)} />
          {/* Contenedor del modal (scrollable). Cambio: max-h 80vh para contenidos largos */}
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6 z-10 max-h-[80vh] overflow-auto">
            <button aria-label="Cerrar" className="absolute top-4 right-4 text-slate-600 hover:text-slate-900" onClick={() => setOpenPaso(null)}>✕</button>
            {(() => {
              const paso = pasos.find(p => p.id === openPaso);
              if (!paso) return null;

              // Detailed content for paso 1
              /* Modal paso 1: requisitos para titular tierras urbanas (incluye datos bancarios) */
              if (paso.id === 1) {
                return (
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA TRAMITAR EL TÍTULO DE TIERRAS URBANAS</h3>

                    <ol className="list-decimal ml-6 space-y-3 text-slate-700">
                      <li>
                        Una (01) Carpeta Marrón tamaño oficio con gancho identificada con los siguientes datos:
                        <ul className="list-disc ml-6 mt-2 text-slate-600">
                          <li>Nombre y Apellido del solicitante.</li>
                          <li>Cédula de Identidad.</li>
                          <li>Dirección exacta del inmueble (parroquia, municipio y estado).</li>
                          <li>Número de celular.</li>
                          <li>Nombre del Comité de Tierras Urbanas.</li>
                        </ul>
                      </li>

                      <li>Una (01) copia de la Cédula de Identidad (legible y vigente).</li>

                      <li>Una (01) copia del documento de propiedad de la vivienda, título supletorio, contrato de obra o cualquier documento que acredite la propiedad de las bienhechurías (verificado el original).</li>

                      <li>Original de la Constancia de Ocupación emitida por el Comité de Tierras Urbanas (CTU) del Sector o comunidad. El CTU debe estar actualizado.</li>

                      <li>Plano mensura elaborado por la Gerencia Estatal del Instituto Nacional de Tierras Urbanas (INTU).</li>

                      <li>Original del pago a la Cuenta Bancaria Nacional de Regularización de Tierras Urbanas por la cantidad de una milésima de bolívar por metro cuadrado.</li>

                      <li>Diez (10) hojas blancas tamaño oficio, sin doblar ni perforar.</li>

                      <li>Cualquier otro recaudo solicitado por el Abogado revisor del Instituto Nacional de Tierras Urbanas (INTU).</li>

                      <li>
                        En el caso de existir un excedente a la superficie establecida de 400 m², no podrá ser mayor a 400 m² y su precio se regirá de acuerdo a la planta de valores de la tierra establecida en cada municipio y se deberá presentar el original del comprobante de pago realizado a la cuenta de cobranza de la Gerencia Estatal.
                      </li>
                    </ol>

                    <div className="mt-6 p-4 bg-[#0b2440] text-white rounded-lg">
                      <h4 className="font-bold mb-2">DATOS BANCARIOS</h4>
                      <p className="text-sm">Instituto Nacional de Tierras Urbanas (INTU)</p>
                      <p className="text-sm">Banco de Venezuela S.A</p>
                      <p className="text-sm">Cuenta Corriente: 0102-0552-2800-0005-9637</p>
                      <p className="text-sm">Registro de Información Fiscal: N.° G-200101873</p>
                    </div>
                  </div>
                );
              }

              // Detailed content for paso 2
              if (paso.id === 2) {
                return (
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">CÓMO REGULARIZAR UN LOCAL COMERCIAL</h3>

                    <ol className="list-decimal ml-6 space-y-3 text-slate-700">
                      <li>Reúne los requisitos solicitados para el trámite.</li>
                      <li>Acude a la Gerencia Estatal del Instituto Nacional de Tierras Urbanas (INTU) más cercana y solicita asesoría personalizada.</li>
                      <li>El Instituto Nacional de Tierras Urbanas (INTU) comprobará la veracidad de los documentos y la viabilidad del caso.</li>
                      <li>Completa los trámites dependiendo de la modalidad indicada por el personal del INTU.</li>
                    </ol>

                    <h4 className="mt-6 text-lg font-bold text-[#003366]">BENEFICIOS DE REGULARIZAR TU LOCAL COMERCIAL</h4>
                    <ul className="list-decimal ml-6 space-y-3 text-slate-700 mt-3">
                      <li><strong>Seguridad jurídica:</strong> Al regularizarse garantizas tus derechos.</li>
                      <li><strong>Acceso a créditos:</strong> Podrás solicitar financiamiento para ampliar o mejorar tu negocio.</li>
                      <li><strong>Participación en programas gubernamentales:</strong> Tendrás acceso a beneficios y oportunidades exclusivas.</li>
                      <li><strong>Evita problemas legales:</strong> Regularizar te protege de posibles conflictos y demandas.</li>
                    </ul>
                  </div>
                );
              }

              // Detailed content for paso 3 (requisitos para la regularización de locales comerciales)
              if (paso.id === 3) {
                return (
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA LA REGULARIZACIÓN DE LOCALES COMERCIALES</h3>

                    <ol className="list-decimal ml-6 space-y-3 text-slate-700">
                      <li>
                        Una (01) Carpeta Marrón Tamaño Oficio con gancho identificada con los siguientes datos:
                        <ul className="list-disc ml-6 mt-2 text-slate-600">
                          <li>Nombre y Apellido del solicitante.</li>
                          <li>Cédula de Identidad.</li>
                          <li>Dirección exacta del inmueble, parroquia, municipio y estado.</li>
                          <li>Número de celular.</li>
                        </ul>
                      </li>

                      <li>Solicitud escrita ante la Gerencia Estatal del INTU solicitando la regularización del inmueble, indicando la dirección, metros cuadrados, datos de la persona y número telefónico.</li>

                      <li>Constancia de Ocupación emitida por el Comité de Tierras Urbanas (CTU) y/o Consejo Comunal, que indique el tiempo de permanencia.</li>

                      <li>Copia del documento de Firma Personal y/o certificado de Emprender o Registro Mercantil.</li>

                      <li>Copia de cédula de identidad legible y vigente del solicitante o los solicitantes.</li>

                      <li>Registro de Información Fiscal (RIF) legible y vigente.</li>

                      <li>Ficha catastral emitida por la Alcaldía.</li>

                      <li>2 Referencias Comercial, Personales y Bancarias.</li>

                      <li>Certificación de Ingresos de los últimos 3 meses o balance de la empresa (si aplica).</li>
                    </ol>
                  </div>
                );
              }

              // Detailed content moved to paso 4 (was previously under paso 3)
              if (paso.id === 4) {
                return (
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA TRAMITAR EL TÍTULO DE PROPIEDAD DE VIVIENDA</h3>

                    <ol className="list-decimal ml-6 space-y-3 text-slate-700">
                      <li>
                        Una (01) Carpeta Marrón Tamaño Oficio con gancho identificada con los siguientes datos:
                        <ul className="list-disc ml-6 mt-2 text-slate-600">
                          <li>Nombre y Apellido del solicitante.</li>
                          <li>Cédula de Identidad.</li>
                          <li>Dirección exacta del inmueble, parroquia, municipio y estado.</li>
                          <li>Número de celular.</li>
                        </ul>
                      </li>

                      <li>Una (01) copia de la Cédula de Identidad (legible y vigente).</li>

                      <li>Una (01) copia del título de propiedad de tierra (verificado el original).</li>

                      <li>Una (01) copia de la Sucesión y Registro de Información Fiscal (RIF), si aplica.</li>

                      <li>Constancia de Residencia emitida por el Comité de Tierras Urbanas (CTU) y/o el Consejo Comunal (original).</li>

                      <li>Ficha Catastral emitida por la Alcaldía o plano mensura elaborado por la Gerencia Estatal del INTU.</li>

                      <li>Oficio de Autorización de Pago emitido por el Gerente Estatal del INTU.</li>

                      <li>Original del pago bancario a la cuenta cobranza de la gerencia del estado en el Banco de Venezuela a nombre del Instituto Nacional de Tierras Urbanas Regional, con Registro de Información Fiscal N.° G-200101873, la cantidad de 140 Unidades de la Moneda de Mayor Valor anclado al Banco Central de Venezuela.</li>

                      <li>Cualquier otro recaudo solicitado por el Abogado revisor del INTU.</li>
                    </ol>
                  </div>
                );
              }

              // Detailed content for paso 5 (Cómo conformar tu COMITÉ DE TIERRAS URBANAS - CTU)
              if (paso.id === 5) {
                return (
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">CÓMO CONFORMAR TU COMITÉ DE TIERRAS URBANAS (CTU)</h3>

                    <p className="text-slate-700 mb-4">El procedimiento de constitución y conformación del Comité de Tierras Urbanas se realizará sin la intervención ni interferencia de personas externas a la comunidad donde será constituido, y será aplicable con carácter obligatorio los principios de democracia participativa y protagónica.</p>

                    <h4 className="font-bold text-[#003366] mb-2">Solicitud de requisitos previos para la conformación del CTU</h4>
                    <ul className="list-decimal ml-6 mb-4 text-slate-700">
                      <li>Acta constitutiva del CTU aprobada por la asamblea de ciudadanos y ciudadanas, acompañada de la asistencia.</li>
                      <li>Croquis con las dimensiones, linderos y demás características generales del terreno donde se encuentra ubicado el asentamiento urbano o periurbano.</li>
                    </ul>

                    <h4 className="font-bold text-[#003366] mb-2">Pasos para la conformación</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-[#0b2440] text-white rounded">
                        <h5 className="font-bold mb-2">PASO 1 - Convocatoria a una Asamblea de Ciudadanos y Ciudadanas</h5>
                        <ol className="list-decimal ml-6 text-sm">
                          <li>Integrada por un grupo no menor a 5 personas.</li>
                          <li>Promover, difundir y elegir la Comisión electoral.</li>
                          <li>Cesará en sus funciones una vez electa y juramentada la Comisión Electoral.</li>
                          <li>Realizar un acta con los voceros y voceras electos para la comisión provisional.</li>
                        </ol>
                      </div>

                      <div className="p-4 bg-[#0b2440] text-white rounded">
                        <h5 className="font-bold mb-2">PASO 2 - Convocatoria a una Asamblea para elegir Comisión Provisional</h5>
                        <ol className="list-decimal ml-6 text-sm">
                          <li>Grupo no menor a tres (3) personas ni mayor a cinco (5).</li>
                          <li>Responsable de orientar y reglamentar el proceso electoral, y proclamar los voceros y voceras electas.</li>
                          <li>Cesará en sus funciones una vez electo el Comité de Tierras Urbanas.</li>
                          <li>Realizar un acta con los voceros y voceras electos para la comisión electoral.</li>
                        </ol>
                      </div>

                      <div className="p-4 bg-[#0b2440] text-white rounded">
                        <h5 className="font-bold mb-2">PASO 3 - Asamblea Constitutiva del Comité de Tierras Urbanas</h5>
                        <ol className="list-decimal ml-6 text-sm">
                          <li>Asistencia de 50% + 1 de los habitantes mayores de edad.</li>
                          <li>Población &gt; 30% con un intervalo no menor de 3 días.</li>
                          <li>Período de dos (2) años.</li>
                          <li>Pudiendo ser reelectos por una sola vez.</li>
                          <li>Realizar un acta con los voceros y voceras electos del CTU.</li>
                        </ol>
                      </div>

                      <div className="p-4 bg-[#0b2440] text-white rounded">
                        <h5 className="font-bold mb-2">PASO 4 - Registro del Comité de Tierras Urbanas ante el INTU</h5>
                        <ol className="list-decimal ml-6 text-sm">
                          <li>Lugares donde acudir para formalizar el registro: Instituto Nacional de Tierras Urbanas (INTU) y Oficinas Municipales de Tierras Urbanas en las Alcaldías.</li>
                        </ol>
                      </div>

                      <div className="p-4 bg-[#0b2440] text-white rounded">
                        <h5 className="font-bold mb-2">PASO 5 - Proceso de Regularización</h5>
                        <ol className="list-decimal ml-6 text-sm">
                          <li>Carta dirigida al Gerente Estatal del INTU o responsable de la Oficina de OTM de la Alcaldía solicitando el inicio del proceso de regularización de tierra urbana de jurisdicción.</li>
                          <li>Realización y consignación de la carta del barrio.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              }

              // Default modal for other pasos
              return (
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4">{paso.titulo}</h3>
                  <p className="text-slate-700">{paso.desc}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tramites;