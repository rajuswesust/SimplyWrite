import axios from 'axios';
import { getToken } from '../auth';

export const BASE_URL='http://localhost:8080';
export const axiosInstance = axios.create({
    baseURL: BASE_URL
})

export const privateAxiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  
  privateAxiosInstance.interceptors.request.use(
    (req) => {

      const token = getToken();
      console.log("token for setting: " + token);
      if(token) {
        console.log("setting token to header: " + token);
        req.headers.Authorization = `Bearer ${token}`;
        console.log(req);
      }
      return req;
    },
    (error) => Promise.reject(error)
  );