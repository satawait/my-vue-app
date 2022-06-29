import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import helloRoutes from './hello'
import todoRoutes from './todo'
import loginRoutes from './login'

const routes: RouteRecordRaw[] = [...helloRoutes, ...todoRoutes, ...loginRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const authorization = localStorage.getItem('authorization')
  if (to.name !== 'Login' && !authorization) next({ name: 'Login' })
  else next()
})

export default router
