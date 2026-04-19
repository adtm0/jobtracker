import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// attach token to every request
api.interceptors.request.use()