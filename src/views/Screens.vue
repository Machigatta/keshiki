<template>
  <div>
    <loading :show="loading"></loading>
    <div class="Board">
      <enter-name-modal @onSave="createScreen" />
      <a class="Link BoardLink" @click="$modal.show('enter-name')" href="#">
        <font-awesome-icon icon="desktop" class="fa-3x" />&nbsp;
        <font-awesome-icon icon="plus" class="fa-2x" style="vertical-align:super" />
      </a>
      <ul class="List BoardList">
        <li v-bind:key="item.id" v-for="item in screens" class="ListItem BoardItem">
          <h3 class="BoardTitle">
            <a class="Link" v-bind:href="`/screen/${item.id}/edit`">
              {{item.title}}
              <font-awesome-icon class v-if="item.protection" icon="key" />
            </a>
          </h3>
          <a class="Link BoardPicture" v-bind:href="`/screen/${item.id}/edit`">
            <img
              alt="GeneratedByPicsum.Photos"
              class="Image BoardImage"
              v-bind:src="require(`@/assets/layout_${item.layout}.png`)"
            />
          </a>
          <div class="BoardGroup">
            <a
              class="Link"
              v-bind:class="{[STATUS_OFFLINE]: !item.status, [STATUS_ONLINE]: item.status}"
            >
              <span class="fa-stack" style="vertical-align:text-top;">
                <font-awesome-icon class="fa-stack-2x" icon="power-off" />
                <font-awesome-icon class="fa-stack-2x" v-if="!item.status" icon="slash" />
              </span>
              &nbsp;
              <span v-if="item.status">{{STATUS_ONLINE}}</span>
              <span v-else>{{STATUS_OFFLINE}}</span>
            </a>
            <a
              class="Link BoardLink float-right"
              href="#"
              v-bind:key="editor.id"
              v-for="editor in item.Users"
            >
              <span v-if="editor.Editor.role == 'creator'">
                <font-awesome-icon icon="user-tag" />
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
/* eslint-disable vue/no-unused-components */
import axios from "axios";
import { ROUTE_SCREENS } from "../store/routes";
import { STATUS_OFFLINE, STATUS_ONLINE } from "../utils/status";

import EnterNameModal from "../components/modals/EnterNameModal";
import loading from "vue-full-loading";

export default {
  name: "Profile",
  components: {
    EnterNameModal,
    loading
  },
  data() {
    return {
      loading: false,
      screens: [],
      STATUS_OFFLINE,
      STATUS_ONLINE
    };
  },
  methods: {
    getScreens() {
      this.loading = true;
      axios
        .get(ROUTE_SCREENS)
        .then(resp => {
          this.screens = resp.data.screens;
        })
        .catch(err => {
          console.log(err.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createScreen(name, callback) {
    this.loading = true;
      axios
        .put(ROUTE_SCREENS, {
          payload: {
            title: name
          }
        })
        .then(resp => {
          this.$notify({
            group: "notes",
            position: "bottom right",
            type: "success",
            title: "Screen created!"
          });
          this.getScreens();
          callback(this);
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err.data);
        }).finally(() => {
            this.loading = false;
        });
    }
  },
  mounted() {
    this.getScreens();
  }
};
</script>