const API: string = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '');
const AUTH_TOKEN_KEY = 'intu_web_admin_token';

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const authHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const resolveBackendAssetUrl = (path?: string | null): string => {
  if (!path) return '';
  const normalized = path.trim();
  
  if (/^https?:\/\//i.test(normalized)) return normalized;
  
  if (normalized.startsWith('/assets/')) {
    return normalized;
  }
  
  if (normalized.startsWith('/')) {
    return `${API}${normalized}`;
  }
  
  return normalized;
};

export { 
  API, 
  AUTH_TOKEN_KEY, 
  getAuthToken, 
  authHeaders, 
  resolveBackendAssetUrl 
};