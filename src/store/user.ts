import { defineStore } from 'pinia'

export interface User {
  username: string
  password: string
}
// 注释
export const useUserStore = defineStore({
  id: 'user',
  state: (): User => {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  actions: {
    async updateUser(user: User) {
      this.username = user.username
      this.password = user.password
    }
  },
  getters: {
    getUser: (state) => {
      return state
    }
  }
})
