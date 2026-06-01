import { resolveBackendAssetUrl, API, authHeaders } from './apiUtils';

export interface ModalData {
  id?: number;
  title?: string;
  body?: string;
  backgroundPath?: string;
  active?: boolean;
}

export const modalService = {
  getModal: async (): Promise<ModalData | null> => {
    try {
      const res = await fetch(`${API}/admin/modal`, { credentials: 'include', headers: authHeaders() });
      if (!res.ok) return null;
      const modal = await res.json();
      if (!modal) return null;
      return {
        ...modal,
        backgroundPath: resolveBackendAssetUrl(modal.backgroundPath),
      };
    } catch (err) {
      console.warn('Unable to fetch modal data', err);
      return null;
    }
  },

  saveModal: async (data: FormData): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/admin/modal`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders(),
        body: data,
      });
      return res.ok;
    } catch (err) {
      console.error('Error saving modal data', err);
      return false;
    }
  }
};
