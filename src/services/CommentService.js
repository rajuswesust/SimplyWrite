import { axiosInstance, privateAxiosInstance } from "./helper";

export const postComment = (comment, postId) => {
    return privateAxiosInstance.post(`/api/posts/${postId}/comments`, comment);
}

export const getComments = (postId) => {
    return axiosInstance.get(`/api/posts/${postId}/comments`).then(res => res.data);
}