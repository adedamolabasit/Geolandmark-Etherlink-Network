import axios from "../axios";

export const registerLand = (allData) => {
  return axios.post("/lands/registry", allData);
};
export const getRegisteredLands = () => {
  return axios.get(`lands/registry`);
};
export const getSingleRegisteredLands = (planId) => {
  return axios.get(`lands/registry/${planId}`);
};

export const uploadImages = (formData) => {
  return axios.post(`lands/uploadImages`,formData);
};