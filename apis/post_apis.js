import axiosClient from "../utils/axiosConfig";

export function getAllPosts(params) {
  return axiosClient.get(`/posts`, { params });
}

export function postPost(body) {
  return axiosClient.post(`/posts`, body);
}
