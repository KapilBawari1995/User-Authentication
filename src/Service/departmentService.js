import axiosInstance from "../app/api/axiosInstance";
import { API_ENDPOINTS } from "../app/api/apiEndpoints";

export const getDepartmentsApi = () => {
  return axiosInstance.get(API_ENDPOINTS.GET_DEPARTMENTS);
};