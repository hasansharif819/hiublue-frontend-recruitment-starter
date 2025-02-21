import { AxiosRequestConfig } from "axios";
import api from "./axios";

function fetcher(url: string, options?: AxiosRequestConfig) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  return api.get(url, { ...options, headers }).then((res) => res.data);
}

export { fetcher };
