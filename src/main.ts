import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.provide('$http', app.config.globalProperties.$http)
app.mount('#app')
