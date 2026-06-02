// api/axios.js
import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});