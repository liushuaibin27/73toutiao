// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
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

    component: Home,
    children: [
      { path: '/', name: 'welcome', component: Welcome },
      { path: '/publish', name: 'publish', component: Publish },
      { path: '/article', name: 'article', component: Article },
      { path: '/image', name: 'image', component: Image }
    ]
  }
  ]
})
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('73toutiao')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
