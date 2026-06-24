import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://orbita-backend-e320.onrender.com/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me')
};

export const uploadAPI = {
  upload: (formData) => API.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: () => API.get('/uploads'),
  get: (id) => API.get(`/uploads/${id}`)
};

export const itineraryAPI = {
  create: (data) => API.post('/itineraries', data),
  getAll: () => API.get('/itineraries'),
  get: (id) => API.get(`/itineraries/${id}`),
  delete: (id) => API.delete(`/itineraries/${id}`),
  getShared: (shareId) => API.get(`/itineraries/shared/${shareId}`)
};

export default API;
