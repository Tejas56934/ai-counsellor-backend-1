// src/api.js
import axios from 'axios';

// Use your Render backend URL for production
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api'
  : 'https://ai-counsellor-backend-1.onrender.com/api';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://ai-counsellor-backend-1.onrender.com/api',
  timeout: 30000,
});

// Optional: response interceptor for global errors
api.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err.response?.data || err.message);
  }
);

// -------------------
// AI Chat Endpoint
// -------------------
export async function askChat(message, context = 'Home') {
  const payload = { message, context };
  const resp = await api.post('/chat/ask', payload);
  return resp.data;
}

// -------------------
// Admission Submission
// -------------------
export async function submitAdmission(formData) {
  const resp = await api.post('/admission/submit', formData);
  return resp.data;
}

export default api;