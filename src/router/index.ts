import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import AboutUs from "@/pages/AboutUs.vue";
import EventDates from '@/pages/events/event-dates.vue'
import Carts from '@/pages/cart/carts.vue'
import SingleMarathon from '@/pages/marathons/single-marathon.vue'
import Marathons from '@/pages/marathons/marathons.vue'
import Participate from '@/pages/paticipates/participate.vue'
import Events from "@/pages/events/events.vue";
import Payment from '@/pages/cart/payment.vue'

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
          path: '/events',
          name: 'Event',
          component: Events
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
          path: '/participate/:id',
          name: 'Participate',
          component: Participate
        },
        {
          path: '/carts',
          name: 'Carts',
          component: Carts
        },
        {
          path: '/payment',
          name: 'Payment',
          component: Payment
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
