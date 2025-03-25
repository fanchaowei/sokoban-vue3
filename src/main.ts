import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from './store'
import { setupRouter } from './router'
import './style/tailwind.css'

const app = createApp(App)

setupPinia(app)
setupRouter(app)

app.mount('#app')
