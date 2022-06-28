import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // // polyfill
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // })
  ],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/main.scss";'
      }
    }
  }
})
