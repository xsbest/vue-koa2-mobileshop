import Router from 'vue-router'
import Vue from 'vue'
import shoppingMall from '@/components/pages/shoppingMall'
import register from '@/components/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'shoppingMall',
    component: shoppingMall
  }, {
    path: '/register',
    name: 'Register',
    component: register
  }
  ]
})