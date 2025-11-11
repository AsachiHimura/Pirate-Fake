<template>
  <div class="container">
    <h2>Meus Jogos Alugados</h2>
    <ul>
      <li v-for="g in rentedList" :key="g.id">
        <img :src="g.image" width="40" /> {{ g.title }} — {{ formatPrice(g.price) }}
        <button @click="returnGame(g.id)">Devolver</button>
      </li>
    </ul>
    <div v-if="rentedList.length === 0">Nenhum jogo alugado</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGamesStore } from '@/stores/games'
import { useUserStore } from '@/stores/userStore'

const gamesStore = useGamesStore()
const userStore = useUserStore()

const rentedList = computed(() => gamesStore.rentedGamesList)

const returnGame = (id) => gamesStore.returnGame(id)

const formatPrice = (amt) => {
  const cur = userStore.user?.currency || 'USD'
  if (cur === 'USD') return `$${amt.toFixed(2)}`
  if (cur === 'BRL') return `R$ ${(amt * 5.3).toFixed(2)}`
  return amt
}
</script>
