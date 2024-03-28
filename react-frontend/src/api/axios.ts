import axios from "axios";

export const mipAPI = axios.create({
  baseURL: "http://localhost:5434/api/v1",
  withCredentials: true
});


