
/* eslint-disable no-console */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Screens from '../views/Screens.vue'
import EditScreen from '../views/screen/Edit.vue'
import DisplayScreen from '../views/screen/Display.vue'
import NotFound from '../components/system/NotFound.vue'
import NotAllowed from '../components/system/NotAllowed.vue'
import NoConnection from '../components/system/NoConnection.vue'
import Login from '../components/auth/login.vue'

import store from '../store'
import { NOT_INSTALLED_YET  } from "../store/actions/installer";
import { ROUTE_INIT } from "../store/routes";

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/screens',
      name: 'screens',
      component: Screens,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/screen/:id/edit',
      name: 'ScreenEdit',
      component: EditScreen,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/screen/:id/Display',
      name: 'ScreenDisplay',
      component: DisplayScreen,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/initial', name: 'Initial', meta: { ignoreBeforeEach: true }, beforeEnter: (to, from, next) => {
        if (store.getters.getConnectionStatus == NOT_INSTALLED_YET) {
          store.dispatch(ROUTE_INIT).then(() => {
            next('/login')
          }).catch(() => {
            next('/NoConnection');
          })
          return
        }
        next('/NoConnection')
      }
    },
    { path: '/NoConnection', name: 'NoConnection', component: NoConnection, meta: { ignoreBeforeEach: true } },
    { path: '/404', component: NotFound },
    { path: '/405', name: 'not_allowed', component: NotAllowed },
    { path: '*', redirect: '/404' },
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.ignoreBeforeEach) {
    if (!store.getters.isConnected) {
      next('/NoConnection')
    } else {
      next();
    }
  } else {
    next()
  }

})

export default router
