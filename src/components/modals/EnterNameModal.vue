<template>
  <modal
    name="enter-name"
    transition="pop-out"
    classes="input-modal-class"
    :min-width="200"
    :min-height="200"
    width="30%"
    height="auto"
  >
    <div class="input-box">
      <form v-on:submit.prevent>
        <fieldset>
          <label for="namefield">Name</label>
          <input type="text" placeholder="Screen-Name" v-model="name" required id="namefield" />
        </fieldset>
        <button v-on:click="evaluateInput">Save</button>
      </form>
    </div>
  </modal>
</template>
<script>
export default {
  name: "EnterNameModal",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    evaluateInput() {
      this.$emit("onSave", this.name, function(emitter) {
         emitter.$modal.hide("enter-name"); 
      });
    }
  }
};
</script>

<style>
.input-modal-class {
  border-radius: 5px;
  background: #f7f7f7;
  box-shadow: 5px 5px 30px 0px rgba(46, 61, 73, 0.6);
}

.input-box {
  padding: 10px;
  font-style: 13px;
}
</style>