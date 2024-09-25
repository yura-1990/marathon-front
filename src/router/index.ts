import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import AboutUs from "@/pages/AboutUs.vue";
import Login from '@/pages/auth/Login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/about-us',
          name: 'AboutUs',
          component: AboutUs
        },

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})

export default router
