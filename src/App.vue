<template>
  <div class="app-wrapper" :style="bgStyle">
    <header class="main-header">
      <h1 class="logo">🎮 Pirataria Fake</h1>
      <nav class="menu">
        <router-link to="/jogos" class="neon-link">Jogos</router-link>
        <router-link to="/jogos/alugados" class="neon-link">Alugados</router-link>
        <router-link to="/login" class="neon-link">Login</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import fundo from '@/assets/fundo.gif'

// estilo dinâmico pro fundo
const bgStyle = {
  backgroundImage: `url(${fundo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  color: '#e0e0e0'
}
</script>

<style>
/* === Corpo e Layout === */
body {
  margin: 0;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  overflow-x: hidden;
}

.app-wrapper {
  backdrop-filter: blur(8px) brightness(0.5);
  min-height: 100vh;
}

/* === HEADER === */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(10, 10, 20, 0.7);
  padding: 15px 30px;
  border-bottom: 1px solid #2b2b3d;
  box-shadow: 0 0 20px rgba(192, 0, 255, 0.3);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  color: #c000ff;
  text-shadow: 0 0 12px #a000ff, 0 0 20px #00ffcc;
  font-weight: 800;
  letter-spacing: 1px;
  transition: 0.3s;
}

.logo:hover {
  text-shadow: 0 0 20px #c000ff, 0 0 40px #00ffcc;
  transform: scale(1.05);
}

/* === NAV MENU === */
.menu {
  display: flex;
  gap: 20px;
}

.neon-link {
  text-decoration: none;
  color: #00ffcc;
  text-shadow: 0 0 6px #00ffcc;
  font-weight: 600;
  transition: all 0.3s;
}

.neon-link:hover {
  color: #c000ff;
  text-shadow: 0 0 10px #c000ff, 0 0 20px #00ffcc;
  transform: scale(1.1);
}

/* === CONTEÚDO === */
.main-content {
  padding: 25px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
