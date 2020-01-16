<template>
    <header class="Header">
        <section class="container">
        <div class="row">
            <div class="column column-0">
                <router-link class="Link Logo" to="/"><font-awesome-icon icon="glasses" /><span id="Logo-Name">Keshiki</span></router-link>
            </div>
            <div class="column">
                <!-- <form class="Search">
                    <label class="Search__label" for="search">Search</label>
                    <input class="Search__input" id="search" name="search" type="search" value="">
                    <button class="Button Search__button"></button>
                </form> -->
            </div>
            <div class="column column-0">
                <nav class="Navigation">
                    <ul class="List">
                        <li class="ListItem NavItem"  v-if="isAuthenticated">
                            <router-link class="Link" to="/screens">
                                <font-awesome-icon icon="desktop" />
                            </router-link>
                        </li>
                        <li class="ListItem NavItem NavItem--mobile-none"  v-if="isAuthenticated">
                            <router-link class="Link" to="/config">
                                <font-awesome-icon icon="tools" />
                            </router-link>
                        </li>
                        <li class="ListItem NavItem" v-if="!isAuthenticated && !authLoading">
                            <router-link class="Link" to="/login">
                                <font-awesome-icon icon="key"/>
                            </router-link>
                        </li>
                        <li class="ListItem NavItem"  v-if="isProfileLoaded">
                            <router-link class="Link" to="/profile">
                                <font-awesome-icon icon="user-tag"/>&nbsp;
                                <span>{{name}}</span>
                            </router-link>
                        </li>
                        <li class="ListItem NavItem" v-if="isAuthenticated" @click="logout">
                            <a href="#"><font-awesome-icon icon="key"/> <span class="logout">Logout</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { AUTH_LOGOUT } from '../../store/actions/auth'
export default {
    name: "Header",
    methods: {
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
        }
    },
    computed: {
        ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
        ...mapState({
        authLoading: state => state.auth.status === 'loading',
        name: state => state.user.profile.username,
        })
    },
}
</script>

<style scoped>
#Logo-Name {
    margin-left: 5px;
}
.NavItem {
    width: unset;
    padding: 5px;
}
.Header svg {
    height: auto;
}
</style>