<template>
  <div id="app">
    <notifications group="notes" position="bottom right" />
    <Header v-if="isConnected && isNotScreenView" />
    <main class="Main">
      <section class="container">
        <router-view/>
      </section>
    </main>
  </div>
</template>

<script>
/* eslint-disable no-console */

import "milligram";
import "./styles/global.scss"
import Header from "./components/layout/Header";
import { USER_REQUEST } from './store/actions/user'
import { INSTALLER_PING } from './store/actions/installer'
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    Header
  },
  computed: {
    ...mapGetters(["isConnected"]),
    isNotScreenView () {
      return this.$route.matched[0] &&
             this.$route.matched[0].components &&
             this.$route.matched[0].components.default.name != 'Display'
    }
  },
  created: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST).catch(() => {
        if (this.$route.path == '/Login') this.$router.push('/')
      })
    }
    this.$store.dispatch(INSTALLER_PING).then(()=>{        
      if(this.$store.getters.isConnected && this.$route.path == '/Login') this.$router.push('/')
    }).catch(() => {
        if (this.$route.path !== '/NoConnection') this.$router.push('/NoConnection')
    })
  }
}
</script>