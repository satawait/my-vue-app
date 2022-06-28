<template>
  <div>
    <input ref="upload" type="file" name="upload" id="upload" @change="changeFile" />
    <p>{{ `Mouse: x-${x}, y-${y}` }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'
const upload = ref()
const { x, y } = useMouse()
const changeFile = (e: Event) => {
  console.log(e)
}
</script>

<style scoped lang="scss"></style>
