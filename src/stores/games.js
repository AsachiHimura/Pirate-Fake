// src/stores/games.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGamesStore = defineStore('games', () => {
  // Carrega do localStorage ou usa lista padrão
  const games = ref(
    JSON.parse(localStorage.getItem('games')) || [
      { id: 1, title: 'Persona 5 Royal', platform: 'PS4, PS5, Switch, PC, Xbox', genre: 'RPG, JRPG de Turnos', price: 59.99, available: true, image: 'https://www.adrenaline.com.br/wp-content/uploads/2023/07/persona-5-royal-capa.jpg' },
      { id: 2, title: 'Hollow Knight', platform: 'PC, PS4, Xbox One, Switch', genre: 'Ação-Aventura, Metroidvania', price: 14.99, available: true, image: 'https://preview.redd.it/how-would-you-guys-react-if-a-collab-with-hollow-knight-v0-w20c6qvta4cd1.jpg?width=274&format=pjpg&auto=webp&s=c20b8268e1fe78cb964ab7634a32f1924b44ac8e' },
      { id: 3, title: 'Outer Wilds', platform: 'PC, PS4, PS5, Xbox, Switch', genre: 'Mistério, Aventura, Exploração', price: 29.99, available: true, image: 'https://images.nintendolife.com/62a79995ed766/outer-wilds-echoes-of-the-eye-cover.cover_large.jpg' },
      { id: 4, title: 'Cyberpunk 2077', platform: 'PC, PS5, Xbox Series X/S', genre: 'RPG de Ação, Mundo Aberto', price: 39.99, available: true, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg' },
      { id: 5, title: 'Nier Automata', platform: 'PC, PS4, Xbox One, Switch', genre: 'RPG de Ação, Hack and Slash', price: 34.99, available: true, image: 'https://cdn.akamai.steamstatic.com/steam/apps/524220/header.jpg' },
      { id: 6, title: 'Sekiro: Shadows Die Twice', platform: 'PS4, Xbox One, PC', genre: 'Ação, Soulslike', price: 49.99, available: true, image: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg' },
      { id: 7, title: 'Outlast 2', platform: 'PC, PS4, Xbox One, Switch', genre: 'Survival Horror, Terror', price: 9.99, available: true, image: 'https://image.api.playstation.com/cdn/UP2113/CUSA06623_00/5vXtP0O5fmnnyrNnWAinTz57d04szG3b.png?w=440' },
      { id: 8, title: 'The Legend Of Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', genre: 'Ação-Aventura, Mundo Aberto', price: 69.99, available: true, image: 'https://s2-techtudo.glbimg.com/62dK5_WSDBQiADQC4Rhrjdid3Ro=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/K/L/WNBAzZSzmnVK9C54hfHg/the-legend-of-zelda-tears-of-the-kingdom-nintendo-switch.jpg' },
      { id: 9, title: 'Clair Obscur: Expedition 33', platform: 'PC, PS5, Xbox Series X/S', genre: 'RPG de Turnos', price: 59.99, available: true, image: 'https://sm.ign.com/t/ign_br/cover/c/clair-obsc/clair-obscur-expedition-33_3428.600.jpg' },
      { id: 10, title: 'Bayonetta 2', platform: 'Nintendo Switch', genre: 'Ação, Hack and Slash', price: 49.99, available: true, image: 'https://assets-prd.ignimgs.com/2025/11/06/55-1762429398357.jpg?crop=1%3A1&width=256&format=jpg&auto=webp&quality=80' },
      { id: 11, title: 'DMC HD Collection', platform: 'PC, PS4, Xbox One, PS3, Xbox 360', genre: 'Ação, Hack and Slash', price: 29.99, available: true, image: 'https://www.adrenaline.com.br/wp-content/uploads/2023/07/devil-may-cry-hd-collection-capa.jpg' },
      { id: 12, title: 'Devil May Cry 5', platform: 'PC, PS4, PS5, Xbox One, Series X/S', genre: 'Ação, Hack and Slash', price: 59.99, available: true, image: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg' },
      { id: 13, title: 'Dark Souls 3', platform: 'PC, PS4, Xbox One', genre: 'RPG de Ação, Soulslike', price: 39.99, available: true, image: 'https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA03365_00/2/i_1bf8d3317ff642710196c85c859320f0a9345e3c65a9132d588239fab877d81a/i/icon0.png' },
    ]
  )

  const rentedGames = ref(JSON.parse(localStorage.getItem('rentedGames')) || [])

  const saveGames = () => {
    localStorage.setItem('games', JSON.stringify(games.value))
    localStorage.setItem('rentedGames', JSON.stringify(rentedGames.value))
  }

  const addGame = (game) => {
    const id = games.value.length ? Math.max(...games.value.map(g => g.id)) + 1 : 1
    games.value.push({ id, ...game })
    saveGames()
  }

  const removeGame = (id) => {
    games.value = games.value.filter(g => g.id !== id)
    rentedGames.value = rentedGames.value.filter(r => r !== id)
    saveGames()
  }

  const toggleDisponivel = (id) => {
    const g = games.value.find(x => x.id === id)
    if (g) {
      g.available = !g.available
      saveGames()
    }
  }

  const rentGame = (id) => {
    if (!rentedGames.value.includes(id)) {
      rentedGames.value.push(id)
      saveGames()
    }
  }

  const returnGame = (id) => {
    rentedGames.value = rentedGames.value.filter(r => r !== id)
    saveGames()
  }

  const availableGames = computed(() => games.value.filter(g => g.available))

  return {
    games,
    rentedGames,
    addGame,
    removeGame,
    toggleDisponivel,
    rentGame,
    returnGame,
    availableGames
  }
})
