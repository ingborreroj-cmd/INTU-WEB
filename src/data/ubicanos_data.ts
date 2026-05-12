// src/data/ubicanos.ts

export interface Ubicacion {
  estado: string;
  gerente: string;
  correo: string;
  telefono: string;
  direccion: string;
  directores: string;
  telefonoDirectores: string;
}

export const locations: Ubicacion[] = [
  {
    estado: 'Amazonas',
    gerente: 'Lidia Teresa Pulgar de Rufo',
    correo: 'intuamazonas@gmail.com / pulgarlidia53@gmail.com',
    telefono: '0426-8013498',
    direccion: 'AV EL EJERCITO CRUCE CO AV LA FLORIDA SEDE MINHVI ANTIGUA SEDE INAVI PUERTO AYACUCHO ESTADO AMAZONAS MUNICIPIO ATURES PARROQUIA LUIS ALBERTO GOMEZ',
    directores: 'Angel Sandoval',
    telefonoDirectores: '0426-1258328'
  },
  {
    estado: 'Anzoátegui',
    gerente: 'Melvin José Guerra',
    correo: 'intu.anz@gmail.com / cartografiaintuanz@gmail.com / intuoficialanzoategui@gmail.com',
    telefono: '0424-8738564',
    direccion: 'URBANIZACION BOYACA V, SECTOR 5 CALLE 4 EDIFICIO INAVI, PARROQUIA EL CARMEN, MUNICIPIO SIMON BOLIVAR DEL ESTADO ANZOATEGUI',
    directores: 'Jesús Marcano',
    telefonoDirectores: '0414-7950048'
  },
    {
    estado: 'Apure',
    gerente: 'Victanyila Padrón',
    correo: 'intu2025apure@gmail.com',
    telefono: '0424-8738564',
    direccion: 'CALLE PLAZA CRUCE CON CALLE SUCRE, MUNICIPIO SAN FERNANDO DEL ESTADO APURE',
    directores: 'Daicy Mejías',
    telefonoDirectores: '0424-7381785'
  },
    {
    estado: 'Aragua',
    gerente: 'Carlos Arguinzones',
    correo: 'intuaragua2023@gmail.com',
    telefono: '0412-9346003',
    direccion: 'PARROQUIA ANDRÉS ELOY BLANCO, SECTOR SUR OESTE III, PROLONGACIÓN CALLE PÉREZ ALMARZA, S/N, CON CALLE NEGRO PRIMERO, MUNICIPIO GIRARDOT DEL ESTADO ARAGUA',
    directores: '-',
    telefonoDirectores: '-'
  },
    {
    estado: 'Barinas',
    gerente: 'Aileen Fernández',
    correo: 'intubarinas2022@gmail.com',
    telefono: '0412-2665035',
    direccion: 'INSTALACIONES DE CORPOLLANO, UBICADO EN LA AVENIDA ORLANDO ARAUJO, SECTOR CAMPO LA MESA PARROQUIA ALTO BARINAS MUNICIPIO BARINAS',
    directores: 'José Juan Vivas',
    telefonoDirectores: '0426-5710307'
  },
    {
    estado: 'Bolívar',
    gerente: 'Lisbeth Alexandra Estanga Maita',
    correo: 'intubolivar29082023@gmail.com',
    telefono: '0412-1197488',
    direccion: 'AVENIDA ESTADOS UNIDOS CON CALLE MÉXICO, PARROQUIA CACHAMAY, MUNICIPIO CARONÍ DEL ESTADO BOLÍVAR',
    directores: 'Yuraima Patricia Cabrera',
    telefonoDirectores: '0424-4076756 / 04120494527'
  },
    {
    estado: 'Carabobo',
    gerente: 'Rafael Alejandro Ibedaca Rios',
    correo: 'rafibe06@yahooo.com',
    telefono: '0412-8434754 / 0414-3410934',
    direccion: 'SECTOR LOS SAUCES, AVENIDA 135, PARCELA N° 98-65, PARROQUIA SAN JOSÉ, MUNICIPIO VALENCIA, ESTADO CARABOBO',
    directores: 'Yulismar Carrillo',
    telefonoDirectores: '0424-4076756 / 04120494527'
  },
    {
    estado: 'Cojedes',
    gerente: 'Blancir Yuleidy Farfan Reyes',
    correo: 'intucojedes2@gmail.com / blancirf.05@gmail.com',
    telefono: '0414-5971128',
    direccion: 'AVENIDA INDUSTRIAL, PARCELA N° 13, SECTOR GOB, ZONA INDUSTRIAL, DE SAN CARLOS, PARROQUIA SAN CARLOS DE AUSTRIA, MUNICIPIO EZEQUIEL ZAMORA, ESTADO COJEDES',
    directores: 'Génesis Moreno',
    telefonoDirectores: '0426-3460523'
  },
    {
    estado: 'Delta Amacuro',
    gerente: 'Anakarina Icoa Meza Brito',
    correo: 'intudelta2016@gmail.com',
    telefono: '0424-9245489',
    direccion: 'AVENIDA GUASIMAL, DIAGONAL A TRAKI, PARROQUIA J. VIDAL MARCANO, MUNICIPIO TUCUPITA DEL ESTADO DELTA AMACURO',
    directores: 'Oswaldo Gonzalez',
    telefonoDirectores: '0424-9042172'
  },
    {
    estado: 'DTTO. Capital',
    gerente: 'Rosmel Daniel Flores Ñáñez',
    correo: 'Rosmelflores2404@gmail.com',
    telefono: '0412-7260411 / 0412-9977426',
    direccion: 'EL SILENCIO, PARROQUIA SAN JUAN, MUNICIPIO LIBERTADOR DEL DISTRITO CAPITAL',
    directores: 'Robinson Toro',
    telefonoDirectores: '0412-2543099'
  },
    {
    estado: 'Falcón',
    gerente: 'Vilmara Rodríguez',
    correo: 'falconintu2025@gmail.com / vilmararodriguez@gmail.com',
    telefono: '0424-6497299',
    direccion: 'FALCON INTU CALLE MOZON CON CALLE COMERCIO, SEDE BANAVIH MUNICIPIO MIRANDA PARROQUIA SAN ANTONIO',
    directores: 'Jesús León',
    telefonoDirectores: '0412-7664294'
  },
    {
    estado: 'Guárico',
    gerente: 'Hector Josue Diaz Garcia',
    correo: 'intu.guarico@gmail.com',
    telefono: '0426-4480847',
    direccion: 'AVENIDA ROMULO GALLEGO, LA REDOMA AL LADO DEL MINISTERIO PUBLICO EDIFICIO HABITAT Y VIVIENDA PRIMER PISO OFICINA INTU MUNICIPIO JUAN GERMAN ROCIO SAN JUAN DE LOS MORROS',
    directores: '-',
    telefonoDirectores: '-'
  },
    {
    estado: 'La Guaira',
    gerente: 'Jorgelina Solarte',
    correo: 'intulaguaira@gmail.com',
    telefono: '0414-2221217',
    direccion: 'LA GUAIRA, PARROQUIA CARABALLEDA, SECTOR CORAPAL',
    directores: '-',
    telefonoDirectores: '-'
  },
    {
    estado: 'Lara',
    gerente: 'Eduardo Ortiz',
    correo: 'lara.intu2025@gmail.com',
    telefono: '0414-9546958',
    direccion: 'AVENIDA SEXTA ENTRE LAS CALLES 24 Y 25, PARROQUIA EL SAGRARIO, MUNICIPIO LIBERTADOR DEL ESTADO MÉRIDA',
    directores: 'Pedro González',
    telefonoDirectores: '0414-7551093'
  },
    {
    estado: 'Mérida',
    gerente: 'Lenia Barranco',
    correo: 'intumerida@gmail.com',
    telefono: '0414-7488832',
    direccion: 'AVENIDA SEXTA ENTRE LAS CALLES 24 Y 25, PARROQUIA EL SAGRARIO, MUNICIPIO LIBERTADOR DEL ESTADO MÉRIDA',
    directores: 'Pedro González',
    telefonoDirectores: '0414-7551093'
  },
    {
    estado: 'Miranda',
    gerente: 'Carlos Manuel Santana Martinez',
    correo: 'icarlos77santanam@gmail.com / intumirandag@gmail.com',
    telefono: '0424-1948929 / 0412-3901825',
    direccion: 'CALLE ORINOCO CON AV. PRINCIPAL DE LAS MERCEDES, INSTITUTO NACIONAL DE TIERRAS URBANAS, PISO 1 URB. LAS MERCEDES, MUNICIPIO BARUTA, ESTADO MIRANDA',
    directores: 'Henry Gudiño',
    telefonoDirectores: '0412-0325603'
  },
    {
    estado: 'Monagas',
    gerente: 'Roger Eduardo Rivas Cortes',
    correo: 'intumonagasm@gmail.com / r.rivas.venalcasa@gmail.com',
    telefono: '0426-4881804',
    direccion: 'SECTOR LOS BLOQUES, PARROQUIA SAN SIMÓN, MUNICIPIO MATURÍN DEL ESTADO MONAGAS.',
    directores: 'Crismary Rodríguez',
    telefonoDirectores: '0424-9539937'
  },
    {
    estado: 'Nueva Esparta',
    gerente: 'Marilda Del Valle Morris Salazar',
    correo: 'delvallemorrissalazar@gmail.com',
    telefono: '0414-2021557 / 0426-5963585',
    direccion: 'AVENIDA LA AUYAMA ANTIGUO GOLF MARGARITA PARROQUIA PAMPATAR MUNICIPIO MANEIRO ESTADO NUEVA ESPARTA',
    directores: 'Ashaella Spadafora',
    telefonoDirectores: '0412-3519739'
  },
    {
    estado: 'Portuguesa',
    gerente: 'José Arraez',
    correo: 'josearraez73@gmail.com',
    telefono: '0412-5204215',
    direccion: 'MUNICIPIO PAEZ PARROQUIA ACARIGUA ESTADO PORTUGUESA EDIFICIO GOMEZ LOPEZ CENTRO COMERCIAL MEDITERRANEO',
    directores: '-',
    telefonoDirectores: '-'
  },
    {
    estado: 'Sucre',
    gerente: 'Leodersy Del Valle Solorzano Bravo',
    correo: 'solorzano.leodersy@gmail.com',
    telefono: '0426-2225638',
    direccion: 'AVENIDA BERMÚDEZ, CON CALLE SIMÓN RODRÍGUEZ PARROQUIA AYACUCHO, MUNICIPIO SUCRE DEL ESTADO SUCRE',
    directores: '-',
    telefonoDirectores: '-'
  },
    {
    estado: 'Táchira',
    gerente: 'Franklin Guerrero',
    correo: 'Gerenciaintutachira@gmail.com',
    telefono: '0426-5758170',
    direccion: 'AVENIDA LUCIO OQUENDO ANTIGUO EDIFICIO INAVI, PARROQUIA LA CONCORDIA, MUNICIPIO SAN CRISTÓBAL DEL ESTADO TÁCHIRA',
    directores: 'Franklin Guerrero',
    telefonoDirectores: '0426-5758170'
  },
    {
    estado: 'Trujillo',
    gerente: 'Richard Kevin Villasmil',
    correo: 'richardkevinvillasmil@gmail.com',
    telefono: '0426-5757175',
    direccion: 'AVENIDA CUATRICENTENARIA, SECTOR LA VEGA, EDIFICIO INAVI, MUNICIPIO TRUJILLO DEL ESTADO TRUJILLO',
    directores: 'Alexander Maldonado',
    telefonoDirectores: '0426-9788885'
  },
    {
    estado: 'Yaracuy',
    gerente: 'Yamileth Sanchez',
    correo: 'intuyaracuy@gmail.com',
    telefono: '0416-3391609',
    direccion: 'ASCENSIÓN, MUNICIPIO SAN FELIPE DEL ESTADO YARACUY',
    directores: 'Elisa Pagliaris',
    telefonoDirectores: '0412-8616343'
  },

      {
    estado: 'Zulia',
    gerente: 'Marcos Tulio Azuaje Cifuentes',
    correo: 'marcosazuaje279@gmail.com',
    telefono: '0412-6528900',
    direccion: 'EDIFICIO PAULA PIERINA AVENIDA 4 BELLA VISTA CON 67 MUNICIPIO MARACAIBO PARROQUIA CECILIO ACOSTA ESTADO ZULIA',
    directores: 'Randy Rodríguez',
    telefonoDirectores: '0412-9984376'
  },

  







];