<template>
  <h1>
    {{ msg }}
  </h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p :class="count % 2 ? darkTheme : lightTheme">
    <component
      :is="
        h(
          'div',
          {
            class: 'test',
            style: 'color: #ffccee',
            onClick: () => {
              cc()
            }
          },
          ['123']
        )
      "
    />
    <a :class="styled.todoList" href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import * as styled from '@/assets/style/styled/styled.css'
import { darkTheme, lightTheme } from '@/assets/style/styled/theme.css'

// defineProps<{ msg: string }>()
withDefaults(defineProps<{ msg: string }>(), {
  msg: 'hello'
})

const count = ref(0)
const cc = () => {
  console.log(123)
}
</script>

<style scoped lang="scss">
a {
  color: var(--green-color);
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
