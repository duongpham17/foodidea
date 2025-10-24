import axios from 'axios';
import { data } from '@data/business';
import { user_authentication } from '@localstorage';

const DEVELOPMENT_URL = "http://localhost:3000";
const PRODUCTION_URL= data.url;

const url = process.env.NODE_ENV === "development" ? DEVELOPMENT_URL : PRODUCTION_URL;

const API = axios.create({
  baseURL: `${url}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const user = user_authentication.get() || {};
    if (user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    } else {
      delete config.headers["Authorization"];
    }
  }
  return config;
});

export const api = API

export default API;
