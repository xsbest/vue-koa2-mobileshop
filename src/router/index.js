import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/main',
      name: 'Main',
      component: () => import('@/components/pages/Main'),
      children: [{
          path: '/',
          name: 'ShoppingMall',
          component: () => import('@/components/pages/shoppingMall')
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
      ],
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/pages/Register')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/pages/Login')
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('@/components/pages/Goods')
    },
  ]
})