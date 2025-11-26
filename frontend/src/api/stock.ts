import axios from "axios";
import API_BASE_URL from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getStockSummary = () => api.get("/stock/summary");

export const getCriticalStock = () => api.get("/stock/critical");

export const getStockTurnover = () => api.get("/stock/turnover");

export const getSktAnalysis = () => api.get("/stock/skt");

export const getStockByBrand = () => api.get("/stock/by-brand");

export const getStockByCategory = () => api.get("/stock/by-category");

export const getAllProducts = () => api.get("/stock/products");
