import Router from 'vue-router'
import Vue from 'vue'
import shoppingMall from '@/components/pages/shoppingMall'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'shoppingMall',
    component: shoppingMall
  }]
})