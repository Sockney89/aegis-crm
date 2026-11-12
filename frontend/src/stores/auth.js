import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null
    try {
      const raw = localStorage.getItem('user')
      if (raw && raw !== 'undefined' && raw !== 'null') user = JSON.parse(raw)
    } catch (e) {
      user = null
    }
    return {
      token: localStorage.getItem('token') || '',
      user,
    }
  },
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    async register(email, password, name) {
      const { data } = await api.post('/auth/register', { email, password, name })
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
      return data
    },
    async login(email, password) {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
      return data
    },
    async forgot(email) {
      const { data } = await api.post('/auth/forgot', { email })
      return data
    },
    async reset(token, password) {
      const { data } = await api.post('/auth/reset', { token, password })
      return data
    },
    async me() {
      const { data } = await api.get('/auth/me')
      this.user = data.user
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
      return data
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
