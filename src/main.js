import Vue from 'vue'
import App from './App.vue'
import axios from '@/api/axios'
// 导包
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

// 引入router
import router from '@/router'
import components from '@/components'
Vue.use(components)
Vue.prototype.axios = axios
// 在全局范围注册element=ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
