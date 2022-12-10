import axiosClient from "../utils/axiosConfig";

export function getAllUsers(params) {
  return axiosClient.get(`/users`, { params });
}

export function postUser(body) {
  return axiosClient.post(`/users`, body);
}
