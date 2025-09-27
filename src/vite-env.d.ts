/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  // agrega más variables aquí si las usas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
