import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import AboutUs from "@/pages/AboutUs.vue";
import Login from '@/pages/auth/Login.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import Dashboard from '@/pages/admin/Dashboard.vue'
import Profile from '@/pages/admin/Profile.vue'
import ForgotPassword from '@/pages/auth/forgot-password.vue'
import NotFound from '@/pages/not-found.vue'
import EmailSend from '@/pages/auth/email-send.vue'
import Cookies from 'js-cookie'

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
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/send-email',
      name: 'SendEmail',
      component: EmailSend
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/dashboard',
      component: PrivateLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})

router.beforeEach(async (to, from, next)=>{
  const isAuthenticated = !!Cookies.get('auth_token')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    if (isAuthenticated && to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }

})

export default router
