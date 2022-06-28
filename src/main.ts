// import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'

const app = createApp(App)
// app.config.globalProperties.$http = axios
// app.provide('$http', app.config.globalProperties.$http)
app.use(router)
app.use(store)
app.mount('#app')
