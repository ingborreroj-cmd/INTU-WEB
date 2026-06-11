import { NewsItem, DEFAULT_NEWS } from '../data/newsData';
import { resolveBackendAssetUrl, API, authHeaders } from './apiUtils';

const STORAGE_KEY = 'intu_web_news_persisted_data';
const OFFICIAL_STORAGE_KEY = 'intu_web_official_news';

export const newsService = {
  /**
   * Recupera las noticias desde la persistencia local de forma asíncrona.
   */
  getNews: async (): Promise<NewsItem[]> => {
    // Try backend first
    try {
      const res = await fetch(`${API}/admin/news?section=news`, { credentials: 'include', headers: authHeaders() });
      if (res.ok) {
        const j = await res.json();
        return j.map((item: any) => ({
          id: item.id,
          image: resolveBackendAssetUrl(item.imagePath) || '',
          date: item.date || item.published || '',
          title: item.title || '',
          source: item.source || '',
          url: item.url || '#',
          content: item.content || '',
          createdBy: item.createdBy || undefined,
        }));
      }
    } catch (err) {
      console.warn('Backend news fetch failed, falling back to localStorage', err);
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
            console.error("JSON corrupto en noticias, restaurando prensa institucional:", parseError);
          }
        }
      } catch (error) {
        console.error("Error leyendo almacenamiento de prensa local:", error);
      }
      resolve(DEFAULT_NEWS);
    });
  },

  /**
   * Persiste de forma global la nueva lista de noticias editadas.
   */
  saveNews: async (updatedNews: NewsItem[]): Promise<boolean> => {
    // Try backend bulk save
    try {
      const payload = updatedNews.map(n => ({
        title: n.title,
        content: n.content || '',
        imageData: n.image,
        date: n.date,
        source: n.source,
        url: n.url,
        createdBy: (n as any).createdBy || undefined,
        published: n.date,
        active: true,
      }));
      const res = await fetch(`${API}/admin/news/bulk?section=news`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch (err) {
      console.warn('Backend news bulk save failed, falling back to localStorage', err);
    }

    return new Promise((resolve) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNews));
        resolve(true);
      } catch (error) {
        console.error("Error guardando noticias en el almacenamiento:", error);
        resolve(false);
      }
    });
  },

  /**
   * Recupera las noticias oficiales locales desde la persistencia local.
   */
  getOfficialNews: async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch(`${API}/admin/news?section=official`, { credentials: 'include', headers: authHeaders() });
      if (res.ok) {
        const items = await res.json();
        return items.map((item: any) => ({
          id: item.id,
          image: resolveBackendAssetUrl(item.imagePath) || '',
          date: item.date || item.published || '',
          title: item.title || '',
          source: item.source || '',
          url: item.url || '#',
          content: item.content || '',
          createdBy: item.createdBy || undefined,
        }));
      }
    } catch (err) {
      console.warn('Backend official news fetch failed, falling back to localStorage', err);
    }

    return new Promise((resolve) => {
      try {
        const localData = localStorage.getItem(OFFICIAL_STORAGE_KEY);
        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            resolve(parsedData);
            return;
          } catch (parseError) {
            console.error("JSON corrupto en noticias oficiales, restaurando noticias oficiales vacías:", parseError);
          }
        }
      } catch (error) {
        console.error("Error leyendo almacenamiento de noticias oficiales:", error);
      }
      resolve([]);
    });
  },

  /**
   * Persiste las noticias oficiales locales.
   */
  saveOfficialNews: async (updatedNews: NewsItem[]): Promise<boolean> => {
    try {
      const payload = updatedNews.map(n => ({
        title: n.title,
        content: n.content || '',
        imageData: n.image,
        date: n.date,
        source: n.source,
        url: n.url,
        createdBy: (n as any).createdBy || undefined,
        published: n.date,
        active: true,
      }));
      const res = await fetch(`${API}/admin/news/bulk?section=official`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch (err) {
      console.warn('Backend official news bulk save failed, falling back to localStorage', err);
    }

    return new Promise((resolve) => {
      try {
        localStorage.setItem(OFFICIAL_STORAGE_KEY, JSON.stringify(updatedNews));
        resolve(true);
      } catch (error) {
        console.error("Error guardando noticias oficiales en el almacenamiento:", error);
        resolve(false);
      }
    });
  }
};