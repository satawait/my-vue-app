import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Hello',
    meta: {
      title: '欢迎'
    },
    component: () => import('@/pages/hello/Hello.vue')
  }
]
export default routes
