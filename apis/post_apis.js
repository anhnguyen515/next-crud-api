import axiosClient from "../utils/axiosConfig";

export function getAllPosts() {
  return axiosClient.get(`/posts`);
}

export function postPost(body) {
  return axiosClient.post(`/posts`, body);
}
