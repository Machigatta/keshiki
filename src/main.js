import Vue from 'vue'
import 'es6-promise/auto';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTag, faUserSecret, faDesktop, faGlasses, faTools, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store'
import axios from "axios";

if(store.getters.isAuthenticated){
  axios.defaults.headers.common.Authorization = localStorage.getItem("keshikiJWT");
}

library.add(faUserTag, faUserSecret, faDesktop, faGlasses, faTools, faKey)
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')


