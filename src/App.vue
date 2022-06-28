<template>
  <RouterView />
</template>

<script setup lang="ts">
import request from '@/utils/request'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import { inject } from 'vue'
// const $http = inject('$http')
// console.log($http)
request.get('127.0.0.1:3000')
console.log(import.meta.env)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  margin-top: 60px;
}
</style>
