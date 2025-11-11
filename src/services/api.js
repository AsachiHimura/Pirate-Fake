// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sua-api-aqui.com', // ou localhost para testes
  timeout: 5000,
})

// Interceptor para enviar token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
