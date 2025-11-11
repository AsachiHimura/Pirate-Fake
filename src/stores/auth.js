// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const currency = ref('USD')
  const token = ref(null)

  // Carrega do localStorage ao iniciar
  const loadFromStorage = () => {
    token.value = localStorage.getItem('token')
    user.value = localStorage.getItem('user')
    currency.value = localStorage.getItem('currency') || 'USD'
  }

  const login = ({ username, currency: selectedCurrency }) => {
    token.value = 'meu-token-fake'
    user.value = username
    currency.value = selectedCurrency
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', user.value)
    localStorage.setItem('currency', currency.value)
  }

  const logout = () => {
    token.value = null
    user.value = null
    currency.value = 'USD'
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currency')
  }

  return { user, currency, token, login, logout, loadFromStorage }
})
