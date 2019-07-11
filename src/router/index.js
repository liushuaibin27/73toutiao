// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
import Login from '@/views/login'
// 在全局范围注册element-ui
Vue.use(VueRouter)
// 初始化router对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login } ]
})
export default router
