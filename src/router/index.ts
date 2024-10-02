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
import EventDates from '@/pages/events/event-dates.vue'
import Carts from '@/pages/cart/carts.vue'
import SingleMarathon from '@/pages/marathons/single-marathon.vue'
import Marathons from '@/pages/marathons/marathons.vue'

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
        {
          path: '/event/:id',
          name: 'EventDates',
          component: EventDates
        },
        {
          path: '/marathons',
          name: 'Marathons',
          component: Marathons
        },
        {
          path: '/marathon/:id',
          name: 'SingleMarathon',
          component: SingleMarathon
        },
        {
          path: '/carts',
          name: 'Carts',
          component: Carts
        },
      ]
    },
  ]
})

// router.beforeEach(async (to, from, next)=>{
//   const isAuthenticated = !!Cookies.get('auth_token')
//
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'Login' })
//     } else {
//       next()
//     }
//   } else {
//     if (isAuthenticated && to.name === 'Login') {
//       next({ name: 'Home' })
//     } else {
//       next()
//     }
//   }
//
// })

export default router
