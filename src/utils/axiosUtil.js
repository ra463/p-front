import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rentify.adaptable.app",
});

export default axiosInstance;
