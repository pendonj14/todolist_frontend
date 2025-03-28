import axios from "axios";
import { ACCESS_TOKEN } from "./Constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backendadet.ddns.net",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      }
    } else {
      console.error("Network error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;