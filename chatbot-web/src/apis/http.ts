import axios from "axios";

// ✅ Centralizamos la URL base. 
// Nota: Usar fallback es excelente para desarrollo local.
const PATH_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const http = axios.create({
  baseURL: PATH_BASE,
  timeout: 10000, // 🕒 10 segundos (SonarQube: Evita DoS y peticiones infinitas)
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

/**
 * ✅ Tip de SonarQube: Interceptores
 * Si en el futuro añades JWT o necesitas manejar errores 401 globalmente,
 * los interceptores se añaden aquí para no ensuciar los componentes.
 */
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Loguear errores de forma centralizada
    console.error("[HTTP Error]:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);