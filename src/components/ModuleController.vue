<template>
    <div>
        <div v-bind:key="vobject.id" v-for="vobject in vdata">
            <div v-if="vobject.type === 'text'">
                <text-item v-bind:vobject="vobject" />
            </div>
            <div v-else-if="vobject.type === 'html'">
                <text-item v-bind:vobject="vobject" />
            </div>
            <div v-else-if="vobject.type === 'feed'">
                <text-item v-bind:vobject="vobject" />
            </div>
            <div v-else-if="vobject.type === 'calendar'">
                <text-item v-bind:vobject="vobject" />
            </div>
            <div v-else-if="vobject.type === 'picture'">
                <text-item v-bind:vobject="vobject" />
            </div>
            <div v-else>
                Not set
            </div>
            
        </div>
    </div>
</template>

<script>
import TextItem from "./TextItem.vue";

export default {
    name: "ModuleController",
    components: {
        TextItem
    },
    props: ["vdata"],
    methods: {
        add() {
            
        }
    }
}
</script>

<style scoped>

</style>