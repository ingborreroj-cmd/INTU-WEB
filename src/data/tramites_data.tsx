import React from 'react';
import { FileText, CreditCard, ClipboardCheck, MapPin, Search } from 'lucide-react';

export interface TramiteItem {
  id: number;
  titulo: string;
  desc: string;
  Icon: React.ElementType;
  image: string;
  modalContent: React.ReactNode;
}

export const tramites: TramiteItem[] = [
  {
    id: 1,
    titulo: 'Requisitos para la regularización de locales comerciales',
    desc: 'Descripción y requisitos para regularizar locales comerciales.',
    Icon: FileText,
    image: '/assets/img/tramite-1.png',
    modalContent: (
      <div>
        <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA TRAMITAR EL TÍTULO DE TIERRAS URBANAS</h3>

        <ol className="list-decimal ml-6 space-y-3 text-slate-700">
          <li>
            Una (01) carpeta marrón tamaño oficio con gancho identificada con los siguientes datos:
            <ul className="list-disc ml-6 mt-2 text-slate-600">
              <li>Nombre y apellido del solicitante.</li>
              <li>Cédula de identidad.</li>
              <li>Dirección exacta del inmueble (parroquia, municipio y estado).</li>
              <li>Número de celular.</li>
              <li>Nombre del Comité de Tierras Urbanas.</li>
            </ul>
          </li>

          <li>Una (01) copia de la cédula de identidad (legible y vigente).</li>
          <li>Una (01) copia del documento de propiedad de la vivienda, título supletorio, contrato de obra o cualquier documento que acredite la propiedad de las bienhechurías (verificado el original).</li>
          <li>Original de la constancia de ocupación emitida por el Comité de Tierras Urbanas (CTU) del sector o comunidad. El CTU debe estar actualizado.</li>
          <li>Plano mensura elaborado por la Gerencia Estatal del Instituto Nacional de Tierras Urbanas (INTU).</li>
          <li>Original del pago a la Cuenta Bancaria Nacional de Regularización de Tierras Urbanas por la cantidad de una milésima de bolívar por metro cuadrado.</li>
          <li>Diez (10) hojas blancas tamaño oficio, sin doblar ni perforar.</li>
          <li>Cualquier otro recaudo solicitado por el abogado revisor del Instituto Nacional de Tierras Urbanas (INTU).</li>
          <li>En el caso de existir un excedente a la superficie establecida de 400 m², no podrá ser mayor a 400 m² y su precio se regirá de acuerdo a la planta de valores de la tierra establecida en cada municipio. Debe presentarse el original del comprobante de pago realizado a la cuenta de cobranza de la gerencia estatal.</li>
        </ol>

        <div className="mt-6 p-4 bg-[#0b2440] text-white rounded-lg">
          <h4 className="font-bold mb-2">DATOS BANCARIOS</h4>
          <p className="text-sm">Instituto Nacional de Tierras Urbanas (INTU)</p>
          <p className="text-sm">Banco de Venezuela S.A.</p>
          <p className="text-sm">Cuenta Corriente: 0102-0552-2800-0005-9637</p>
          <p className="text-sm">Registro de Información Fiscal: N.° G-200101873</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    titulo: 'Cómo regularizar un local comercial',
    desc: 'Guía para regularizar un local comercial según normativa vigente.',
    Icon: CreditCard,
    image: '/assets/img/tramite-2.png',
    modalContent: (
      <div>
        <h3 className="text-2xl font-bold text-[#003366] mb-4">CÓMO REGULARIZAR UN LOCAL COMERCIAL</h3>

        <ol className="list-decimal ml-6 space-y-3 text-slate-700">
          <li>Reúne los requisitos solicitados para el trámite.</li>
          <li>Acude a la Gerencia Estatal del Instituto Nacional de Tierras Urbanas (INTU) más cercana y solicita asesoría personalizada.</li>
          <li>El INTU comprobará la veracidad de los documentos y la viabilidad del caso.</li>
          <li>Completa los trámites dependiendo de la modalidad indicada por el personal del INTU.</li>
        </ol>

        <h4 className="mt-6 text-lg font-bold text-[#003366]">BENEFICIOS DE REGULARIZAR TU LOCAL COMERCIAL</h4>
        <ul className="list-decimal ml-6 space-y-3 text-slate-700 mt-3">
          <li><strong>Seguridad jurídica:</strong> Al regularizarte garantizas tus derechos.</li>
          <li><strong>Acceso a créditos:</strong> Podrás solicitar financiamiento para ampliar o mejorar tu negocio.</li>
          <li><strong>Participación en programas gubernamentales:</strong> Tendrás acceso a beneficios y oportunidades exclusivas.</li>
          <li><strong>Evita problemas legales:</strong> Regularizarte te protege de posibles conflictos y demandas.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    titulo: 'Requisitos para tramitar título de propiedad',
    desc: 'Pasos para tramitar título de propiedad para viviendas.',
    Icon: ClipboardCheck,
    image: '/assets/img/tramite-3.png',
    modalContent: (
      <div>
        <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA LA REGULARIZACIÓN DE LOCALES COMERCIALES</h3>

        <ol className="list-decimal ml-6 space-y-3 text-slate-700">
          <li>
            Una (01) carpeta marrón tamaño oficio con gancho identificada con los siguientes datos:
            <ul className="list-disc ml-6 mt-2 text-slate-600">
              <li>Nombre y apellido del solicitante.</li>
              <li>Cédula de identidad.</li>
              <li>Dirección exacta del inmueble, parroquia, municipio y estado.</li>
              <li>Número de celular.</li>
            </ul>
          </li>

          <li>Solicitud escrita ante la Gerencia Estatal del INTU solicitando la regularización del inmueble, indicando la dirección, metros cuadrados, datos de la persona y número telefónico.</li>
          <li>Constancia de ocupación emitida por el Comité de Tierras Urbanas (CTU) y/o Consejo Comunal, que indique el tiempo de permanencia.</li>
          <li>Copia del documento de firma personal y/o certificado de emprender o registro mercantil.</li>
          <li>Copia de cédula de identidad legible y vigente del solicitante o los solicitantes.</li>
          <li>Registro de Información Fiscal (RIF) legible y vigente.</li>
          <li>Ficha catastral emitida por la Alcaldía.</li>
          <li>Dos referencias comercial, personales y bancarias.</li>
          <li>Certificación de ingresos de los últimos tres meses o balance de la empresa (si aplica).</li>
        </ol>
      </div>
    ),
  },
  {
    id: 4,
    titulo: 'Cómo conformar los comités de tierras urbanas',
    desc: 'Información sobre cómo conformar comités y su rol en la gestión de tierras.',
    Icon: MapPin,
    image: '/assets/img/tramite-4.png',
    modalContent: (
      <div>
        <h3 className="text-2xl font-bold text-[#003366] mb-4">REQUISITOS PARA TRAMITAR EL TÍTULO DE PROPIEDAD DE VIVIENDA</h3>

        <ol className="list-decimal ml-6 space-y-3 text-slate-700">
          <li>
            Una (01) carpeta marrón tamaño oficio con gancho identificada con los siguientes datos:
            <ul className="list-disc ml-6 mt-2 text-slate-600">
              <li>Nombre y apellido del solicitante.</li>
              <li>Cédula de identidad.</li>
              <li>Dirección exacta del inmueble, parroquia, municipio y estado.</li>
              <li>Número de celular.</li>
            </ul>
          </li>
          <li>Una (01) copia de la cédula de identidad (legible y vigente).</li>
          <li>Una (01) copia del título de propiedad de tierra (verificado el original).</li>
          <li>Una (01) copia de la sucesión y registro de información fiscal (RIF), si aplica.</li>
          <li>Constancia de residencia emitida por el Comité de Tierras Urbanas (CTU) y/o el Consejo Comunal (original).</li>
          <li>Ficha catastral emitida por la Alcaldía o plano mensura elaborado por la Gerencia Estatal del INTU.</li>
          <li>Oficio de autorización de pago emitido por el Gerente Estatal del INTU.</li>
          <li>Original del pago bancario a la cuenta de cobranza de la gerencia del estado en el Banco de Venezuela a nombre del Instituto Nacional de Tierras Urbanas Regional, con Registro de Información Fiscal N.° G-200101873, por la cantidad correspondiente.</li>
          <li>Cualquier otro recaudo solicitado por el abogado revisor del INTU.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 5,
    titulo: 'Requisitos para tramitar título de tierras urbanas',
    desc: 'Requisitos y pasos para tramitar títulos de tierras urbanas.',
    Icon: Search,
    image: '/assets/img/tramite-5.png',
    modalContent: (
      <div>
        <h3 className="text-2xl font-bold text-[#003366] mb-4">CÓMO CONFORMAR TU COMITÉ DE TIERRAS URBANAS (CTU)</h3>

        <p className="text-slate-700 mb-4">El procedimiento de constitución y conformación del Comité de Tierras Urbanas se realiza sin la intervención ni interferencia de personas externas a la comunidad donde se conforma. Se aplican los principios de democracia participativa y protagonismo ciudadano.</p>

        <h4 className="font-bold text-[#003366] mb-2">Solicitud de requisitos previos para la conformación del CTU</h4>
        <ul className="list-decimal ml-6 mb-4 text-slate-700">
          <li>Acta constitutiva del CTU aprobada por la asamblea de ciudadanos y ciudadanas, acompañada de la lista de asistencia.</li>
          <li>Croquis con las dimensiones, linderos y demás características generales del terreno donde se encuentra ubicado el asentamiento urbano o periurbano.</li>
        </ul>

        <h4 className="font-bold text-[#003366] mb-2">Pasos para la conformación</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0b2440] text-white rounded">
            <h5 className="font-bold mb-2">PASO 1 - Convocatoria a una Asamblea de Ciudadanos y Ciudadanas</h5>
            <ol className="list-decimal ml-6 text-sm">
              <li>Integrada por un grupo no menor a cinco (5) personas.</li>
              <li>Promover, difundir y elegir la Comisión Electoral.</li>
              <li>Cesa en sus funciones una vez electa y juramentada la Comisión Electoral.</li>
              <li>Realizar un acta con los voceros y voceras electos para la comisión provisional.</li>
            </ol>
          </div>

          <div className="p-4 bg-[#0b2440] text-white rounded">
            <h5 className="font-bold mb-2">PASO 2 - Asamblea para elegir Comisión Provisional</h5>
            <ol className="list-decimal ml-6 text-sm">
              <li>Grupo no menor a tres (3) personas ni mayor a cinco (5).</li>
              <li>Responsable de orientar y reglamentar el proceso electoral y proclamar los voceros y voceras electas.</li>
              <li>Cesa en sus funciones una vez electo el Comité de Tierras Urbanas.</li>
              <li>Realizar un acta con los voceros y voceras electos para la comisión electoral.</li>
            </ol>
          </div>

          <div className="p-4 bg-[#0b2440] text-white rounded">
            <h5 className="font-bold mb-2">PASO 3 - Asamblea Constitutiva del Comité de Tierras Urbanas</h5>
            <ol className="list-decimal ml-6 text-sm">
              <li>Asistencia de 50 % + 1 de los habitantes mayores de edad.</li>
              <li>Población superior al 30 % con un intervalo no menor de tres (3) días.</li>
              <li>Período de dos (2) años.</li>
              <li>Pueden ser reelectos por una sola vez.</li>
              <li>Realizar un acta con los voceros y voceras electos del CTU.</li>
            </ol>
          </div>

          <div className="p-4 bg-[#0b2440] text-white rounded">
            <h5 className="font-bold mb-2">PASO 4 - Registro del Comité de Tierras Urbanas ante el INTU</h5>
            <ol className="list-decimal ml-6 text-sm">
              <li>Lugares donde acudir para formalizar el registro: Instituto Nacional de Tierras Urbanas (INTU) y oficinas municipales de tierras urbanas en las alcaldías.</li>
            </ol>
          </div>

          <div className="p-4 bg-[#0b2440] text-white rounded">
            <h5 className="font-bold mb-2">PASO 5 - Proceso de Regularización</h5>
            <ol className="list-decimal ml-6 text-sm">
              <li>Carta dirigida al Gerente Estatal del INTU o responsable de la Oficina de OTM de la alcaldía solicitando el inicio del proceso de regularización de tierra urbana de jurisdicción.</li>
              <li>Realización y consignación de la carta del barrio.</li>
            </ol>
          </div>
        </div>
      </div>
    ),
  },
];
