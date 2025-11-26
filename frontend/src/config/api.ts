// API configuration
const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment
  ? "http://localhost:5237/api"
  : "/api";

export default API_BASE_URL;
