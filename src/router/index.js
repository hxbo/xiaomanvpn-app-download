import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/Home.vue'),
      meta: { index: 2 }
    },
    {
      path: '/detail:data',
      name: 'detail',
      component: () => import('../views/details/Detail.vue'),
      meta: { index: 3 },
      props: true
    }
  ]
})

export default router
