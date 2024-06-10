import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:upcoming?',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      props: true,
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
    },
    {
      path: '/edit-todo/:id',
      name: 'edit-todo',
      component: () => import('../views/EditTodoView.vue'),
      props: true,
      meta: { title: 'Edit Todo' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `Todo app | ${to.meta.title as string}`
  next()
})

export default router
