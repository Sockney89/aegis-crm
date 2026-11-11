import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: () => import('../views/Login.vue'), meta: { guest: true } },
  { path: '/register', component: () => import('../views/Register.vue'), meta: { guest: true } },
  { path: '/forgot', component: () => import('../views/Forgot.vue'), meta: { guest: true } },
  { path: '/reset', component: () => import('../views/Reset.vue'), meta: { guest: true } },
  {
    path: '/',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('../views/Dashboard.vue') },
      { path: 'contacts', component: () => import('../views/Contacts.vue') },
      { path: 'companies', component: () => import('../views/Companies.vue') },
      { path: 'deals', component: () => import('../views/Deals.vue') },
      { path: 'tasks', component: () => import('../views/Tasks.vue') },
      { path: 'tags', component: () => import('../views/Tags.vue') },
      { path: 'audit', component: () => import('../views/Audit.vue') },
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.auth && !auth.isAuthenticated) return '/login'
  if (to.meta.guest && auth.isAuthenticated) return '/'
})

export default router
