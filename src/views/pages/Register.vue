<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="neon-title">⚙️ Registro - Pirataria Fake</h1>

      <input v-model="username" placeholder="Usuário" class="input-neon" />
      <input v-model="password" type="password" placeholder="Senha" class="input-neon" />

      <select v-model="currency" class="input-neon">
        <option value="BRL">Real (R$)</option>
        <option value="USD">Dólar ($)</option>
      </select>

      <button class="btn-neon" @click="registerUser">Cadastrar</button>

      <p class="register-text">
        Já tem conta?
        <router-link to="/login" class="link-neon">Entrar</router-link>
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
const currency = ref('BRL')

const registerUser = () => {
  if (!username.value || !password.value) {
    alert('Preencha todos os campos!')
    return
  }

  const { ok, message } = userStore.register({
    username: username.value,
    password: password.value,
    currency: currency.value,
  })

  if (ok) {
    alert('Usuário registrado com sucesso! Faça login.')
    router.push('/login')
  } else {
    alert(message)
  }
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  background: url('@/assets/fundo.gif') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-box {
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

.register-text {
  margin-top: 15px;
  color: #fff;
}

.link-neon {
  color: #c000ff;
  text-shadow: 0 0 10px #c000ff;
}
</style>
