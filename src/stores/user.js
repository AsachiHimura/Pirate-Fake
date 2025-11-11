import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)
  const error = ref('')

  const login = async ({ username, password }) => {
    try {
      const res = await api.post('/login', { username, password })
      token.value = res.data.token
      user.value = res.data.user
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao logar'
      return false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const register = async ({ username, password, currency }) => {
    try {
      await api.post('/register', { username, password, currency })
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao registrar'
      return false
    }
  }

  return { user, token, error, login, logout, register }
})
