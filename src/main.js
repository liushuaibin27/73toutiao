import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// 导包
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('73toutiao')).token
}
Vue.prototype.axios = axios
// 在全局范围注册element=ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
