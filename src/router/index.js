import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {                                                                 //Homepage
      path: '/',
      name: 'Home',
      component: () => import('../components/Search.vue')
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
    }
  ]
})

export default router
