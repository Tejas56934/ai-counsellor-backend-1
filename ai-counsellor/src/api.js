// src/api.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://ai-counsellor-backend-1.onrender.com', // ✅ Use Render URL
  timeout: 30000,
});

// Global error handling
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
