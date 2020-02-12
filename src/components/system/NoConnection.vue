<template>
    <div>
        <h1>Could not establish connection to server</h1>
        <h3 style="color:red;">{{getConnectionStatus}}</h3>
        <router-link v-if="showInstallerButton" class="Button" to="/initial">
            <h2>Install</h2>
        </router-link>
    </div>
</template>


<script>
import { NOT_INSTALLED_YET } from "../../store/actions/installer";
import { mapGetters } from 'vuex'
export default {
    name: "NoConnection",
    computed: {
        ...mapGetters(['getConnectionStatus']),
        showInstallerButton () {
            return this.getConnectionStatus == NOT_INSTALLED_YET
        }
    },
}
</script>
