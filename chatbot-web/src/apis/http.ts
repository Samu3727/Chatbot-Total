import axios from "axios";

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
};

if (!API_CONFIG.baseUrl) {
  throw new Error(
    "❌ ERROR DE CONFIGURACIÓN: VITE_API_BASE_URL no está definida en el archivo .env"
  );
}

export const http = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[HTTP Error]:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);