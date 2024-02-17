import axios from "axios";
import { getTokenFromStorage } from "./localStorageParser";

const API = axios.create({ baseURL: import.meta.env.VITE_NIX_BACKEND });

API.interceptors.request.use((req) => {
  const token = getTokenFromStorage();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;