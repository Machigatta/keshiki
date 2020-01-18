<template>
  <div>
      <h1>{{screen.title}} - ID: {{ $route.params.id }}</h1>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import axios from "axios";
import { STATUS_OFFLINE, STATUS_ONLINE } from "../../utils/status"; 

export default {
  name: 'Edit',
   data () {
        return {
            screen: {
                id: 1,
                title: "Entrance",
                status: STATUS_ONLINE,
                picture: 60,
                protected: false,
                creator: "Machigatta"
            },
        }
    },
  components: {
  },
}
</script>