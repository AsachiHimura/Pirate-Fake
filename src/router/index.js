import { createRouter, createWebHashHistory } from 'vue-router'
import Jogos from '@/views/Jogos/Jogos.vue'
import RentedGames from '@/views/Jogos/RentedGames.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/jogos', component: Jogos, meta: { requiresAuth: true } },
  { path: '/jogos/alugados', component: RentedGames, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // ler token diretamente do localStorage — mais robusto no app com hash router
  const token = localStorage.getItem('token')

  const requiresAuth = !!to.meta && !!to.meta.requiresAuth

  // debug rápido (pode remover depois)
  // console.log('ROUTE GUARD:', to.path, 'requiresAuth=', requiresAuth, 'token=', token)

  if (requiresAuth && !token) {
    return next('/login')
  }
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/jogos')
  }
  next()
})



export default router

