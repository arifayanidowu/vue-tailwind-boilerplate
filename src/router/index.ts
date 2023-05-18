import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'root',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "register" */ '@/views/auth/RegisterView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/components/AppLayout.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/HomeView.vue')
        },
        {
          path: 'team',
          name: 'Team',
          component: () => import(/* lazy loading TeamView */ '@/views/dashboard/TeamView.vue')
        },
        {
          path: 'projects',
          name: 'Projects',
          component: () =>
            import(/* lazy loading ProjectsView */ '@/views/dashboard/ProjectsView.vue')
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: () =>
            import(/* lazy loading CalendarView */ '@/views/dashboard/CalendarView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = await getCurrentUser()
  if (requiresAuth && !user) {
    next('/')
  } else {
    next()
  }
})

export default router
