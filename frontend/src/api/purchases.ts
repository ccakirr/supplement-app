import axios from "axios";
import API_BASE_URL from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTotalPurchases = (startDate?: string, endDate?: string) =>
  api.get("/purchase/total", { params: { startDate, endDate } });

export const getPurchaseSummary = (startDate?: string, endDate?: string) =>
  api.get("/purchase/summary", { params: { startDate, endDate } });

export const getPurchasesByBrand = (startDate?: string, endDate?: string) =>
  api.get("/purchase/by-brand", { params: { startDate, endDate } });

export const getPurchasesByCategory = (startDate?: string, endDate?: string) =>
  api.get("/purchase/by-category", { params: { startDate, endDate } });

export const getPurchasesBySupplier = (startDate?: string, endDate?: string) =>
  api.get("/purchase/by-supplier", { params: { startDate, endDate } });

export const getMonthlyPurchases = (year?: number) =>
  api.get("/purchase/monthly", { params: { year } });

export const getTopPurchasedProducts = (
  count?: number,
  startDate?: string,
  endDate?: string
) =>
  api.get("/purchase/top-products", { params: { count, startDate, endDate } });
