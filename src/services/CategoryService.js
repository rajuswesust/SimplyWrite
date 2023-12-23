import { axiosInstance } from "./helper";

export const loadAllCategories = () => {
  return axiosInstance.get(`/api/v1/categories`).then((respone) => {
    return respone.data;
  });
};