import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: 'Login' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { title: 'Register' }
    },
    {
      path: '/add-todo',
      name: 'add-todo',
      component: () => import('../views/AddTodoView.vue'),
      meta: { title: 'Add Todo' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `Todo app | ${to.meta.title as string}`
  next()
})

export default router
