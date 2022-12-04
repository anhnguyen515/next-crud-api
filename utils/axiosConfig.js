import axios from "axios";
import { API_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: API_URL + `/api`,
  xsrfCookieName: "csrftoken",
  withCredentials: true,
  xsrfHeaderName: "X-CSRFToken",
});

export default axiosClient;
