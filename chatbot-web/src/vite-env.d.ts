/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Añade aquí otras variables que tengas en tu .env
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}