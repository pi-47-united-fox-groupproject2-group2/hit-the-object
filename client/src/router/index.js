import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // @note di sini setelah semua bergabung baru klik mulai / start
    path: '/lounge',
    name: 'Lounge',
    component: () => import(/* webpackChunkName: "about" */ '../views/Lounge.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//
// })

export default router
