export const normalizeUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return undefined;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) return trimmed;
  if (/^\/\//.test(trimmed)) return `https:${trimmed}`;
  if (/^[^\/\s]+\.[^\/\s]+/.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
};
