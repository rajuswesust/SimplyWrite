import { axiosInstance, privateAxiosInstance } from "./helper";

//create post function
export const createPost = (postData, username) => {
    console.log("creating post: ");
    console.log(username);
    console.log(postData);
  return privateAxiosInstance
    .post(`/api/v1/posts`, postData)
    .then((response) => response.data);
};

export const loadAllPosts = (pageNo, pageSize) => {
  return axiosInstance.get(`/api/v1/posts?pageNo=${pageNo}&pageSize=${pageSize}`).then((res) => res.data);
};

//load a post by id
export const loadPost = (id) => {
  console.log("id of the post : " + id);
  return axiosInstance.get(`/api/v1/posts/${id}`).then((res) => res.data);
}

//load all posts of user by id
export function loadPostsByUser(userId) {
  console.log("user id: ", userId);
  return privateAxiosInstance.get(`/api/v1/posts/user/${userId}`).then((res) => res.data);
}

//delete post
export const deletePostById = (postId) => {
  return privateAxiosInstance.delete(`/api/v1/posts/${postId}`).then((res) => res.data);
}

//updatePost
export const updatePost = (post, postId) => {
  console.log("updating post: ", postId);
  console.log(post);
  return privateAxiosInstance.put(`/api/v1/posts/${postId}`, post).then(res => res.data);
}