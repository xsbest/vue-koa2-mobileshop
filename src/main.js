import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tab,
  Tabs,
  PullRefresh,
  Stepper,
  Tabbar,
  TabbarItem
} from 'vant'
Vue.prototype.axios = axios

Vue.use(Button).use(Row).use(Col).use(Swipe)
  .use(SwipeItem).use(Lazyload).use(List).use(Field)
  .use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper)
  .use(Tabbar).use(TabbarItem)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')