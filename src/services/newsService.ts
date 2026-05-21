import { NewsItem, DEFAULT_NEWS } from '../data/newsData';

const STORAGE_KEY = 'intu_web_news_persisted_data';

export const newsService = {
  /**
   * Recupera las noticias desde la persistencia local de forma asíncrona.
   */
  getNews: async (): Promise<NewsItem[]> => {
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
    return new Promise((resolve) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNews));
        resolve(true);
      } catch (error) {
        console.error("Error guardando noticias en el almacenamiento:", error);
        resolve(false);
      }
    });
  }
};