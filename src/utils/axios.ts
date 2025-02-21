import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "https://dummy-1.hiublue.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
