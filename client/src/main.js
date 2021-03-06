import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VuePageTransition from 'vue-page-transition'
 

Vue.config.productionTip = false

Vue.use(VuePageTransition)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://api-multiplayer-game.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
