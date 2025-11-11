import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)

  // 🔒 Garante que o admin (ysfolaku) exista e esteja atualizado
  const existingAdmin = users.value.find(u => u.username === 'ysfolaku')
  if (!existingAdmin) {
    users.value.push({ username: 'ysfolaku', password: '1967', currency: 'USD', isAdmin: true })
    localStorage.setItem('users', JSON.stringify(users.value))
  } else {
    existingAdmin.password = '1967'
    existingAdmin.currency = 'USD'
    existingAdmin.isAdmin = true
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  // 🔐 Login
  const login = ({ username, password }) => {
    const found = users.value.find(u => u.username === username && u.password === password)
    if (found) {
      const isAdmin = !!found.isAdmin
      user.value = { username: found.username, currency: found.currency, isAdmin }
      token.value = 'meu-token-fake'
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', token.value)
      return true
    }
    return false
  }

  // 🚪 Logout
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // força a navegação de volta para o login
    window.location.hash = '#/login'
  }

  // 🧾 Registro de novos usuários
  const register = ({ username, password, currency }) => {
    if (!username || !password) return { ok: false, message: 'Campos vazios' }
    if (users.value.some(u => u.username === username)) return { ok: false, message: 'Usuário já existe' }

    users.value.push({ username, password, currency, isAdmin: false })
    localStorage.setItem('users', JSON.stringify(users.value))
    return { ok: true }
  }

  return { users, user, token, login, logout, register }
})
