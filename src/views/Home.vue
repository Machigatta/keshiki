<template>
  <div>
    <h1>Your Active Boards</h1>
    <ul class="List BoardList">
        <li v-bind:key="item.id" v-for="item in screens" class="ListItem BoardItem">
            <h3 class="BoardTitle" v-if="item.status">
                <a class="Link" v-bind:href="`/screen/${item.id}/edit`">{{item.title}}
                  <font-awesome-icon class="" v-if="item.protected" icon="key"/></a>   
            </h3>
        </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";
import { ROUTE_SCREENS } from "../store/routes";

export default {
  name: 'Home',
  data () {
    return {
        screens: []
    }
  },
  methods: {
      getScreens() {
        axios.get(ROUTE_SCREENS).then(resp => {
            this.screens = resp.data.screens;
        }).catch(err => {
            console.log(err.data);            
        })
      }
      
  },
  mounted () {
      this.getScreens()
  },

}
</script>