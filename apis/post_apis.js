import axios from "axios";
import axiosClient from "../utils/axiosConfig";

export function getPostsListAPI(params) {
  return axiosClient.get(`/posts`, { params });
}
