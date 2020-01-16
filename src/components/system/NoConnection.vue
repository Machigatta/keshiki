<template>
    <div>
        <h1>Could not establish connection to server</h1>
        <h3 style="color:red;">{{getConnectionStatus}}</h3>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: "NoConnection",
    computed: {
        ...mapGetters(['getConnectionStatus']),
    },
}
</script>
