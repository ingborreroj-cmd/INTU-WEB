declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpg";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}