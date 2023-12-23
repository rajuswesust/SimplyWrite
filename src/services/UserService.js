import { axiosInstance } from "./helper";

export const signUp = (user) => {
    return axiosInstance
    .post('/api/auth/register', user)
    .then((response) => response.data);
}

export const loginUser = (loginDetail) => {
    return axiosInstance
      .post("/api/auth/authenticate", loginDetail)
      .then((response) => response.data);
  };

export const getUserById = (userId) => {
    return axiosInstance
    .get(`/api/users/${userId}`)
    .then((response) => response.data);
}