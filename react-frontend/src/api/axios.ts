import axios from "axios";

const axiosDf = axios.create({
  baseURL: "http://localhost:5434/api/v1",
  withCredentials: true
});

export default axiosDf;
