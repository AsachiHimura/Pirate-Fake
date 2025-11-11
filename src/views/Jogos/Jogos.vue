<template>
  <div class="games-container">
    <header class="header">
      <h1 class="neon-title">🎮 Biblioteca</h1>
      <div class="header-actions">
        <button
          v-if="userStore.user?.isAdmin"
          class="btn small add"
          @click="openAddModal"
        >
          ➕ Adicionar Jogo
        </button>
        <button class="btn neon-outline" @click="userStore.logout">Sair</button>
      </div>
    </header>

    <div v-if="loading" class="loading">Carregando...</div>

    <div v-else class="games-grid">
      <div v-for="game in gamesStore.games" :key="game.id" class="game-card">
        <img :src="game.image" alt="Capa do jogo" class="cover" />
        <div class="info">
          <h3>{{ game.title }}</h3>
          <p>{{ game.platform }}</p>
          <p class="genre">{{ game.genre }}</p>
          <p class="price">{{ formatPrice(game.price) }}</p>
          <p class="status">
            {{ gamesStore.rentedGames.includes(game.id)
              ? '🎮 Alugado'
              : game.available
              ? '🟢 Disponível'
              : '🔴 Indisponível' }}
          </p>
        </div>

        <div class="actions">
          <button
            v-if="!userStore.user?.isAdmin && !gamesStore.rentedGames.includes(game.id)"
            class="btn small neon"
            @click="gamesStore.rentGame(game.id)"
            :disabled="!game.available"
          >
            Alugar
          </button>

          <button
            v-if="!userStore.user?.isAdmin && gamesStore.rentedGames.includes(game.id)"
            class="btn small red"
            @click="gamesStore.returnGame(game.id)"
          >
            Devolver
          </button>

          <template v-if="userStore.user?.isAdmin">
            <button class="btn small edit" @click="openEditModal(game)">Editar</button>
            <button class="btn small remove" @click="removeGame(game.id)">Remover</button>
            <button
              class="btn small toggle"
              @click="toggleAvailable(game)"
            >
              {{ game.available ? 'Tornar Indisponível' : 'Tornar Disponível' }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingGame ? 'Editar Jogo' : 'Adicionar Jogo' }}</h2>
        <form @submit.prevent="saveGame">
          <input v-model="form.title" placeholder="Título" required />
          <input v-model="form.platform" placeholder="Plataforma" required />
          <input v-model="form.genre" placeholder="Gênero" required />
          <input v-model.number="form.price" type="number" step="0.01" placeholder="Preço" required />
          <input v-model="form.image" placeholder="URL da Imagem" required />
          <div class="modal-actions">
            <button type="submit" class="btn neon">{{ editingGame ? 'Salvar' : 'Adicionar' }}</button>
            <button type="button" class="btn red" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useGamesStore } from '@/stores/games'
import { useUserStore } from '@/stores/userStore'

const gamesStore = useGamesStore()
const userStore = useUserStore()
const loading = ref(true)

// Modal
const modalOpen = ref(false)
const editingGame = ref(null)
const form = reactive({
  id: null,
  title: '',
  platform: '',
  genre: '',
  price: 0,
  image: '',
  available: true
})

// A correção anterior foi mantida: onMounted não é async e a chamada fetchGames foi removida.
onMounted(() => {
  loading.value = false
})

const formatPrice = (price) => `R$ ${price.toFixed(2)}`

// Modal functions
const openAddModal = () => {
  editingGame.value = null
  Object.assign(form, { id: null, title: '', platform: '', genre: '', price: 0, image: '', available: true })
  modalOpen.value = true
}

const openEditModal = (game) => {
  editingGame.value = game
  Object.assign(form, game)
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const saveGame = () => {
  if (editingGame.value) {
    Object.assign(editingGame.value, form)
  } else {
    gamesStore.addGame({ ...form })
  }
  gamesStore.saveGames()
  closeModal()
}

// Admin functions
const removeGame = (id) => {
  if (confirm('Tem certeza que deseja remover este jogo?')) {
    gamesStore.removeGame(id)
  }
}

const toggleAvailable = (game) => {
  game.available = !game.available
  gamesStore.saveGames()
}
</script>

<style scoped>
.games-container {
  min-height: 100vh;
  background: url('@/assets/fundo.gif') center/cover no-repeat;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.neon-title {
  color: #00ffcc;
  text-shadow: 0 0 10px #00ffcc, 0 0 25px #c000ff;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
}

.game-card {
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid #2b2b3d;
  border-radius: 12px;
  box-shadow: 0 0 15px #c000ff33;
  overflow: hidden;
  transition: transform 0.3s;
}

.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #c000ff, 0 0 40px #00ffcc;
}

.cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.info {
  padding: 10px;
  text-align: center;
}

.genre {
  color: #00ffcc;
  font-size: 0.9em;
}

.price {
  color: #c000ff;
  font-weight: bold;
}

.status {
  margin-top: 5px;
  font-size: 0.9em;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid #c000ff;
  color: #c000ff;
  background: transparent;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #c000ff;
  color: #000;
  box-shadow: 0 0 10px #c000ff;
}

.btn.red {
  border-color: #ff0044;
  color: #ff0044;
}

.btn.red:hover {
  background: #ff0044;
  color: #fff;
}

.btn.neon {
  background: linear-gradient(90deg, #c000ff, #00ffcc);
  border: none;
  color: #000;
  box-shadow: 0 0 10px #00ffcc, 0 0 15px #c000ff;
}

.btn.neon-outline {
  border: 1px solid #00ffcc;
  color: #00ffcc;
}

.btn.edit {
  border-color: #00ffcc;
  color: #00ffcc;
}

.btn.edit:hover {
  background: #00ffcc;
  color: #000;
}

.btn.remove {
  border-color: #ff0044;
  color: #ff0044;
}

.btn.remove:hover {
  background: #ff0044;
  color: #fff;
}

.btn.toggle {
  border-color: #ffaa00;
  color: #ffaa00;
}

.btn.toggle:hover {
  background: #ffaa00;
  color: #000;
}

.btn.add {
  border-color: #00ffcc;
  color: #00ffcc;
}

.btn.add:hover {
  background: #00ffcc;
  color: #000;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #111;
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
}

.modal input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #222;
  color: #fff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>