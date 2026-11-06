import { ADMIN_PATH, API, authHeaders, resolveBackendAssetUrl } from './apiUtils';

const parseLogoResponse = async (response: Response): Promise<string | null> => {
  const json = await response.json();
  if (!response.ok) throw new Error(json?.message || 'Error al actualizar el logo.');
  return resolveBackendAssetUrl(json.logoPath) || null;
};

export const siteSettingsService = {
  getNavbarLogo: async (): Promise<string | null> => {
    const response = await fetch(`${API}/site-settings/navbar-logo`);
    return parseLogoResponse(response);
  },

  saveNavbarLogo: async (image: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch(`${API}/${ADMIN_PATH}/site-settings/navbar-logo`, {
      method: 'PUT',
      headers: authHeaders(),
      credentials: 'include',
      body: formData,
    });
    return parseLogoResponse(response);
  },

  removeNavbarLogo: async (): Promise<void> => {
    const formData = new FormData();
    formData.append('remove', 'true');
    const response = await fetch(`${API}/${ADMIN_PATH}/site-settings/navbar-logo`, {
      method: 'PUT',
      headers: authHeaders(),
      credentials: 'include',
      body: formData,
    });
    await parseLogoResponse(response);
  },
};