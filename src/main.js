import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import ElementPlus from 'element-plus'
import pinia from './stores'

const app = createApp(App)

// 需要将pinia,router,ElementPlus挂载到app上才能使用
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
