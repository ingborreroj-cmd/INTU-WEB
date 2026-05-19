export interface HeroSlide {
  id: number;
  imageUrl: string;
  label: string;
  caption: string;
}

// Datos iniciales por defecto
export const DEFAULT_SLIDES: HeroSlide[] = [
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

// Función para obtener los slides activos (ya sean los editados o los por defecto)
export const getActiveSlides = (): HeroSlide[] => {
  const savedSlides = localStorage.getItem('intu_hero_slides');
  if (savedSlides) {
    try {
      return JSON.parse(savedSlides);
    } catch (e) {
      return DEFAULT_SLIDES;
    }
  }
  return DEFAULT_SLIDES;
};