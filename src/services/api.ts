import axios from "axios";
import { Stock, Receipt, Center } from "../types/models";

// Base configuration
const API = axios.create({
  baseURL: "https://medstock-backend-1-32pj.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
const ENDPOINTS = {
  centers: "/centers/",
  stocks: "/stocks/",
  receipts: "/receipts/",
};

// Fetch all centers
export const fetchCenters = async (): Promise<Center[]> => {
  const response = await API.get(ENDPOINTS.centers);
  return response.data;
};

// Fetch stock by center and medicine name
export const fetchStock = async (
  centerId?: number,
  search?: string
): Promise<Stock[]> => {
  const params: Record<string, any> = {};
  if (centerId) params.center = centerId;
  if (search) params["medicine__name__icontains"] = search;

  const response = await API.get(ENDPOINTS.stocks, { params });
  return response.data;
};

// Fetch receipts with filters
export const fetchReceipts = async (
  centerId?: number,
  startDate?: string,
  endDate?: string,
  search?: string
): Promise<Receipt[]> => {
  const params: Record<string, any> = {};
  if (centerId) params.center = centerId;
  if (startDate) params["received_date__gte"] = startDate;
  if (endDate) params["received_date__lte"] = endDate;
  if (search) params["medicine__name__icontains"] = search;

  const response = await API.get(ENDPOINTS.receipts, { params });
  return response.data;
};

export default API;
