import axios from "axios";
import type { Stock, Receipt, Center } from "../types/models";

const API = axios.create({
  // baseURL: "https://medstock-backend-1-32pj.onrender.com/api",
  baseURL: "https://medstock-backend-1-32pj.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach access token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // or sessionStorage if you prefer
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchCenters = async (): Promise<Center[]> => {
  const res = await API.get("/centers/");
  return res.data;
};

export const fetchStock = async (
  centerId?: number,
  search?: string
): Promise<Stock[]> => {
  const params: any = {};
  if (centerId) params.center = centerId;
  if (search) params["medicine__name__icontains"] = search;
  const res = await API.get("/stocks/", { params });
  return res.data;
};

export const fetchReceipts = async (
  centerId?: number,
  startDate?: string,
  endDate?: string,
  search?: string
): Promise<Receipt[]> => {
  const params: any = {};
  if (centerId) params.center = centerId;
  if (startDate) params["received_date__gte"] = startDate;
  if (endDate) params["received_date__lte"] = endDate;
  if (search) params["medicine__name__icontains"] = search;
  const res = await API.get("/receipts/", { params });
  return res.data;
};

export default API;
