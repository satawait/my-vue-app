<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld :msg="`Hello ${userStore.getUser.username}`" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
</script>

<style scoped lang="" scss></style>
