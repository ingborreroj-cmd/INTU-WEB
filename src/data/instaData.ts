// src/data/instaData.ts

export interface InstaPost {
  id: number;
  imageUrl: string; // Ruta de la imagen local
  link: string;     // Enlace directo al post de Instagram
  caption: string;  // Texto descriptivo que aparecerá en la tarjeta
}

/**
 * CONFIGURACIÓN MANUAL DE POSTS DE INSTAGRAM
 * -----------------------------------------
 * Para actualizar la sección "Comunidad", solo debes modificar los objetos de este array.
 */
export const INSTA_POSTS: InstaPost[] = [
  {
    id: 1,
    // 1. RUTA: Asegúrate de que la imagen esté en public/assets/img/
    imageUrl: "/assets/img/jornada-titulos.jpg", 
    // 2. LINK: Pega aquí la URL completa del post de Instagram
    link: "https://www.instagram.com/p/C6I...", 
    // 3. TEXTO: Escribe una frase corta (máximo 3 líneas para mantener el orden visual)
    caption: "Gran jornada de entrega de títulos de tierra urbana."
  },
  {
    id: 2,
    imageUrl: "/assets/img/aragua-gestion.jpg",
    link: "https://www.instagram.com/p/C6H...",
    caption: "Gestión eficiente en el estado Aragua junto al pueblo."
  },
  {
    id: 3,
    imageUrl: "/assets/img/la-guaira-plan.jpg",
    link: "https://www.instagram.com/p/C6G...",
    caption: "Plan de regularización dominical en La Guaira."
  },
  {
    id: 4,
    imageUrl: "/assets/img/institucion.jpg",
    link: "https://www.instagram.com/p/C6F...",
    caption: "Fortaleciendo nuestras sedes regionales para ti."
  },
  {
    id: 5,
    imageUrl: "/assets/img/hero-bg.jpg",
    link: "https://www.instagram.com/p/C6E...",
    caption: "¡Seguimos avanzando en la regularización de la tierra!"
  }
];