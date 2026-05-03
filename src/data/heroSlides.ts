// src/data/heroSlides.ts

export interface HeroSlide {
  id: number;
  imageUrl: string;      // Ruta de la imagen visible en el hero
  label: string;         // Texto principal que puede cambiar el usuario
  caption: string;       // Texto secundario para el slide
}

/**
 * EDITA AQUÍ LAS IMÁGENES DEL HERO
 * --------------------------------
 * Para cambiar el carrusel, agrega, elimina o modifica items en este array.
 * Solo se requieren rutas locales dentro de public/assets/img/ o en la carpeta /assets/img/.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    imageUrl: '/assets/img/hero-bg.jpg',
    label: 'Regularización y justicia para el pueblo venezolano',
    caption: 'INTU trabaja para garantizar seguridad jurídica y acceso al suelo urbano para todas las familias.'
  },
  {
    id: 2,
    imageUrl: '/assets/img/institucion.jpg',
    label: 'Fortaleciendo a nuestras comunidades',
    caption: 'Impulsamos proyectos integrales de tierra urbana con transparencia y acompañamiento social.'
  },
  {
    id: 3,
    imageUrl: '/assets/img/jornada-titulos.jpg',
    label: 'Más títulos, más derechos',
    caption: 'Avanzamos en la entrega de títulos y la regularización de asentamientos urbanos.'
  }
];
