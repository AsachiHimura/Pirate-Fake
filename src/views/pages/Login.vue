<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="neon-title">🔐 Login - Pirataria Fake</h1>

      <input v-model="username" placeholder="Usuário" class="input-neon" />
      <input v-model="password" type="password" placeholder="Senha" class="input-neon" />

      <button class="btn-neon" @click="handleLogin">Entrar</button>

      <p class="login-text">
        Não tem conta?
        <router-link to="/register" class="link-neon">Cadastrar-se</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (!username.value || !password.value) {
    alert('Preencha usuário e senha!')
    return
  }

  const ok = userStore.login({ username: username.value, password: password.value })

  if (ok) {
    // 🔥 garante que o token está no localStorage antes do redirecionamento
    localStorage.setItem('token', userStore.token)
    localStorage.setItem('user', JSON.stringify(userStore.user))

    // ✅ redireciona para /jogos
    router.replace('/jogos')
  } else {
    alert('Usuário ou senha incorretos!')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: url('@/assets/fundo.gif') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: rgba(10, 10, 15, 0.8);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 20px #c000ff, 0 0 40px #00ffcc;
  width: 300px;
}

.neon-title {
  color: #00ffcc;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 10px #00ffcc, 0 0 25px #c000ff;
  margin-bottom: 25px;
}

.input-neon {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background: #0e0e12;
  border: 1px solid #2b2b3d;
  color: #fff;
  border-radius: 6px;
  outline: none;
  transition: 0.3s;
}

.input-neon:focus {
  border-color: #c000ff;
  box-shadow: 0 0 8px #c000ff;
}

.btn-neon {
  width: 100%;
  background: linear-gradient(90deg, #00ffcc, #c000ff);
  border: none;
  padding: 10px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
}

.btn-neon:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #00ffcc, 0 0 25px #c000ff;
}

.login-text {
  margin-top: 15px;
  color: #fff;
}

.link-neon {
  color: #c000ff;
  text-shadow: 0 0 10px #c000ff;
}
</style>
