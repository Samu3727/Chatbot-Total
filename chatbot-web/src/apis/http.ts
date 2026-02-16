import axios from "axios";

const PATH_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const http = axios.create({
  baseURL: PATH_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});