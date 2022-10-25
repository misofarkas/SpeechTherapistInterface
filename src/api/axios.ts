import axios from "axios";
import { useState } from "react"

const instance = axios.create({
  baseURL: "http://172.26.5.2/api",
  headers: {"Content-Type": "application/json",},
  withCredentials: false,
});


instance.interceptors.request.use(
  function (config) {
    //console.log("request config")
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    //console.log("request error")
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log("response")
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //console.log("response error")
    return Promise.reject(error);
  }
);

export default instance;