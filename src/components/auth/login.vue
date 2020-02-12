<template>
  <div>
    <loading :show="loading"></loading>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <p class="alert">{{authStatus}}</p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>


<script>
  import {AUTH_REQUEST} from '../../store/actions/auth'
  import { mapGetters } from 'vuex'
  import loading from "vue-full-loading";

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    components: {
      loading
    },
    computed: {...mapGetters(['authStatus'])},
    methods: {
      login: function () {
        this.loading = true;
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
          this.loading = false;
          this.$router.push('/')
        })
      }
    },
  }
</script>