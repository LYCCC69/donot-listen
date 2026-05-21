import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createAppRuntime } from './runtime/appRuntime'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const runtime = createAppRuntime({ router })
app.provide('runtime', runtime)

app.mount('#app')
