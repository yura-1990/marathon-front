import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/i18n'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ToastPlugin);
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
