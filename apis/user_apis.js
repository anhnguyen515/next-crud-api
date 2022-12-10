import axiosClient from "../utils/axiosConfig";

export function getAllUsers(params) {
  return axiosClient.get(`/users`, { params });
}

export function getUserDetail(userId) {
  return axiosClient.get(`/users/${userId}`);
}

export function getUserPosts(userId, params) {
  return axiosClient.get(`/users/${userId}/posts`, { params });
}

export function postUser(body) {
  return axiosClient.post(`/users`, body);
}
