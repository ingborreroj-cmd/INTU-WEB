import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';

const STORAGE_KEY = 'intu_web_hero_persisted_data';

export const heroService = {
  /**
   * Recupera las diapositivas desde la persistencia de forma asíncrona.
   * Incluye protección contra corrupción de datos JSON.
   */
  getSlides: async (): Promise<HeroSlide[]> => {
    return new Promise((resolve) => {
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
          // Protegemos el parseo para evitar promesas colgadas si el JSON se corrompe
          try {
            const parsedData = JSON.parse(localData);
            resolve(parsedData);
            return;
          } catch (parseError) {
            console.error("JSON corrupto en localStorage, restaurando valores base:", parseError);
          }
        }
      } catch (error) {
        console.error("Error accediendo al almacenamiento local del navegador:", error);
      }
      // Si falla el almacenamiento o el JSON está corrupto, devolvemos la configuración base oficial
      resolve(DEFAULT_SLIDES);
    });
  },

  /**
   * Guarda globalmente el nuevo estado del carrusel en el almacenamiento interno.
   */
  saveSlides: async (updatedSlides: HeroSlide[]): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlides));
        resolve(true);
      } catch (error) {
        console.error("Error de escritura en el almacenamiento local:", error);
        resolve(false);
      }
    });
  }
};