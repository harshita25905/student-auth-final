import axios from 'axios';

// Create an Axios instance pointing to the backend API
const api = axios.create({
  baseURL: 'https://student-auth-3-an4x.onrender.com/api',
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
