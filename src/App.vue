<template>
  <n-config-provider :locale="zhCN" :theme="null">
    <n-message-provider>
      <n-menu :options="menuOptions" mode="horizontal" />
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
// import { h } from 'vue'
// import type { GlobalTheme } from 'naive-ui'
// import request from '@/utils/request'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import { inject } from 'vue'
// const $http = inject('$http')
// console.log($http)
// request.get('127.0.0.1:3000')
// console.log(import.meta.env)
const theme = darkTheme
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Hello'
          }
        },
        { default: () => '首页' }
      ),
    key: 'hello'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Login'
          }
        },
        { default: () => '登录' }
      ),
    key: 'login'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Todo'
          }
        },
        { default: () => 'todo' }
      ),
    key: 'todo'
  }
]
</script>

<style lang="scss" src="@/assets/style/index.scss"></style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  // margin-top: 60px;
}
</style>
