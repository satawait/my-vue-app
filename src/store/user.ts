import { defineStore } from 'pinia'
import { IUser } from '@/types'

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUser => {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  actions: {
    async updateUser(user: IUser) {
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
