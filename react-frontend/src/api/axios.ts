import axios from 'axios';

const axiosDf = axios.create({
  // baseURL: 'https://jira-clone.onrender.com/',
  baseURL: 'http://localhost:3009/',
  withCredentials: true,
});

export default axiosDf;
