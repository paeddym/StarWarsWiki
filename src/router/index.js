import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/People',
      name: 'People',
      component: () => import('../components/People.vue')
    },
    {
      path: '/Planets',
      name: 'Planets',
      component: () => import('../components/Planets.vue')
    },
    {
      path: '/Vehicles',
      name: 'Vehicles',
      component: () => import('../components/Vehicles.vue')
    },
    {
      path: '/Starships',
      name: 'Starships',
      component: () => import('../components/Starships.vue')
    },
    {
      path: '/Species',
      name: 'Species',
      component: () => import('../components/Species.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
