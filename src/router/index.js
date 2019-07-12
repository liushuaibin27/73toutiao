// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
// 在全局范围注册element-ui
Vue.use(VueRouter)
// 初始化router对象
const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    }]
  }
  ]
})
router.beforeEach((to, from, next) => {
  const weishi = window.sessionStorage.getItem('73toutiao')
  if (to.path !== '/login' && !weishi) return next('/login')
  next()
})
export default router
