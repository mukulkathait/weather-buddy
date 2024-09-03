import axios from "axios";
import conf from "../../config.ts";

export default axios.create({
  baseURL: conf.backendURL,
});

export const axiosPrivate = axios.create({
  baseURL: conf.backendURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
