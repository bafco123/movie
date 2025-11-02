import axios from 'axios';
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://movie-backend-b8zz.onrender.com'
});
export default API;
