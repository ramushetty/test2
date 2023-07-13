import axios from 'axios';

// Create an instance of axios with common configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Set the base URL for your backend API
  withCredentials: true,
});

export default api;