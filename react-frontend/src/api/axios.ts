import axios from 'axios';

const axiosDf = axios.create({
  baseURL: 'http://localhost:3008/',
  withCredentials: true,
});

export default axiosDf;
