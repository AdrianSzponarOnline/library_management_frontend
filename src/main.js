import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/components/store/index.js'

const app = createApp(App);

app.use(router)
app.use(store)
app.mount('#app')
