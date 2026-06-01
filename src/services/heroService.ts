import { HeroSlide, DEFAULT_SLIDES } from '../data/heroSlides';
import { resolveBackendAssetUrl, API } from './apiUtils';

const STORAGE_KEY = 'intu_web_hero_persisted_data';

export const heroService = {
  /**
   * Recupera las diapositivas desde la persistencia de forma asíncrona.
   * Incluye protección contra corrupción de datos JSON.
   */
  getSlides: async (): Promise<HeroSlide[]> => {
    try {
      const res = await fetch(`${API}/admin/hero`, { credentials: 'include', headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.map((item: any) => ({
          id: item.id,
          imageUrl: resolveBackendAssetUrl(item.imagePath) || '',
          label: item.title || '',
          caption: item.subtitle || ''
        }));
      }
    } catch (err) {
      console.warn('Backend hero fetch failed, falling back to localStorage', err);
    }

    return new Promise((resolve) => {
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
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
      resolve(DEFAULT_SLIDES);
    });
  },

  /**
   * Guarda globalmente el nuevo estado del carrusel en el almacenamiento interno.
   */
  saveSlides: async (updatedSlides: HeroSlide[]): Promise<boolean> => {
    // Try backend bulk save first (requires admin auth and will accept base64 images)
    try {
      const payload = updatedSlides.map((s, idx) => ({
      title: s.label,
      subtitle: s.caption,
      imageData: s.imageUrl,
      order: idx + 1,
      active: true,
    }));
      const res = await fetch(`${API}/admin/hero/bulk`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch (err) {
      console.warn('Backend hero bulk save failed, falling back to localStorage', err);
    }
    // Fallback to localStorage
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