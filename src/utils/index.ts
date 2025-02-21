import { AxiosRequestConfig } from "axios";
import api from "./axios";

function fetcher(url: string, options?: AxiosRequestConfig) {
  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Set default headers
  const headers = {
    "Content-Type": "application/json", // Add Content-Type header
    ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
    ...options?.headers, // Merge with any headers passed in options
  };

  // Make the request with the updated headers
  return api.get(url, { ...options, headers }).then((res) => res.data);
}

export { fetcher };
