<template>
  <ModuleController v-bind:vdata="view_data" />
</template>

<script>
import ModuleController from "../components/ModuleController";
// import axios from "axios";

export default {
  name: 'Home',
  components: {
    ModuleController,
  },
  data() {
    return {
      view_data: [
        {
          id:1, 
          title: "Text",
          show: true,
          type: "text"
        },
        {
          id:2,
          title: "HTML",
          show: true,
          type: "html"
        },
        {
          id:3,
          title: "Feed",
          show: true,
          type: "feed"
        },
        {
          id:4,
          title: "Picture",
          show: true,
          type: "picture"
        },
        {
          id:5,
          title: "Calendar",
          show: true,
          type: "calendar"
        }
      ]
    }
  }
}
</script>