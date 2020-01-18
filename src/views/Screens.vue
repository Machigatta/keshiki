<template>
  <div>
      <div class="Board">
        <a class="Link BoardLink" v-on:click="createScreen" href="#">
            <font-awesome-icon icon="desktop" class="fa-3x"/>&nbsp;
            <font-awesome-icon icon="plus" class="fa-2x" style="vertical-align:super"/>
        </a>
        <ul class="List BoardList">
            <li v-bind:key="item.id" v-for="item in screens" class="ListItem BoardItem">
                <h3 class="BoardTitle">
                    <a class="Link" v-bind:href="`/screen/${item.id}/edit`">{{item.title}}
                     <font-awesome-icon class="" v-if="item.protected" icon="key"/></a>
                       
                </h3>
                <a class="Link BoardPicture" v-bind:href="`/screen/${item.id}/edit`">
                    <img alt="GeneratedByPicsum.Photos" class="Image BoardImage" v-bind:src="`https://picsum.photos/id/${item.id}/800/400?grayscale`">
                </a>
                <div class="BoardGroup">
                    <a class="Link" v-bind:class="{[STATUS_OFFLINE]: !item.status, [STATUS_ONLINE]: item.status}">
                        <span class="fa-stack" style="vertical-align:text-top;">
                            <font-awesome-icon class="fa-stack-2x" icon="power-off" />
                            <font-awesome-icon class="fa-stack-2x" v-if="item.status" icon="slash" />
                        </span>
                        &nbsp;
                        <span v-if="item.status">{{STATUS_ONLINE}}</span>
                        <span v-else>{{STATUS_OFFLINE}}</span>
                    </a>
                    <a class="Link BoardLink float-right" href="#" v-bind:key="editor.id" v-for="editor in item.Users">
                        <span v-if="editor.Editor.role == 'creator'">
                            <font-awesome-icon icon="user-tag"/>   
                            {{editor.username}}
                        </span>
                    </a>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";
import { ROUTE_SCREENS } from "../store/routes";
import { STATUS_OFFLINE, STATUS_ONLINE  } from "../utils/status";

export default {
  name: 'Profile',
  data () {
    return {
        screens: [],
        STATUS_OFFLINE,
        STATUS_ONLINE
    }
  },
  methods: {
      getScreens() {
        axios.get(ROUTE_SCREENS).then(resp => {
            this.screens = resp.data.screens;
        }).catch(err => {
            console.log(err.data);            
        })
      },
      createScreen() {
        axios.put(ROUTE_SCREENS, { 
            payload: {
                title: "Entrance"
            }
        }).then(resp => {
            this.getScreens();
            console.log(resp.data);
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