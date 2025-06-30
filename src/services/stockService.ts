// services/stockService.ts
import API from "./api";


export const fetchStocks = async (params?: any) => {
  const res = await API.get("/stocks/", { params });
  return res.data; 
};

export const fetchCenters = async () => {
  const res = await API.get("/centers/");
  return res.data.results;
};


export const fetchMedicines = async () => {
  const res = await API.get("/medicines/");
  return res.data;
};

export const createCenter = async (data: { name: string }) => {
  const res = await API.post("/centers/", data);
  return res.data;
};

export const createMedicine = async (data: { name: string; unit: string }) => {
  const res = await API.post("/medicines/", data);
  return res.data;
};

