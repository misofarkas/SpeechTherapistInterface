import axios from "axios";

// Axios configuration
const instance = axios.create({
  baseURL: "http://172.26.5.2/api",
  headers: {"Content-Type": "application/json",},
  withCredentials: false,
  timeout: 5000,
});

export default instance;