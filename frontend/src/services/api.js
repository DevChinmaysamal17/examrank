import axios from 'axios'
import { API_BASE_URL } from '../utils/constants.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export const predictJee = (marks) => api.post('/predict/jee', { marks })
export const predictMhtcet = (marks) => api.post('/predict/mhtcet', { marks })
export const predictNeet = (marks) => api.post('/predict/neet', { marks })
export const predictJeeAdv = (marks) => api.post('/predict/jeeadv', { marks })

export default api
