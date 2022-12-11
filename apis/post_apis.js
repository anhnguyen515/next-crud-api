import axiosClient from "../utils/axiosConfig";

export function getAllPosts(params) {
  return axiosClient.get(`/posts`, { params });
}

export function getPostDetail(postId) {
  return axiosClient.get(`/posts/${postId}`);
}

export function postPost(body) {
  return axiosClient.post(`/posts`, body);
}

export function editPost(postId, body) {
  return axiosClient.put(`/posts/${postId}`, body);
}

export function deletePost(postId) {
  return axiosClient.delete(`/posts/${postId}`);
}
