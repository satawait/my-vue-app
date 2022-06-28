import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import helloRoutes from './hello'
import todoRoutes from './todo'

const routes: RouteRecordRaw[] = [...helloRoutes, ...todoRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
