import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/Home.vue'),
      meta: { index: 2 }
    }
  ]
})

export default router
