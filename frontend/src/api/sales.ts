import axios from "axios";
import API_BASE_URL from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSalesSummary = (startDate?: string, endDate?: string) =>
  api.get("/sales/summary", { params: { startDate, endDate } });

export const getSalesByBrand = (startDate?: string, endDate?: string) =>
  api.get("/sales/by-brand", { params: { startDate, endDate } });

export const getSalesByCategory = (startDate?: string, endDate?: string) =>
  api.get("/sales/by-category", { params: { startDate, endDate } });

export const getSalesByCustomer = (startDate?: string, endDate?: string) =>
  api.get("/sales/by-customer", { params: { startDate, endDate } });

export const getSalesByChannel = (startDate?: string, endDate?: string) =>
  api.get("/sales/by-channel", { params: { startDate, endDate } });

export const getMonthlySales = (year?: number) =>
  api.get("/sales/monthly", { params: { year } });

export const getTopSellingProducts = (
  count?: number,
  startDate?: string,
  endDate?: string
) => api.get("/sales/top-products", { params: { count, startDate, endDate } });
