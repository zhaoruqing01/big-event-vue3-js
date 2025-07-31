import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores'

const router = createRouter({
  // 路由模式的配置(地址栏中是否有#)
  //代表网页跳转时的前缀import.meta.env.BASE_URL,就是vite.config.js中的base配置项
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置路由规则
  routes: [
    // 路由懒加载,只有路由被点击时才加载
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    // 设置路由根路径是'/'
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage', //重定向到drticle/manage
      // 配置二级路由
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 设置登录token权限---路由守卫
// 登录访问拦截,默认是直接放行的
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const userToken = userStore.token
  // 如果没有token,且访问的是非登录页/可以配置其他路由路径,则拦截回登录页,其他情况正常放行
  if (userToken == '' && to.path !== '/login') {
    return '/login'
  }
})

// 默认导出,则外部必须用import xx from '@/router/index.js'的方式默认导入
// 按需导出,则必须import { xxx } from '///'按需导入
export default router
