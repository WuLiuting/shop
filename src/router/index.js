import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMaile from '@/components/pages/shoppingMaile'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'ShoppingMaile',component: ShoppingMaile}
  ]
})
