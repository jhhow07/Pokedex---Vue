import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/PokemonDetail:id',
    name: 'PokemonDetail',
    component: () => import(/* webpackChunkName: "about" */ `../views/PokemonDetail.vue`)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
