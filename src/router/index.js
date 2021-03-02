import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'ShoppingMall',
    component: () => import('@/components/pages/shoppingMall')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/pages/Register')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/pages/Login')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('@/components/pages/Goods')
  },
  {
    path: '/categoryList',
    name: 'CategoryList',
    component: () => import('@/components/pages/CategoryList')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/components/pages/Cart')
  },
  ]
})