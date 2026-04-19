import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// if token expires, try to refresh it
api.interceptors.response