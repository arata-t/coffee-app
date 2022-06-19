import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoffeeBeans from '../views/CoffeeBeans.vue'
import CoffeeBean from '../views/CoffeeBean.vue'
import EditCoffeeBean from '../views/EditCoffeeBean.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/coffee_beans',
    name: 'coffee_beans',
    component: CoffeeBeans
  },
  {
    path: '/coffee_beans/:id',
    name: 'show-coffee-bean',
    component: CoffeeBean,
    // 投稿時に取得したidを埋め込み動的なルーティング
    params: true
  },
  {
    path: '/coffee_beans/:id/edit',
    name: 'edit-coffee-bean',
    component: EditCoffeeBean,
    params: true
  }
]

const router = new VueRouter({
  routes
})

export default router
