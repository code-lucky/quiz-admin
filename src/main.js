import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import './permission.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

const app = createApp(App)

app.config.globalProperties.$fileUrl = `http://127.0.0.1:3002/api/images/`
app.config.globalProperties.$uploadUrl = `/api/api/file/upload/`

app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(CkeditorPlugin)
app.mount('#app')
