import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../views/home/Home.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('../views/register/Register.vue')
    },

    {
      path: '/download',
      name: 'download',
      component: ()=>import('../views/download/Download.vue')
    }
  ]
})

export default router
