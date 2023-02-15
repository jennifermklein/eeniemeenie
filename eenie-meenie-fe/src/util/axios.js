import axios from "axios";
import { API_URL } from "../constants";

const baseURL = API_URL;
const getAuthToken = () => `TOKEN ${localStorage.getItem("token")}`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: getAuthToken(),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
