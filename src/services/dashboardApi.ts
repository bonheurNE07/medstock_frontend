import API from "./api";

export const fetchDashboardData = async () => {
  const res = await API.get("/dashboard/");
  return res.data;
};
