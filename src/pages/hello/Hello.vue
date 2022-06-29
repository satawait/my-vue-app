<template>
  <div class="hello">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld :msg="`Hello ${userStore.getUser.username}`" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.hello {
  margin-top: 60px;
}
</style>
