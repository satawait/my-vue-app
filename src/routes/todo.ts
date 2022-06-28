import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/todo',
    name: 'Todo',
    meta: {
      title: '待办'
    },
    component: () => import('@/pages/todo/Todo.vue')
  }
]
export default routes
