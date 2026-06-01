declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpg";

interface ImportMetaEnv {
  /** Base URL of the backend API (e.g. http://localhost:4000) */
  readonly VITE_API_URL: string;
  /** Optional map API key or other Vite-prefixed env vars */
  readonly VITE_MAP_API_KEY?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}