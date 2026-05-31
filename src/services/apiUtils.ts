const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '');

export { API };

export const resolveBackendAssetUrl = (path?: string | null): string => {
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
