import Vue from 'vue'
import 'es6-promise/auto';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTag, faUserSecret, faDesktop, faGlasses, faTools, faKey, faPowerOff, faSlash, faPlusCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store'
import axios from "axios";
import vmodal from 'vue-js-modal';
import Notifications from 'vue-notification';

if(store.getters.isAuthenticated){
  axios.defaults.headers.common.Authorization = localStorage.getItem("keshikiJWT");
}

library.add(faUserTag, faUserSecret, faDesktop, faGlasses, faTools, faKey, faPowerOff, faSlash, faPlusCircle, faPlus)
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Notifications)

Vue.use(vmodal, {
  dialog: true,
  dynamic: true,
  injectModalsContainer: true,
  dynamicDefaults: {
    foo: 'foo'
  },
})

new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')


