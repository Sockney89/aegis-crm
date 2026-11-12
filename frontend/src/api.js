import axios from 'axios'
import { useToastStore } from './stores/toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => {
    if (typeof res.data === 'string' && res.data.includes('<!DOCTYPE')) {
      const toast = useToastStore()
      toast.error('Backend not reachable')
      return Promise.reject(new Error('Backend not reachable'))
    }
    return res
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    const toast = useToastStore()
    const msg = err?.response?.data?.error || err?.message || 'Request failed'
    toast.error(msg)
    return Promise.reject(err)
  }
)

export default api
