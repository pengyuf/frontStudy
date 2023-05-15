import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElIcon from '@cobyte-ui/components/icon'
import '@cobyte-ui/theme-chalk/src/index.scss'

// 组件库
const components = [ElIcon]

// 是否已安装标识
const INSTALLED_KEY = Symbol('INSTALLED_KEY')

// 组件库插件
const ElementPlus = {
    install(app:any){
        if(app[INSTALLED_KEY])return
        app[INSTALLED_KEY] = true
        components.forEach(c=>app.use(c))
    }
}

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
