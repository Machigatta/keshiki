<template>
  <div>
    <loading :show="loading"></loading>
    <div v-if="screen">
      <div class="clearfix">
        <h2 class="float-left">Attributes</h2>

        <div class="float-right">
          <label class="switch">
            <input type="checkbox" v-model="screen.status" />
            <span class="slider round"></span>
          </label>
          &nbsp;
          <button class="button button-danger" v-on:click="deleteScreen">Delete</button>
          &nbsp;
          <button class="button button-black" v-on:click="saveScreen">{{SaveButtonText}}</button>
        </div>
      </div>
      <div class="row">
        <div class="column column-10">
          <label>ID</label>
          <input disabled v-bind:value="screen.id" type="text" />
        </div>
        <div class="column column-50">
          <label>Title</label>
          <input required v-model="screen.title" type="text" placeholder="Title" />
        </div>
        <div class="column column-40">
          <label>Protection</label>
          <input required v-model="screen.protection" type="text" placeholder="EncryptionKey" />
        </div>
      </div>
      <div class="clearfix">
        <h2 class="float-left">Layout</h2>
      </div>
      <ul>
        <li class="pictureSelector" v-for="layoutI in 3" :key="layoutI">
          <input
            type="radio"
            name="layoutRadio"
            v-bind:id="`cb${layoutI}`"
            v-bind:value="`${layoutI}`"
            @click="updateLayout"
            :checked="screen.layout == layoutI"
          />
          <label v-bind:for="`cb${layoutI}`">
            <img v-bind:src="require(`@/assets/layout_${layoutI}.png`)" />
          </label>
        </li>
      </ul>
      <div class="clearfix">
        <h2 class="float-left">Configuration</h2>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from "axios";
import { STATUS_OFFLINE, STATUS_ONLINE } from "../../utils/status";
import { ROUTE_SCREEN } from "../../store/routes";
import loading from "vue-full-loading";

export default {
  name: "Edit",
  components: {
    loading
  },
  data() {
    return {
      screen: null,
      loading: false,
      SaveButtonText: "Save"
    };
  },
  mounted() {
    this.getScreen();
  },
  methods: {
    getScreen() {
      this.loading = true;
      axios
        .get(ROUTE_SCREEN + this.$route.params.id)
        .then(resp => {
          this.screen = resp.data.screen;
        })
        .catch(err => {
          console.log(err.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateLayout(event) {
      let oldV = parseFloat(this.screen.layout);
      let newV = parseFloat(event.target.value);
      if (oldV != newV) {
        if (
          confirm(
            "Do you really want to change the layout? This will result in a loss of Configuration!"
          )
        ) {
          this.screen.layout = newV;
        } else {
          event.preventDefault();
          this.screen.layout = oldV;
        }
      }
    },
    saveScreen() {
      this.SaveButtonText = "Saving";
      this.loading = true;
      axios
        .post(ROUTE_SCREEN + this.$route.params.id, { payload: this.screen })
        .then(resp => {
          this.screen = resp.data.screen;
          this.$notify({
            group: "notes",
            position: "bottom right",
            type: "success",
            title: "Changes Saved"
          });
        })
        .catch(err => {
          this.$notify({
            group: "notes",
            position: "bottom right",
            type: "error",
            title: "Something went wrong!",
            text: err.data
          });
          console.log(err.data);
        })
        .finally(() => {
          this.SaveButtonText = "Save";

          this.loading = false;
        });
    },
    deleteScreen() {
      this.loading = true;
      axios
        .delete(ROUTE_SCREEN + this.$route.params.id)
        .then(resp => {
          this.$router.push("/screens")
        })
        .catch(err => {
          this.$notify({
            group: "notes",
            position: "bottom right",
            type: "error",
            title: "Something went wrong!",
            text: `${err.response.status} ${err.response.statusText}`
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  small {
    font-size: 70%;
  }
}
small.muted {
  color: var(--color-shadow);
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

.pictureSelector {
  input[type="radio"][name^="layoutRadio"] {
    display: none;
  }

  label {
    border: 1px solid var(--color-shadow);
    display: block;
    position: relative;
    margin: 10px;
    cursor: pointer;
  }

  label:before {
    background-color: rgba(16, 65, 99, 0.32);
    color: white;
    content: " ";
    display: block;
    position: absolute;

    transition-duration: 0.4s;
    transform: scale(0);
  }

  label img {
    height: 90px;
    width: 160px;
    transition-duration: 0.1s;
    transform-origin: 50% 50%;
    padding: 2px;
    transform: scale(0.9);
  }

  :checked + label {
    border-color: #eee;
  }

  :checked + label:before {
    transform: scale(1);
  }

  :checked + label img {
    transform: scale(1.1);
    box-shadow: 0 0 2px var(--color-primary);
    z-index: -1;
  }
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>