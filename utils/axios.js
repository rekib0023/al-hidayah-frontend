import axios from "axios";
import { BACKEND_ENDPOINT } from "./constants";

export default axios.create({
  baseURL: BACKEND_ENDPOINT,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_ENDPOINT,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
