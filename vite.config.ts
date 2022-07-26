import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需加载element-plus 以下两种都可
// 1、
// import ElementPlus from 'unplugin-element-plus/vite'
// 2、
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// naive ui 按需
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
// polyfill
// import legacy from '@vitejs/plugin-legacy'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    visualizer({
      open: true,
      sourcemap: false
    })
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
    // ElementPlus()
    // // polyfill
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // })
  ],
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4004',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
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
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
