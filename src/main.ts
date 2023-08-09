// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'

import '@/assets/styles/reset.css'
import '@/assets/styles/fonts.css'
import '@/assets/styles/common.css'
import '@/assets/styles/sub_myclass.css'
import '@/assets/styles/modal.css'

// 앱 생성
const app = createApp(App)
// pinia 사용 설정
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// 라우터 사용 설정
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')
