import axiosClient from "../utils/axiosConfig";

export function getAllUsers() {
  return axiosClient.get(`/users`);
}

export function postUser(body) {
  return axiosClient.post(`/users`, body);
}
