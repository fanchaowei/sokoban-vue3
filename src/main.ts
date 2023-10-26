import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from './store'
import './style/tailwind.css'

const app = createApp(App)

setupPinia(app)

app.mount('#app')


